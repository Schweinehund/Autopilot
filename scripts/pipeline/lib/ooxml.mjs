// scripts/pipeline/lib/ooxml.mjs
//
// Zero-dependency OOXML introspection helper (Phase 113 D-05).
// Open a .docx (ZIP archive), extract named entries, provide body text and
// styleId presence for the post-conversion guard and reference.docx sanity check.
//
// CRITICAL: Raw .docx bytes are DEFLATE-compressed ZIP entries. You CANNOT scan
// the raw file buffer for text strings — it will always false-green. extractEntry
// MUST decompress first via inflateRawSync before any content inspection.
//
// Imports: node:fs and node:zlib ONLY. Zero external npm packages.
// This invariant allows Phase-119 to fold this helper into scripts/validation/
// without introducing a new npm dependency into the validator chain.
//
// Lineage: Phase 113 Plan 01 — PIPE-01 / D-05 substrate.
// Pattern source: 113-RESEARCH.md §Pattern 3 (lines 228-311).

import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

/**
 * Extract a named entry from a .docx ZIP archive.
 * Uses ZIP local file header sequential walk — no external binary, no npm packages.
 *
 * Implementation follows the PKZIP specification:
 *   - Scan for PK\x03\x04 local file header signature
 *   - Read fileNameLength + extraFieldLength to locate dataStart
 *   - For compression method 0 (Stored): return bytes directly
 *   - For compression method 8 (DEFLATE): inflateRawSync the compressed subarray
 *   - Pitfall 5 guard: if compressedSize is 0 with method 8 (data-descriptor pattern),
 *     break rather than call inflateRawSync on an empty buffer (which would crash)
 *
 * @param {string} docxPath - absolute or repo-relative path to .docx file
 * @param {string} entryName - e.g. 'word/document.xml' or 'word/styles.xml'
 * @returns {string} decompressed UTF-8 content of the entry
 * @throws if entry not found or decompression fails
 */
export function extractEntry(docxPath, entryName) {
  const buf = readFileSync(docxPath);
  let offset = 0;

  while (offset + 30 <= buf.length) {
    // PKZIP local file header signature: PK\x03\x04
    if (buf[offset] !== 0x50 || buf[offset + 1] !== 0x4B ||
        buf[offset + 2] !== 0x03 || buf[offset + 3] !== 0x04) {
      break; // not a local file header — end of entries (or data descriptor / central dir)
    }

    const compressionMethod = buf.readUInt16LE(offset + 8);
    const compressedSize    = buf.readUInt32LE(offset + 18);
    const fileNameLength    = buf.readUInt16LE(offset + 26);
    const extraFieldLength  = buf.readUInt16LE(offset + 28);
    const fileName = buf.subarray(offset + 30, offset + 30 + fileNameLength).toString('utf8');
    const dataStart = offset + 30 + fileNameLength + extraFieldLength;

    // Pitfall 5: data-descriptor pattern — compressedSize is 0 in the local header.
    // Calling inflateRawSync on an empty buffer crashes; we cannot navigate past
    // the entry without reading the data descriptor (variable-length), so abort walk.
    if (compressionMethod === 8 && compressedSize === 0) {
      break;
    }

    if (fileName === entryName) {
      const compressed = buf.subarray(dataStart, dataStart + compressedSize);
      if (compressionMethod === 0) {
        // Method 0: Stored (no compression) — return bytes directly
        return compressed.toString('utf8');
      }
      if (compressionMethod === 8) {
        // Method 8: DEFLATE — inflateRawSync strips the raw DEFLATE stream
        // (no zlib header/trailer, matching the ZIP format)
        return inflateRawSync(compressed).toString('utf8');
      }
      throw new Error(`Unsupported compression method ${compressionMethod} for '${entryName}' in ${docxPath}`);
    }

    offset = dataStart + compressedSize;
  }

  throw new Error(`Entry '${entryName}' not found in ${docxPath}`);
}

/**
 * Extract visible body text from word/document.xml.
 * Decompresses the ZIP entry, isolates the <w:body> region, strips XML tags,
 * collapses whitespace, and applies CRLF→LF normalization.
 *
 * @param {string} docxPath - absolute or repo-relative path to .docx file
 * @returns {string} plain text of the document body
 * @throws if word/document.xml is absent or <w:body> is not found
 */
export function extractBodyText(docxPath) {
  const xml = extractEntry(docxPath, 'word/document.xml').replace(/\r\n/g, '\n');
  // Isolate the body region (excludes headers, footers, doc properties)
  const bodyMatch = xml.match(/<w:body>([\s\S]*?)<\/w:body>/);
  if (!bodyMatch) throw new Error(`No <w:body> found in word/document.xml in ${docxPath}`);
  // Strip XML tags; collapse whitespace to single spaces
  return bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Check whether Heading 1/2/3 styleIds appear in the document body XML.
 * Scans word/document.xml for <w:pStyle w:val="HeadingN"/> references.
 * Returns the subset of ['Heading1','Heading2','Heading3'] found.
 *
 * Use case A — converted .docx output: paragraphs styled with Heading N carry
 *   <w:pStyle w:val="HeadingN"/> in word/document.xml; finding them confirms
 *   pandoc preserved heading structure.
 * Use case B — reference.docx template: pandoc's default reference.docx contains
 *   sample styled paragraphs for each heading level in document.xml.
 *
 * @param {string} docxPath - absolute or repo-relative path to .docx file
 * @returns {string[]} subset of ['Heading1','Heading2','Heading3'] found in body XML
 */
export function findHeadingStyleIds(docxPath) {
  const xml = extractEntry(docxPath, 'word/document.xml').replace(/\r\n/g, '\n');
  const found = [];
  for (const id of ['Heading1', 'Heading2', 'Heading3']) {
    if (xml.includes(`w:val="${id}"`)) found.push(id);
  }
  return found;
}
