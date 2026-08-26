# UI elements and interaction

_Source: https://developers.google.com/style/ui-elements_

## Focus on the task

When practical, state instructions in terms of what the reader should accomplish, rather than focusing on the widgets and gestures. By avoiding reference to UI elements, you help the reader understand the purpose of an instruction, and it can help future-proof procedures.

: Refresh the page.

: Expand the **Advanced options** section.

However, know the audience and understand the context. In some cases, the point of a procedure is to guide the reader through elements on the page. Or the UI might not be obvious, and it's helpful to explain the gestures for completing a step. Provide the level of detail that seems useful for the intended audience.

: Click **Refresh**.

: To expand the **Advanced options** section, click the expander arrow.

The rest of this page focuses on scenarios where you've decided it's useful to explicitly discuss UI elements.

For information about writing procedures, see [Procedures](procedures.md).

## Format names of UI elements

When referring to any UI element by name, put its name in bold, using the `b` element in HTML or `**` in Markdown. This includes names for buttons, menus, dialogs, windows, list items, or any other feature on the page that has a visible name. Don't use code font for UI elements, unless it's an element that meets the [requirements for code font](code-in-text.md). In that case, use both code font and bold.

**Note**: The reason for using the [`b` element](https://html.spec.whatwg.org/multipage/semantics.html#the-b-element) is that in modern HTML, `b` connotes text to which you want to draw visual attention, whereas the [`strong` element](https://html.spec.whatwg.org/multipage/semantics.html#the-strong-element) indicates strong importance.

Don't make an official feature name or product name bold, except when it directly refers to an element on the page that uses the name (such as a window title or button name).

: In the **New project** window, select the **New activity** checkbox, and then click **Next**.

: In the New Project window, select "New Activity", and then click the "Next" button.

If you document a UI element outside the context of a procedure, try to provide context for the element.

: The service lets you check the status of all jobs in the **Current jobs** section of the service console.

: The service lets you check the status of all jobs in the **Current jobs** section.

## Use appropriate capitalization

In most cases, follow the capitalization as it appears on the page. However, if labels are inconsistent or they're all uppercase, use sentence case.

| Guidance |  |  |
|----|----|----|
| When a label is all uppercase, use sentence case. | Click **Refresh**. | Click **REFRESH**. |
| When referring to multiple labels that are inconsistently cased, use sentence case for all of the labels. | Click **New project**, and then click **New activity**. | Click **NEW PROJECT**, and then click **New Activity**. |

## Refer to UI elements

Don't use UI elements as if they were English verbs or nouns.

<table>
<thead>
<tr>
<th width="50%"></th>
<th width="50%"></th>
</tr>
</thead>
<tbody>
<tr>
<td>In the <strong>Name</strong> field, enter an account name.</td>
<td><strong>Name</strong> the account.</td>
</tr>
<tr>
<td>To save the settings, click <strong>Save</strong>.</td>
<td><strong>Save</strong> the settings.</td>
</tr>
<tr>
<td><p>In the <strong>Service account ID</strong> field, enter a name.</p>
<p>For <strong>Service account ID</strong>, enter a name.</p></td>
<td>Specify a <strong>Service account ID</strong>.</td>
</tr>
</tbody>
</table>

## Terminology and usage

A user interface can contain a variety of UI elements. In general, focus on the feature and its functionality, not the UI element. If you think it adds clarity for the reader, use the name of the UI element. For example, both of the following sentences are valid:

: Go to **File  \> Tools**.

: In the **File** menu, click **Tools**.

Don't use slang terms for UI elements—for example, *hamburger icon* or *zippy*. For more information, see [Buttons and icons](#buttons).

: To expand the **Advanced options** section, click the expander arrow.

: Expand **Advanced options**.

: To expand the **Advanced options** section, click the zippy.

The following sections define some terms to use when referring to UI elements.

For prepositions to use with these elements, see the [Prepositions](#prepositions) table.

### Windows, pages, dialogs, panes, and sections

Most often, a *window* is the entire application window in a desktop environment. However, it can also refer to modular application elements that you can open and close. For example, in Android Studio, several windows are available in the **View  \> Tool Windows** menu.

: In the **MyApp** window, click **Edit**.

: In the **MyApp** page, click **Edit**.

*Page* is the preferred term when referring to a web page in general and to a subpage of a console in particular. For more information, see [console](word-list.md#console).

: In the Google Cloud console, go to the **Deployments** page.

: In the Google Cloud console, go to the **Deployments** window.

A *dialog* is a smaller window that is usually detached from the main application window and appears in front of the window.

: In the **Welcome** dialog, click **OK**.

: In the **Welcome** pop-up window, click **OK**.

A *pane* (or *panel*) is typically a distinct rectangular region within a larger browser or application window. A pane or panel can often be tightly coupled to surrounding UI regions, whereas a window is distinctly separate and can be hidden. Do not use terms such as *window*, *section*, *area*, or *column* to refer to a pane or panel.

: In the **Create service account** pane, click **New**.

: In the **Create service account** section, click **New**.

A *section* is a labeled grouping of options and controls, usually within a window, pane, or panel. Do not use terms such as *area* or *column* to refer to a section.

: In the **Create metric** pane, do the following:

- In the **Metric type** section, select **Counter**.
- In the **Labels** section, click **Add label**.

### Menus and menu bars

In a desktop application, the *menu bar* appears at the top of the window or at the top of the screen; it's a set of *menus* (such as **File** or **Edit**), each of which is a set of related *commands* and/or nested submenus.

To refer to an item in a menu, use the term *command*, not *choice*, *menu item*, or *option*. Exception: if you're documenting how to build an interface, you can use *menu item*.

To refer to a menu, use the form *the **`LABEL_NAME`** menu.*

To tell the reader where to find a command in a menu or submenu, use a phrase like *In the **File** menu, select **Open**.*

Don't use *drop-down* as a synonym for *menu*. See [drop-down](word-list.md#drop-down).

#### Use angle brackets

Another option is to use angle brackets (\>). If you use angle brackets, follow these guidelines:

- Put a nonbreaking space (`&nbsp;`) before each angle bracket.
- Don't bold each menu name separately; instead, enclose the entire sequence in a single bold tag (`<b>...</b>` or `**...**`).
- Wrap the angle bracket with a span tag and add an `aria-label` attribute with *and then* text (for example, `<span aria-label="and then">></span>`). Otherwise, some screen readers might read `>` as "greater than."

In the following example, the text renders as *Select **View  \> Tools  \> Developer Tools***. A screen reader interprets this as *Select View and then Tools and then Developer Tools*.

### HTML

```
Select <b>View&ampnbsp;<span aria-label="and then">></span> Tools&ampnbsp;<span aria-label="and then">></span> Developer Tools</b>.
```

### Markdown

```
Select **View&ampnbsp;<span aria-label="and then">></span> Tools <span aria-label="and then">></span> Developer Tools**.
```

This notation is useful for abbreviating a longer phrase like *In the **File** menu, select **Open**.* However, this notation applies only to menu items. Don't use it to describe a combination of different UI elements.

: Select **MyApp  \> Preferences**, and then select the **Languages** preference pane.

: Select **MyApp** \> **Preferences** \> **Languages** \> **+** \> **CSS**.

### Navigation menu

A *navigation menu* is a control—usually a pane or window—that contains a list of items that the user can click to go to pages in an application or website. Don't use the terms *navigation bar*, *navigation pane*, *navigation panel*, or *navigation window* for such a control.

: In the BigQuery navigation menu, click **Scheduled queries**.

### Toolbar

A *toolbar* is a set of buttons for common user actions. A toolbar button that includes a menu is called a *menu button*. Refer to the toolbar by name if you think that the user needs help finding a button.

: On the Google Cloud console toolbar, click **Notifications**.

: Click **Notifications**.

### Buttons and icons

A *button* initiates an action when clicked (or tapped, in the case of a touchscreen). To refer to a button, use the button's label.

: Click **OK**.

: Click the "OK" button.

An icon is a symbol or image that represents an object or a function. An icon can be a button as well. If the button includes an icon, write the name of the button as shown in the tooltip, and add the button icon before the name. If you need to use a space between the icon and the name for readability, use a nonbreaking space.

: Click **Settings and utilities**.

: Click .

If the icon tooltip is identical to the name of the icon, use an [empty `alt` attribute](images.md#alt-text).

If you're unsure of the name of the icon, inspect the element using browser tools. In many cases, a visual element like an icon has an ARIA attribute that provides a textual description of the element for use by screen readers. To inspect an element, right-click the element and select **Inspect** or **Inspect element**, depending on your browser. Look for one of the following types of labels: `aria-labelledby`, `aria-label`, `aria-describedby`, `label`, `placeholder`, or `title`. For more information, see [Using aria-label](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) and [Accessible Name and Description calculation](https://www.w3.org/TR/html-aapi/#accessible-name-and-description-calculation).

If a button with an icon doesn't include a tooltip, submit a bug report requesting that a tooltip be added. Tooltips are crucial for accessibility, and for documentation and discoverability in general.

: Click <img src="/static/style/images/icon-add.png" class="inline-icon" /> **Add**.

: Click the <img src="/static/style/images/icon-add.png" class="inline-icon" alt="hammer icon" /> icon.

If a UI element name ends with an ellipsis (...), leave out the ellipsis.

: Click **Browse**.

: Click **Browse ...**.

Don't use directional language to orient the reader, such as *above*, *below*, or *right-hand side*. Phrases like those don't work well for accessibility or for localization. If a UI element is hard to find, provide a screenshot.

: Click <span class="material-icons" aria-hidden="true" translate="no">menu</span> **Menu**.

: In the left-side panel, click the button with three lines.

#### Difficult-to-find UI elements

If you have UI elements that are difficult to find, consider one of the following options as an alternative to using directional language, which can be problematic for accessibility and localization reasons.

- Use the button icon along with its name as shown in the button tooltip.
  <div class="example">

  : Click **Refresh**.

  </div>

- Add context to help the user find the element.
  <div class="example">

  : On the Cloud Run toolbar, click **Refresh**.

  </div>

- Use a screenshot.

  <div class="example">

  : In the list of services, click **Column display options**.

  <img src="/static/style/images/list-of-services.png" class="screenshot" style="width:50.0%" alt="List of services." />

  </div>

  For more information about when and how to use screenshots, see [Diagrams, figures, and other images](images.md).

### Tab

A *tab* is a navigation element that looks like a file tab. To refer to a tab, use the form *the **`LABEL_NAME`** tab*.

: Select **Tools  \> Options**, and then click the **Edit** tab.

### Text box

A *text box* is a box that the user can type in. Use *box* and the form *the **`LABEL_NAME`** box*. Format the text that the user types by using the `code` element in HTML, or by using code formatting (monospace) in other markup.

: In the **Owner** box, enter your name.

: In the **Name** box, enter `wsfc-1`.

 In Google Cloud, use *field* instead of *box*.

Workspace: In Google Workspace documentation, use *field* instead of *box*.

: In the **Instance** field, specify a value less than 64 characters long.

### List box, combo box, and spin box

A *list box* is a box that offers the user a list of items. To refer to a list box, use the form *the **`LABEL_NAME`** list* or *the **`LABEL_NAME`** box*, whichever is clearer.

: In the **Item** list, select **Desktop**.

A *combo box* is a combination of a text box and a list box. To refer to a combo box, use the form *the **`LABEL_NAME`** box*. To refer to entering a value into a combo box, use the verbs *type or select* or *enter*.

: In the **Font** box, type or select the font that you want to use.

A *spin box* is a box that lets the user choose a value by clicking arrows or by typing. To refer to a spin box, use the form *the **`LABEL_NAME`** box*. To refer to entering a value into a spin box, use the verb *enter*.

: In the **Font Size** box, enter a font size.

### Checkbox

A *checkbox* is a small box that indicates whether an option is on or off. To refer to a checkbox, use the form *the **`LABEL_NAME`** checkbox*.

Be wary of using the verbs *check* and *uncheck*, which can be ambiguous; it's often best to use *select* and *clear* instead.

: Select the **Automatically check for updates** checkbox.

: Clear the **Bookmarks** checkbox.

If you need to refer to the state of the checkbox, it's often best to refer to it as *selected* or *not selected*.

: Make sure that the **Bookmarks** checkbox is selected.

: Make sure that the **Bookmarks** checkbox isn't selected.

### Radio button

A *radio button* is a small button used to choose one item from a group of mutually exclusive options. To refer to a radio button, use the radio button's label, or refer to the group of buttons by its label.

: Select **Do not remember passwords**.

: For **Startup mode**, select an option.

### Expander arrow

An *expander arrow* is the UI element used to expand or collapse a section of navigation or content. Avoid referring to these explicitly in documentation, but when you do, use the terms *expander arrow* and *expandable section* rather than terms like *expando* or *zippy*.

: To expand the **Advanced options** section, click the expander arrow.

: To expand the **Advanced options** section, click the zippy.

### Toggle

A *toggle* is the UI element that switches back and forth between on and off states. Don't use the word *toggle* as a verb. Describe the action that you want the user to take.

: To turn on the setting, click the **Wi-Fi** toggle.

In some cases, you might not know what state the toggle is in before the user interacts with it so be clear what position the toggle should be in.

: In **Settings**, click the **Magic mode** toggle to the on position.

## Press and type keyboard keys

To indicate that the user should press a given keyboard key or combination, use the `kbd` element.

The following is an example of a `<kbd>` tag:

: `Press <kbd>Control+C</kbd>.`

When rendered, the text appears as follows:

: Press .

If you're working with non-HTML markup, use monospace formatting, which is how the `kbd` element renders.

To refer to a letter key, use uppercase instead of lowercase.

: To save, press .

: To save, press .

To refer to a key that the user types to enter that key's value as text input, use the `code` element, not the `kbd` element. For more information, see [Code font](text-formatting.md#code-font).

To refer to a keyboard key, use the key's name. If that's ambiguous, use the form *the  key*.

: Press .

: Press the  key.

Spell out the names of modifier keys such as Command, Control, Option, and Shift. Don't use symbols for those keys. To refer to a key combination, use the form **.

: Press .

When you provide shortcuts for multiple operating systems, put the macOS shortcut in parentheses after the Windows and Linux shortcut.

: To copy, press  (or  on macOS).

: To copy, press  ().

To refer to a key or combination that uses the Shift key, use the form **.

: Press .

Spell out the names of characters that could be confusing in a keyboard shortcut, such as comma, hyphen, period, and plus.

To refer to a keyboard shortcut, use either *keyboard shortcut* or *key combination*.

To refer to pressing a key or combination to cause an action to occur, use the verb *press*. To refer to typing a key or combination as part of text, use the verbs *enter* or *type*.

## Prepositions

When documenting the UI, use the following prepositions.

<table>
<thead>
<tr>
<th width="20%">Preposition</th>
<th width="25%">UI element</th>
<th width="55%"></th>
</tr>
</thead>
<tbody>
<tr>
<td>in</td>
<td><p>dialogs</p>
<p>fields</p>
<p>lists</p>
<p>menus</p>
<p>panes</p>
<p>windows</p></td>
<td><p>In the <strong>Alert</strong> dialog, click <strong>OK</strong>.</p>
<p>In the <strong>Name</strong> field, enter <code translate="no" dir="ltr">wsfc-1</code>.</p>
<p>In the <strong>Item</strong> list, select <strong>Desktop</strong>.</p>
<p>In the <strong>File</strong> menu, click <strong>Tools</strong>.</p>
<p>In the <strong>Metrics</strong> pane, click <strong>New</strong>.</p>
<p>In the <strong>Task</strong> window, click <strong>Start</strong>.</p></td>
</tr>
<tr>
<td>on</td>
<td><p>pages</p>
<p>tabs</p>
<p>toolbars</p></td>
<td><p>On the <strong>Create an instance</strong> page, click <strong>Add</strong>.</p>
<p>On the <strong>Edit</strong> tab, click <strong>Save</strong>.</p>
<p>On the <strong>Dashboard</strong> toolbar, click <strong>Edit</strong>.</p></td>
</tr>
</tbody>
</table>

## Verbs in procedures

To describe an action on the page, use the following verbs. For more information about each verb, see its corresponding entry on the [word list](word-list.md).

- [Click](word-list.md#click)
- [Choose](word-list.md#choose)
- [Drag](word-list.md#drag)
- [Enable](word-list.md#enable)
- [Enter, type](word-list.md#enter)
- Go to (see [scroll](word-list.md#scroll))
- [Hold the pointer over](word-list.md#hold-the-pointer-over)
- [Press](word-list.md#press)
- [Select](word-list.md#select)
- [Tap](word-list.md#tap)
- [Turn on, turn off](word-list.md#turn-on)

For information about writing procedures, see [Procedures](procedures.md).
