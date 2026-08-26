# Text-formatting summary

_Source: https://developers.google.com/style/text-formatting_

The page summarizes, and provides a quick reference for, many of the general text-formatting conventions covered elsewhere in the style guide. For more information, see [Visual formatting](semantic-tagging.md#visual-formatting).

Bold  
Use bold formatting, `<b>` or `**`, only for [UI elements](ui-elements.md#formatting) and [run-in headings](lists.md#types-of-lists), including at the beginning of [notices](notices.md).

Although a double underscore, `__`, can also indicate bold styling in Markdown, it can be difficult to distinguish in a text editor. It's best to use the double asterisk for bold in Markdown.

Italic  
In general, use italics sparingly.

When you're discussing or introducing terms, such as when defining terms or using *words as words*, use italics formatting, `<i>` or `_`. For more information, see [Use italics to discuss terms](italics-terms.md) and [Format abbreviation introductions](abbreviations.md#format-abbreviations).

When you need to add emphasis to indicate importance, use italics, not bold or underline. But usually, your words can carry the emphasis without adding italics. To indicate [semantic emphasis](semantic-tagging.md) in HTML, use the `em` element, which renders as italics in most contexts. To indicate emphasis in Markdown, use underscores (`_`), which render as italics; you can't do semantic tagging in Markdown.

Although an asterisk, `*`, can also indicate italics in Markdown, we recommend underscores to make it easier for humans to distinguish italics from bold in the Markdown file.

Italicize titles of books, movies, web series, and other full-length works, unless they're part of a link. For more information, see [Cross-references and linking](cross-references.md).

Italicize mathematical variables—for example, *x* + *y* = 3. Don't italicize mathematical operators such as the plus sign. For more information about formatting mathematical notation, see [Mathematical notation](mathematical-notation.md#format-mathematical-notation).

Italicize version variables—for example, version 1.4.*x*.

Underline  
Reserve underlining for link text. For more information, see [Style link text](https://developers.google.com/style/cross-references#style-link-text).

Code font  
Use `<code>` in HTML or `` ` `` in Markdown to apply a monospace font and other styling to [code in text](code-in-text.md), inline code, and user input.

Use code blocks, `<pre>` or ```` ``` ````, for [code samples](code-samples.md) or other blocks of code.

Do not override or modify font styles inline.

Use code font to mark up code, such as filenames, class names, method names, HTTP status codes, console output, and placeholders. For more information, see [Some specific items to put in code font](code-in-text.md#some-specific-items-to-put-in-code-font).

Capitalization  
Use American English style for [general capitalization](capitalization.md).

Use sentence case in all [headings, titles, and navigation](capitalization.md#capitalization-in-titles-and-headings).

Use all-capitals for [placeholders](placeholders.md#placeholder-text).

Quotation marks  
In general, use American English style when [punctuating quotations](quotation-marks.md).

For titles of shorter works—such as articles or episodes in a web series—put titles in quotation marks, unless they're part of a link.

Font type, size, and color  
Do not override global styles for [font type, size, or color](semantic-tagging.md).

Use [semantic HTML](semantic-tagging.md) or Markdown to control the style of text on a page—for example, code tags in HTML (`<code>`) or backticks in Markdown (`` ` ``)—instead of manually styling text with a monospace font.

Other punctuation conventions  
Don't use [ampersands (&)](word-list.md#ampersand) as conjunctions or shorthand for *and*. Use *and* instead. That includes headings and navigation. **Exception**: It's okay to use *&* in cases where you need to refer to a UI element or the name of a menu that uses *&*.

Put quotation marks and end punctuation outside of link text. For more information, see the [Punctuation around link text](cross-references.md#punctuation) and [Quotation marks and italics](cross-references.md#quotation-marks-italics) sections of the "Cross-references and linking" page.

## More resources

- [Mathematical notation](mathematical-notation.md)
