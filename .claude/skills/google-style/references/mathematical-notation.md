# Mathematical notation

_Source: https://developers.google.com/style/mathematical-notation_

This page describes how to format common mathematical notation such as exponents, expressions, equations, operators, and variables in documentation. Formatting best practices can help ensure that your documentation is compatible with assistive technologies and renders accurately.

For general information about using and formatting numbers, see [Numbers](numbers.md).

**Note:** This page includes examples of formatting in HTML and Markdown in standard text. If you're using a third-party tool to display complex math, follow that tool's formatting guidance to ensure that your mathematical markup displays correct.

## Use HTML entities for mathematical symbols

In general, use HTML entities for mathematical symbols instead of keyboard symbols. The following table lists entities for symbols that are common in arithmetic and algebra. For the plus sign (`+`), equals sign (`=`), and division sign (`/`), you can use their keyboard equivalents.

<table>
<thead>
<tr>
<th width="15%">Symbol</th>
<th width="25%">Markup</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>+</td>
<td>Use the keyboard symbol.</td>
<td>Plus sign</td>
</tr>
<tr>
<td>−</td>
<td><code translate="no" dir="ltr">&amp;minus;</code></td>
<td>Minus sign</td>
</tr>
<tr>
<td>×</td>
<td><code translate="no" dir="ltr">&amp;times;</code></td>
<td><p>Multiplication sign</p>
<p>Alternatively, you can use the dot operator <code translate="no" dir="ltr">∙</code> (<code translate="no" dir="ltr">&amp;#8729;</code>) or asterisk operator <code translate="no" dir="ltr">*</code> (<code translate="no" dir="ltr">&amp;#42;</code>) to match the UI. Don't use an asterisk (<code translate="no" dir="ltr">*</code>) to indicate multiplication in text.</p>
<p>You can indicate multiplication by omitting the multiplication symbol if doing so doesn't create ambiguity—for example, instead of <em>a</em> × <em>b</em>, you can write <em>ab</em>.</p></td>
</tr>
<tr>
<td>/</td>
<td>Use the keyboard symbol.</td>
<td>Division sign</td>
</tr>
<tr>
<td>=</td>
<td>Use the keyboard symbol.</td>
<td>Equals sign</td>
</tr>
<tr>
<td>≠</td>
<td><code translate="no" dir="ltr">&amp;ne;</code></td>
<td>Not equal to</td>
</tr>
<tr>
<td>±</td>
<td><code translate="no" dir="ltr">&amp;plusmn;</code></td>
<td>Plus-minus sign</td>
</tr>
<tr>
<td>∓</td>
<td><code translate="no" dir="ltr">&amp;mnplus;</code></td>
<td>Minus-plus sign</td>
</tr>
<tr>
<td>&lt;</td>
<td><code translate="no" dir="ltr">&amp;lt;</code></td>
<td>Less than sign</td>
</tr>
<tr>
<td>&gt;</td>
<td><code translate="no" dir="ltr">&amp;gt;</code></td>
<td>Greater than sign</td>
</tr>
<tr>
<td>≈</td>
<td><code translate="no" dir="ltr">&amp;asymp;</code></td>
<td>Approximately equal to</td>
</tr>
<tr>
<td>≉</td>
<td><code translate="no" dir="ltr">&amp;nap;</code></td>
<td>Not approximately equal to</td>
</tr>
<tr>
<td>≅</td>
<td><code translate="no" dir="ltr">&amp;cong;</code></td>
<td>Congruent to</td>
</tr>
<tr>
<td>≤</td>
<td><code translate="no" dir="ltr">&amp;le;</code></td>
<td>Less than or equal to</td>
</tr>
<tr>
<td>≥</td>
<td><code translate="no" dir="ltr">&amp;ge;</code></td>
<td>Greater than or equal to</td>
</tr>
<tr>
<td>≡</td>
<td><code translate="no" dir="ltr">&amp;equiv;</code></td>
<td>Identical to</td>
</tr>
<tr>
<td>≢</td>
<td><code translate="no" dir="ltr">&amp;nequiv;</code></td>
<td>Not identical to</td>
</tr>
<tr>
<td>√</td>
<td><code translate="no" dir="ltr">&amp;radic;</code></td>
<td>Square root</td>
</tr>
<tr>
<td>∑</td>
<td><code translate="no" dir="ltr">&amp;sum;</code></td>
<td>N-ary summation</td>
</tr>
</tbody>
</table>

## Format mathematical notation

The following sections provide formatting for common math-related notation.

### Operators

To ensure accessibility and accurate HTML syntax, use [HTML entities](#html-entities) instead of keyboard symbols for operators. For example, use `&minus;` instead of a hyphen (`-`).

Include a non-breaking space (`&nbsp;`) on both sides of operators within a single expression, equation, or statement.

Don't italicize operators.

: *a* − *b*

To render *a* − *b*, use the following markup:

- **HTML:** `<i>a</i>&nbsp;&minus;&nbsp;<i>b</i>`
- **Markdown:** `_a_&nbsp;&minus;&nbsp;_b_`

### Variables

Italicize variables.

: *x* ≠ *y*

: *x*<sup>*y*</sup>

: *y*<sub>*i*</sub>

To render *x* ≠ *y*, use the following markup:

- **HTML:** `<i>x</i>&nbsp;&ne;&nbsp;<i>y</i>`
- **Markdown:** `_x_&nbsp;&ne;&nbsp;_y_`

### Expressions and equations

Include short expressions and equations inline with your text.

Include a non-breaking space (`&nbsp;`) between components such as operators and variables so that the expression or equation renders on the same line.

When an expression or equation creates an awkward line break, consider placing it on its own line.

: The equation that describes a linear trend line is *y* = *a* + *bx*.

: The equation that describes a polynomial trend line, where the order is *o*, is the following: *y* = *a* + *b* × *x* + ... + *k* × *x*<sup>*o*</sup>

To render *y* = *a* + *bx*, use the following markup:

- **HTML:** `<i>y</i>&nbsp;&=&nbsp;<i>a</i>&nbsp;+&nbsp;<i>bx</i>`
- **Markdown:** `_y_&nbsp;&=&nbsp;_a_&nbsp;+&nbsp;_bx_`

### Fractions

Express fractions as decimal numbers, when possible.

If you must express fractions as words, connect the numerator and denominator with a hyphen unless one of them is already hyphenated.

: 0.02

: one and one-half

: three-sevenths

: three seventy-fourths

### Exponents and subscripts

Use [standard mathematical notation](https://wikipedia.org/wiki/Exponentiation). Don't put a space between the base and the exponent.

To render exponents, use the HTML `<sup>` tag. Don't use the keyboard caret symbol (`^`) to indicate an exponent.

To render subscripts, use the HTML `<sub>` tag.

: 2<sup>3</sup>

: *x*<sup>*y*</sup>

: *y*<sub>*i*</sub>

: 2^3

To render 2<sup>3</sup>, use the following markup in HTML and Markdown: `2<sup>3</sup>`

## Notation as words

In general, you can use mathematical notation in place of words in running text. For example, in a sentence, you might use the statement *x* ≠ *y* instead of writing "*x* is not equal to *y*." If the use of notation instead of words creates ambiguous, grammatically incorrect, or difficult-to-read text, then use words to convey the mathematical concept.

: Check whether *a* \> *b*.

: The area is calculated by multiplying the length by the width.

: Check whether *a* is greater than *b*.

: The area is calculated by multiplying *l* × *w*.

## Tools for complex or multiline equations

The methods described on this page that use HTML entities and tags are suitable for most common mathematical notation. However, for more complex, multiline equations, or formulas that are difficult to represent clearly with standard HTML, consider using [diagrams, other images](images.md), or a dedicated math rendering tool to support comprehension. Images and diagrams like pie charts or bar graphs, in particular, are especially helpful for comparing statistics and illustrating percentages.

## More resources

- [Numbers](numbers.md)
- [Units of measure](units-of-measure.md)
- [Text-formatting summary](text-formatting.md)
