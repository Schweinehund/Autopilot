# Lists

_Source: https://developers.google.com/style/lists_

## List or table?

Tables and lists are both ways to present a set of similarly structured items. Sometimes it's not obvious when to choose one presentation over the other. To decide which presentation to use, see [List or table?](tables.md#list-or-table)

**Note**: Don't use a list to show only one item; a single item isn't really a list. If you want to set a single item off from surrounding text, then use some other formatting.

## Types of lists

Choose one of the following list styles. The following table includes common ways to present lists in our documentation:

<table>
<thead>
<tr>
<th>List type</th>
<th>Used for</th>
<th>HTML elements</th>
</tr>
</thead>
<tbody>
<tr>
<td>Numbered list</td>
<td><p>A set of items where the sequence is significant, such as ordered steps, phases, or priorities. The following is an example of a numbered list:</p>
<blockquote>
<p>Here's a sequence of steps to follow:</p>
<ol>
<li>Open the box.</li>
<li>Remove the bobcat from the box.</li>
<li>Feed the bobcat.</li>
</ol>
</blockquote>
<p>Nested sequential lists are labeled with lowercase letters or lowercase Roman numerals. The following is an example of a nested sequential list:</p>
<blockquote>
<p>Here's a list of things to do after breakfast, in order:</p>
<ol>
<li>Go shopping.
<ol>
<li>Buy groceries:
<ul>
<li>Flour</li>
<li>Eggs</li>
<li>Sugar</li>
<li>Butter</li>
</ul></li>
<li>Go to mall:
<ol>
<li>Buy dress.</li>
<li>Buy shoes.</li>
</ol></li>
</ol></li>
<li>Make cake.</li>
<li>Build birthday present out of spare parts.</li>
<li>Clean house.</li>
</ol>
</blockquote>
<p>See also <a href="/style/procedures#sublists">Sub-steps in numbered procedures</a>.</p></td>
<td><code translate="no" dir="ltr">ol</code>, <code translate="no" dir="ltr">li</code></td>
</tr>
<tr>
<td>Bulleted list</td>
<td><p>A set of items that's not a sequence, such as a set of nonsequential options or examples. Make sure it's clear whether or not every item is required. The following is an example of a bulleted list:</p>
<blockquote>
<p>Here's a list of things that can go wrong, in no particular order:</p>
<ul>
<li>Your bicycle might explode.</li>
<li>The sun might go out.</li>
<li>An ant might break its leg and require a tiny splint.</li>
</ul>
</blockquote></td>
<td><code translate="no" dir="ltr">ul</code>, <code translate="no" dir="ltr">li</code></td>
</tr>
<tr>
<td>Description list</td>
<td><p>A set of terms, each with a description, definition, or explanation. Use this type of list if you want to draw attention to two or more terms (such as a glossary). The following is an example of a description list:</p>
<blockquote>
<p>Here are some descriptions of types of birds:</p>
<dl>
<dt>Emu</dt>
<dd>
The best kind of bird.
</dd>
<dt>Crow</dt>
<dd>
The other best kind of bird.
</dd>
<dt>Peacock</dt>
<dd>
Also the best kind of bird.
</dd>
<dt>Phoenix</dt>
<dd>
An even better kind of bird.
</dd>
</dl>
</blockquote></td>
<td><code translate="no" dir="ltr">dl</code>, <code translate="no" dir="ltr">dt</code>, <code translate="no" dir="ltr">dd</code></td>
</tr>
<tr>
<td>Description list that uses bulleted run-in headings</td>
<td><p>A set of introductory terms or phrases, each followed by a description, definition, or explanation. Use this type of list if you want to highlight and explain several concepts or save space. For information about how to format and punctuate run-in headings and their descriptions, see <a href="#description-lists-that-use-run-in-headings">Description lists that use run-in headings</a> in this document.</p>
<p>The following is an example of a description list that uses bulleted run-in headings:</p>
<blockquote>
<p>Here are some descriptions of types of birds:</p>
<ul>
<li><strong>Emu</strong>: the best kind of bird</li>
<li><strong>Crow</strong>: the other best kind of bird</li>
<li><strong>Peacock</strong>: also the best kind of bird</li>
<li><strong>Phoenix</strong>: an even better kind of bird</li>
</ul>
</blockquote></td>
<td><code translate="no" dir="ltr">ul</code>, <code translate="no" dir="ltr">li</code></td>
</tr>
</tbody>
</table>

## Multiple paragraph list items

Any list item can contain more than one paragraph.

To create multiple paragraphs, use the `p` element rather than using the `br` element. (The HTML specification describes which uses of the [`br` element](https://html.spec.whatwg.org/multipage/semantics.html#the-br-element) are legitimate and which aren't.)

Example of a list item that contains more than one paragraph:

- This list item is a single paragraph.

- This list item contains multiple paragraphs.

  As you can see!

- This is another list item that's only one paragraph long.

## Introductory sentences for lists

Introduce a list with the appropriate context. In most cases, precede a list with an introductory sentence. The sentence can end with a colon or a period; usually a colon if it immediately precedes the list, usually a period if there's more material (such as a note paragraph) between the introduction and the list.

If the list doesn't need any additional context other than the heading that immediately precedes the list, it's OK to not introduce a list with an introductory sentence.

Introduce a list with a complete sentence, not a partial one that's completed by the list items. You can also use *the following* as a noun phrase (see [following](word-list.md#following) in the word list).

<table>
<thead>
<tr>
<th width="50%"></th>
<th width="50%"></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>Use the <strong>Submit</strong> button for any of the following purposes:</p>
<ul>
<li>To submit the form.</li>
<li>To indicate that you're done.</li>
<li>To allow the next person to enter their data.</li>
</ul></td>
<td><p>Use the <strong>Submit</strong> button to:</p>
<ul>
<li>Submit the form.</li>
<li>Indicate that you're done.</li>
<li>Allow the next person to enter their data.</li>
</ul></td>
</tr>
<tr>
<td><p>To get the USB driver, follow these steps:</p>
<ol>
<li>Click <strong>Tools  &gt; Android  &gt; SDK Manager</strong>.</li>
<li>Select <strong>Google USB Driver</strong>, and then click <strong>OK</strong>.</li>
</ol></td>
<td><p>To get the USB driver:</p>
<ol>
<li>Click <strong>Tools  &gt; Android  &gt; SDK Manager</strong>.</li>
<li>Select <strong>Google USB Driver</strong>, and then click <strong>OK</strong>.</li>
</ol></td>
</tr>
<tr>
<td><p>If you need to add an instance manually, do the following:</p>
<ol>
<li>Click <strong>Create instance</strong>.</li>
<li>For <strong>Name</strong>, enter a name.</li>
</ol></td>
<td><p>If you need to add an instance manually:</p>
<ol>
<li>Click <strong>Create instance</strong>.</li>
<li>For <strong>Name</strong>, enter a name.</li>
</ol></td>
</tr>
<tr>
<td><h4 id="objectives" data-text="Objectives" tabindex="-1">Objectives</h4>
<ul>
<li>Create an instance</li>
<li>Snapshot an instance</li>
<li>Delete an instance</li>
</ul></td>
<td><h4 id="objectives_1" data-text="Objectives" tabindex="-1">Objectives</h4>
<p>In the following tutorial, you will complete the following tasks:</p>
<ul>
<li>Create an instance</li>
<li>Snapshot an instance</li>
<li>Delete an instance</li>
</ul></td>
</tr>
</tbody>
</table>

For information about introducing sub-steps, see [Sub-steps in numbered procedures](procedures.md#sublists).

For information about punctuation and capitalization of lists, see [Capitalization and end punctuation](#capitalization).

## Unusual list numbering

Use nonstandard numbering in the following situations:

- To present a list in reverse-numerical order, use an `ol` element with a `reversed` attribute.
- To set a value manually, use the `value` attribute. In some cases, setting a value manually can be convenient. However, in most cases, it isn't a good idea to manually number a list item in a numbered list, because if the number of items changes later, you'll have to manually change the value.

## Sub-steps in a numbered procedure

For information about sub-steps in a numbered procedure, see [Procedures](procedures.md#sublists).

## Parallel syntax

Use the same syntax/structure for all list items in a given list, if possible.

## Capitalization and end punctuation

Capitalization and end punctuation depend on the type of list and the contents of the list.

### Numbered, lettered, and bulleted lists

Start each list item with a capital letter, unless case is an important part of the information conveyed by the list—such as in a list of glossary terms.

End each list item with a period or other appropriate sentence-ending punctuation, except in the following cases:

- If the item consists of a single word, don't add end punctuation.
- If the item doesn't include a verb, don't add end punctuation.
- If the item is entirely in code font, don't add end punctuation.
- If the item is entirely link text or a document title, don't add end punctuation.

If you end up with inconsistent punctuation in your list, then either rewrite your list to use [parallel construction](#parallel) or add end punctuation to every list item for consistency.

:

The following words are adjectives:

- Big
- Small
- Gratuitous

:

The SDK supports the following UI elements:

- Text box
- Bulleted list
- Button

:

The API supports the following actions:

- Create
- Replace
- Update
- Delete

:

You can do any of the following by using the API:

- Create an item.
- Replace one item with another.
- Update an item.
- Delete an item.

### Description lists

Sometimes it's useful to add an explanatory phrase to a list item, which can affect the punctuation. In general, don't add an explanatory phrase to only a single list item; instead, use a description list, and provide explanatory phrases for all items.

In most contexts, start each term (`dt` element) with a capital letter.

Don't end the term with a period. Do generally put a period at the end of each `dd` ("description") element.

<table>
<thead>
<tr>
<th width="50%"></th>
<th width="50%"></th>
</tr>
</thead>
<tbody>
<tr>
<td><p>The following words are adjectives:</p>
<dl>
<dt>Big</dt>
<dd>
A short word.
</dd>
<dt>Relevant</dt>
<dd>
A fancy word.
</dd>
<dt>Gratuitous</dt>
<dd>
A long word.
</dd>
<dt>Purple</dt>
<dd>
A vibrant color.
</dd>
</dl></td>
<td><p>The following words are adjectives:</p>
<ul>
<li>Big</li>
<li>Relevant</li>
<li>Gratuitous</li>
<li>Purple—this is a color.</li>
</ul></td>
</tr>
</tbody>
</table>

### Description lists that use run-in headings

In most contexts, format run-in headings as follows:

- Start the run-in heading with a capital letter.
- End the run-in heading with a period or a colon, but be consistent within the list.
- You can decide whether to bold the punctuation that ends the heading based on factors such as on-page consistency.

For the descriptions that follow the punctuation, capitalize the first letter as follows:

- If the text follows a period, start the text with a capital letter.
- If the text follows a colon, start the text with a lowercase letter.

To end the descriptive text, punctuate as follows:

- If the description follows a period, end the description with a period.
- If the description follows a colon, do one of the following:
  - If the description is a list of items or short phrases without verbs, don't include a period.
  - If the description includes a verb or expresses a standalone thought, end the description with a period.

Don't use a dash to set off a description from an item in a description list. For more information, see [Colons instead of dashes in lists](dashes.md#colons-instead-of-dashes-in-description-lists).

:

The following words are adjectives:

- **Big**: a short word
- **Relevant**: a fancy word
- **Gratuitous**: a long word
- **Purple**: a vibrant color

:

The coffee shop has several great choices:

- **Coffee**: latte, mocha, cappuccino, espresso, macchiato
- **Tea**: chai tea, chai latte, black tea, green tea, herbal tea

:

Budget Airlines reduces your ticket cost in several ways:

- **It increases fuel economy by reducing baggage weight**. By charging astronomical prices for anything larger than a wallet....
- **It carries more passengers per flight**. By reducing leg room to industry and medical minimums, it fits more seats....

**Note**: The guidelines here about list punctuation differ from the [Material Design guidelines](https://material.io/guidelines/style/writing.html#writing-capitalization-punctuation). If you're writing UI text rather than prose documentation, then follow the Material Design guidelines.

## Comma-separated lists

When you write a list in a paragraph, use [serial commas](commas.md#serial-commas) to separate the items.

Avoid ending a list with *etc.* or phrases like *and so on*. Instead, introduce the list in a way that makes it clear that the list isn't all-inclusive.

: The service processes data like event logs, clickstream data, social network interactions, and e-commerce transactions.

: The service processes event logs, clickstream data, social network interactions, e-commerce transactions, etc.

For more information, see [etc.](word-list.md#etc)
