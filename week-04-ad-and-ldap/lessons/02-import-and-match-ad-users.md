# Lesson 2 · Import and match Active Directory users

=== "Theory"

    ## Follow a directory record into Okta

    A directory import reads users and groups from Active Directory (AD) into Okta. The **organizational unit (OU)** is a container in the AD directory tree. The integration selects user OUs and group OUs separately. Okta can therefore find a user and still miss a group the user belongs to. Check the actual location of each object against its own selection.

    1. The AD agent reads directory objects in scope.
    2. Okta receives the directory data and applies the configured username format. The **User Principal Name (UPN)** is a domain-style sign-in name. The **SAM account name** is the older Windows account name. Selecting SAM Account name in Okta combines it with the AD domain to generate the Okta username. Email and a custom expression are other options.
    3. For an unconfirmed directory record, Okta evaluates the configured matching rules. The match determines whether the AD record should link to an existing Okta user record or create a new one.
    4. Confirmation accepts that decision. An existing match retains its Okta user record and gets a linked AD account. A confirmed new record creates an Okta user. Activation is a separate decision.
    5. Once the link exists, profile sourcing and inbound mappings determine which AD data can update the Okta profile. Verify the stored value on the linked user.

    Find OU choices under **Directory → Directory Integrations → AD instance → Provisioning → Integration**. Find username, matching, and sourcing choices under **Provisioning → To Okta**. Check candidate records under **Import** and confirmed users under **Directory → People**. By default the AD user profile requires first and last name. Review the documented schema option if the directory legitimately omits those fields.

    [AD import and account settings](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm) · [Confirm imported assignments](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-confirm-user-assignments.htm) · [Manage AD users and groups](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-manage-users-groups.htm)

    ## Choose how a match becomes a link

    | Import decision | What Okta evaluates | What to verify |
    | --- | --- | --- |
    | Exact match | The configured username, email, or selected-attribute criteria. With multiple selected attributes, all must match. | The proposed Okta account is the intended person before auto-confirming. |
    | Partial match | If enabled, the first and last names match and username or email differs. | Review manually when names can repeat. |
    | New | The import record should create an Okta user. | Confirm that the person has no existing Okta account under another login. |
    | Existing | An admin specifies which Okta username to link. | Confirm identity using trusted directory data before selecting the account. |
    | Ignore | The import result is excluded from the assignment. | Verify that no link was created for that result. |

    **Auto-confirm exact matches**, **Auto-confirm partial matches**, **Auto-confirm new users**, and **Auto-activate new users** govern distinct decisions. Review the proposed matches manually when first enabling a source. If an expected match appears as New, compare the generated Okta username, the configured criteria, and the existing profile before confirming.

    ## Choose which changes the import can detect

    | Import type | What it processes |
    | --- | --- |
    | Full | Reads all in-scope users and reevaluates all unconfirmed users. Use it to reconcile deleted users or users moved out of a selected OU. |
    | Incremental | Reads users created or updated since the last import and evaluates those users. AD users and groups are tracked separately, so newly imported users can initially have incomplete group memberships. |
    | Scheduled | Normally performs incremental imports. Check the integration's settings for exceptions such as **Skip users during import**, which makes imports full. |

    For the difference between deleting an AD record, disabling it in place, and moving it beyond the selected OUs, see the [directory lifecycle comparison](08-manage-ad-profile-sourcing-and-lifecycle.md#compare-disabling-deleting-and-moving-a-user-in-ad).

    **Import safeguards** can pause import processing when unassignments exceed configured app-level or org-wide limits. Check the warning, OU scope, and upstream changes before resuming a paused import. The org-level safeguard also has a minimum assignment count, so a tiny test org may behave differently. **DirSync** is an optional AD change-tracking capability. Okta documents that toggling it forces the next import to be full.

    [On-demand imports](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-import-users-on-demand.htm) · [Scheduled imports](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-schedule-imports.htm) · [Import safeguards](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-safeguard.htm)

    ### Distinguish scope from data changes

    User and group OU filters define the objects a job can see. Where the tenant offers AD LDAP-style user or group filters, test the result set before changing the production filter. Changes can make previously imported records appear to have left scope. Treat a paused safeguard as evidence to inspect. Compare the unexpected unassignment count with the actual intended directory change. [AD import scope and filters](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm)

    A **backlink** is a relationship AD derives from another object's data. AD computes `memberOf`. A membership edit may therefore fail to trigger an incremental user-attribute refresh for a mapping based on that computed field. Use imported group membership for a group rule where appropriate. Check the actual group object and its membership as well as the user's profile. [Computed attributes in AD imports](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-configure-import.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-2.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | Exact match | All selected matching criteria must be met. |
    | Confirmation | Links an existing Okta user or creates a new one. |
    | Full import | Reconciles removed or out-of-scope records. |

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **One source change, two import modes**

    An existing AD account has a mapped field update. Another enabled user has been moved beyond selected OUs. A third import row has a plausible but uncertain existing match.

    1. Which import evidence distinguishes the first two cases?
    2. When is it safe to confirm the third row?
    3. What do you record after a confirmed match?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>A supported incremental import can pick up a change within scope. A full import can reconcile the missing in-scope account. Check the resulting lifecycle action for the moved account.</li>
    <li>Only after verifying the source ID and intended Okta identity under the configured matching rules. Leave an ambiguous row unconfirmed while you investigate.</li>
    <li>Verify retained Okta ID and correct source link, saved values, and no duplicate. Verify activation separately if sign-in access is required.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. An enabled AD user moved out of scope. Which comparison can detect that reconciliation case? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Run another incremental import only</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B" data-correct> <span>B. Run a full import and inspect scope and lifecycle handling</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Reset the user&#x27;s factor</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. Disable AD delegation as the first step</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> A full import can detect an account missing from selected scope. Check the applicable lifecycle configuration.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which evidence establishes a confirmed import matched the intended existing identity? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Confirmed link to the exact AD account</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Search for duplicate records and check the resulting profile</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C"> <span>C. Only the display name on the proposed row</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D" data-correct> <span>D. Intended pre-import Okta user ID</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and D.</strong> The stable ID and source link establish identity. Display names can match different people.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A confirmed imported row proves a fresh sign-in will succeed. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Confirmation and activation are separate. Test account state, credentials, and effective policy.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **A user moved out of the selected OU. Which import detects that removal?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Run a full import. Then verify the Okta user's status against the integration's lifecycle settings and any safeguard warning.</p>
    </details>

    **An imported user has the same name as an Okta user and a different username. When can Okta propose a partial match?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>When partial matching is enabled and the first and last names match. Confirm the person's identity before linking the records.</p>
    </details>

    **What is the difference between confirmation and activation?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Confirmation creates or links the intended Okta user. Activation is a separate lifecycle step.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** An AD import proposes an existing account match, but the proposed record has a similar name and a different stable identity in your HR inventory. How do you handle it?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Leave the row unconfirmed and review the integration's matching rules, incoming identifiers, and existing Okta user ID. Repair the matching data or confirm a separate account only after verifying the source identity.</p>
    </details>

    **Interview question.** Your change ticket says an import succeeded. How do you prove it linked the intended existing user and did not create a second account?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Compare the proposed match with the intended user ID, then verify the confirmed record retains that ID and shows the right linked AD account. Search for duplicate login or source records. Verify activation independently if sign-in is part of the ticket.</p>
    </details>
