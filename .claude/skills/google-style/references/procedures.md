# Procedures

_Source: https://developers.google.com/style/procedures_

A procedure is a sequence of numbered steps for accomplishing a task. For information about lists of items that aren't part of a procedure, see the [Lists](lists.md) page.

## Introductory sentences

In most cases, introduce a procedure with an introductory sentence. This introductory sentence should provide context to the reader that isn't part of the section heading. Don't simply repeat the heading: if the heading explains what the procedure is, and no additional context is needed, then don't include an introductory statement.

The sentence can end with a colon or a period. Use a colon if it immediately precedes the procedure. Use a period if there's more material (such as a note paragraph) between the introduction and the procedure.

You can introduce a procedure with an imperative statement. Don't introduce a procedure with a partial sentence that's completed by the numbered steps.

: To customize the buttons, follow these steps:

: Customize the buttons:

: To customize the buttons, do the following:

: To customize the buttons:

For more information about introducing lists, see [Lists](lists.md#introductory-sentences-for-lists).

## Single-step procedures

When a procedure consists of only one step, write the step in one sentence and format it as a [bulleted list](lists.md#numbered-lettered-bulleted-lists).

:

- To clear (flush) the entire log, click **Clear logcat**.

:

To clear (flush) the entire log, follow this step:

1.  Click **Clear logcat**.

:

To clear (flush) the entire log, follow this step:

- Click **Clear logcat**.

## Sub-steps in numbered procedures

In a numbered procedure, sub-steps are labeled with lowercase letters, and sub-sub-steps get lowercase Roman numerals.

When a step has sub-steps, treat the step like an [introductory sentence](#introductory-sentences): put a colon or a period at the end of the step, as appropriate.

For more information about lists, see [Lists](lists.md#introductory-sentences-for-lists).

:

1.  To add a VM instance, do the following:
    1.  Click **Create instance**.
    2.  For **Name**, enter a name for the VM instance, and then do the following:
        1.  For **Region**, specify where you want to deploy the VM instance.
        2.  For **Machine type**, select an option.
    3.  Click **Create**.
2.  To connect to the VM instance by using SSH, click **SSH**.

## Order of multiple components in a step

To document a complex procedural step, use the following order:

1.  Describe the action to take.

2.  List a command, if necessary.

3.  Explain any placeholders that are used in the command.

    For more information, see [Formatting placeholders](placeholders.md).

4.  Explain the command in more detail, if necessary.

5.  List the output of the command, if necessary.

    For more information, see [Output from commands](code-syntax.md#output).

6.  In a separate paragraph, explain [the result of an action](procedures.md#steps-with-results-or-justifications), or any output, if necessary.

The following example demonstrates the preceding order:

1.  Plan the Terraform deployment:

    <div>

    </div>

    ``` devsite-click-to-copy
    terraform plan -out=NAME
    ```

    Replace `NAME` with the name of your Terraform plan.

    The `terraform plan` command does the following:

    1.  Parses the Terraform configuration, building a list of resources to provision.
    2.  Refreshes the current state of resources already provisioned in Google Cloud.
    3.  Creates a plan to make the currently provisioned resources match the parsed configuration.

    The output is similar to the following:

    <div>

    </div>

    ``` console
      Plan: 26 to add, 0 to change, 0 to destroy.
      ------------------------------------------------------------
      This plan was saved to: NAME
    ```

    The output shows what resources to add, change, or destroy.

## Multi-action procedures

In general, use one step for each action. However, you can combine small actions into one step [by using angle brackets](ui-elements.md#term-menus) (`>`) for sequential menu selections.

:

1.  Click **Next  \> Finish**.

:

1.  Click **File  \> New  \> Document**.

Don't make the steps too long. If they feel too long, consider splitting them into multiple steps.

## Multiple procedures for the same task

In general, if there's more than one way to complete a task, then document one procedure that's accessible for all readers. If all methods are accessible, pick the shortest and simplest approach if possible. If you need to document multiple ways to complete a task, then separate them in different pages, headings, or tabs.

The following guidelines can help you choose which procedure to document:

- Choose a procedure that lets readers do all the steps by using only a keyboard.
- Choose the shortest procedure.
- Choose a procedure that uses a programming language that most of your audience is familiar with.

## Repetitive procedures

Avoid repeating procedures. Instead, reference those procedures and link to them.

:

1.  Create a user as you did in the previous step.

:

1.  [Create a user as you did in the previous step.](#)

## Optional steps

For an optional step, at the beginning of the step, type *Optional* followed by a colon.

:

1.  Optional: Type an arbitrary string ...

:

1.  (Optional) Type an arbitrary string ...

For information about optional sections, see [Heading and title text](headings.md#heading-and-title-text).

## Steps that say where to complete a task

Tell the reader where to complete an action—for example, in a particular tool or UI field—before you state the action.

:

1.  In Google Docs, click **File  \> New  \> Document**.
2.  In the Google Cloud console, go to the **Monitoring** page.

:

1.  Click **File  \> New  \> Document** in Google Docs.
2.  Go to the **Monitoring** page in the Google Cloud console.

If a set of procedures is split across multiple headings, then in each procedure, restate where the reader completes the action. For example, if two procedures in a document take place in the console, then start both procedures with "In the console ..."

## Steps with goals

For some steps, it's useful to state the goal that the step accomplishes.

When a step includes a goal, state the goal before the action. This structure helps readers understand and complete the step more easily.

:

1.  To start a new document, click **File  \> New  \> Document**.

:

1.  Click **File  \> New  \> Document** to start a new document.

Sometimes, the preceding format can imply that the required step is optional. In such cases, use the following format:

:

1.  Start a new document: click **File  \> New  \> Document**.

It's usually clear within the context of a procedure whether a step is required. In such cases, the "To ..." format is more natural than the colon format.

To determine whether you need to use the colon format, consider how the goal of the step relates to the goal of the procedure. For example, in a procedure for creating a bar chart, a step with the goal "To create the chart" is clearly required. A step with the goal "To enhance the chart" is also unlikely to create confusion. But a step with the goal "To sort the data by date" might or might not be necessary. To clarify that the step isn't optional, use "Sort the data by date:" instead.

## Steps with results or justifications

Some steps consist of an action along with a resulting reaction that helps the reader navigate to the next step. State the action first and the result second. Keep the result in the same paragraph as the action. But also consider whether you can avoid repetitiveness and overwhelming the reader with too much bolding of UI elements.

:

1.  Click **Run**. The query results appear after the query runs.

:

1.  Click **Enter**.
2.  In the **New file** dialog that appears, click **Next**.

:

1.  Click **Enter**. The **New file** dialog appears.
2.  In the **New file** dialog, click **Next**.

For information about describing output, see [Output from commands](code-syntax.md#output).

Other steps benefit from including a justification for why the step is important. State the action first and the justification second.

:

1.  Store the private key in a secure location. You need it later.

## Summary of guidelines for writing procedures

<table>
<thead>
<tr>
<th width="40%">Guidance</th>
<th width="30%"></th>
<th width="30%"></th>
</tr>
</thead>
<tbody>
<tr>
<td>Make sure that the first sentence in a procedural step includes an imperative verb.</td>
<td>Clone the repository that contains the sample data.</td>
<td>You need the project ID later in this document. Retrieve the project ID.</td>
</tr>
<tr>
<td>Use complete sentences.</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Use parallel structure and consistent verb form.</td>
<td>Download the service account key to your local machine. Click <strong>More</strong>, and then click <strong>Download</strong>.</td>
<td>Download the service account key to your local machine by clicking <strong>More</strong> and then clicking <strong>Download</strong> file.</td>
</tr>
<tr>
<td>For an optional step, type <em>Optional:</em> as the first word of the step.</td>
<td>Optional: Type an arbitrary string...</td>
<td>(Optional) Type an arbitrary string...</td>
</tr>
<tr>
<td><p>Set the context (such as a tool or an environment) in which the reader performs a procedure.</p>
<p>If there are multiple headings associated with a set of procedures, restate the context of the procedure in the first step, even if the context is the same as in the previous procedure.</p></td>
<td><p>In Cloud Shell, connect to the development cluster.</p>
<p>In the Google Cloud console, go to the <strong>BigQuery</strong> page.</p></td>
<td></td>
</tr>
<tr>
<td>Write in the order that the reader needs to follow. State the location of the action before stating the action.</td>
<td><p>In Google Docs, click <strong>File  &gt; New  &gt; Document</strong>.</p>
<p>In the Google Cloud console, go to the <strong>Monitoring</strong> page.</p></td>
<td><p>Click <strong>File  &gt; New  &gt; Document</strong> in Google Docs.</p>
<p>Go to the <strong>Monitoring</strong> page in the Google Cloud console.</p></td>
</tr>
<tr>
<td>State the purpose or goal of the action before stating the action.</td>
<td>To start a new document, click <strong>File  &gt; New  &gt; Document</strong>.</td>
<td>Click <strong>File  &gt; New  &gt; Document</strong> to start a new document.</td>
</tr>
<tr>
<td><p>Don't use directional language to orient the reader, such as <em>above</em>, <em>below</em>, or <em>right-hand side</em>. This type of language doesn't work well for accessibility or for localization. If a UI element is hard to find, provide a screenshot.</p>
<p>For information about documenting icons, see <a href="/style/ui-elements#buttons">Buttons and icons</a>.</p></td>
<td><p>Click <strong>Menu</strong>.</p>
<p>In the preceding diagram,...</p>
<p>In the following diagram,...</p></td>
<td><p>Click the button with three lines.</p>
<p>In the above diagram, ...</p>
<p>In the diagram below, ...</p></td>
</tr>
<tr>
<td>Don't use <em>please</em>.</td>
<td>To open a document, click <strong>File  &gt; Open</strong>.</td>
<td>To open a document, please click <strong>File  &gt; Open</strong>.</td>
</tr>
<tr>
<td><p>Avoid using <em>run the following command</em> to introduce code. Instead, focus on what the command does.</p></td>
<td><p>In Cloud Shell, deploy the load generator:...</p>
<p>Define a firewall rule to allow internal traffic:...</p></td>
<td><p>In Cloud Shell, deploy the load generator by running the following command:...</p>
<p>Run the following command:...</p></td>
</tr>
<tr>
<td>If the reader must press <strong>Enter</strong> after a step, then include that instruction as part of the step.</td>
<td>Click the search box, type <code translate="no" dir="ltr">custom function</code>, and then press <strong>Enter</strong>.</td>
<td><ol>
<li>Click the search box and type <code translate="no" dir="ltr">custom function</code>.</li>
<li>Press <strong>Enter</strong>.</li>
</ol></td>
</tr>
<tr>
<td>Don't include keyboard shortcuts.</td>
<td>Copy the command, and then paste it...</td>
<td>Press Ctrl+C, and then press Ctrl+V...</td>
</tr>
<tr>
<td>When there's more than one way to do something, give only the best way. Giving alternate ways can confuse readers.</td>
<td></td>
<td></td>
</tr>
<tr>
<td>If your procedure includes code samples, see how to format <a href="/style/code-samples">code samples</a>.</td>
<td></td>
<td></td>
</tr>
<tr>
<td>If your procedure includes commands, see how to format <a href="/style/code-syntax#formatting-a-command">commands</a>.</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Ensure that the reader has the information that they need in order to prepare for the task ahead of time. Having information in advance supports task management, executive functioning, memory, and emotional regulation.</td>
<td>The following hardware and software are required:...</td>
<td></td>
</tr>
<tr>
<td>Include as few steps as possible to complete the task. Limit interruptions in the path.</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Focus on one reader decision at a time. Separate each instruction by making each instruction a separate list item.</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
