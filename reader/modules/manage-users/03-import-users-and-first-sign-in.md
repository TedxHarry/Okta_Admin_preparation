# Lesson 3 · Bring users into Okta through imports or first sign-in

=== "Theory"

    In Lesson 2, you saw how an administrator creates one account with **Add Person**. Now suppose the user information already exists in a file, a connected directory, or an app. Before you bring it into Okta, ask two questions. **What should start the process?** And **if this person already has an Okta account, how will Okta recognize the right one?** Those decisions affect whether you get a new account, a link to an existing account, or a result that needs review. [Okta · Import users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-main.htm)

    ## Choose what starts the process

    If this is your first import, start with [the People CSV exercise](#__tabbed_1_2). Read the connected-import and safeguard sections when you have a test integration or need to interpret an import result.

    | Path | What starts it | When to look for the Okta record |
    | --- | --- | --- |
    | **People CSV import** | An administrator uploads a file of user information. The file is a snapshot of the rows you supplied. | After validation and import, check the summary and **Directory → People**. |
    | **Connected app or directory import** | Okta reads account data through a configured integration, either on demand or on a schedule. | Check the integration’s **Import** tab for matches and new users that need confirmation, then check People. |
    | **Just-in-Time (JIT) provisioning** | A successful, eligible sign-in through a configured authentication source can create an Okta record. | Check the authentication result and look in People after the first sign-in. |

    A **source account** is the record in the connected system. The **Okta account** is the record in your Okta org. A **match** identifies an existing Okta account as the same person. A **link** records the relationship between the source account and that Okta account. **Activation** determines when the Okta account becomes available for use. Keep those decisions separate when reading an import result. [Okta · Match imported user attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-matching-imported-users.htm) · [Okta · JIT provisioning](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-add-users-jit.htm)

    ## Two CSV imports with different purposes

    A **CSV** is a text file organized into rows and columns. The first row names the columns, and each subsequent row describes one user. Start from the template for the screen you’re using. That tells you which fields Okta expects and saves you from guessing their names.

    ### Add or update accounts from People

    Find **Directory → People → More Actions → Import users from CSV**. The template reflects the current Okta user profile. Keep its headings and fill in required fields. On upload, Okta validates the file before it imports the rows. Review the result and fix any errors before you proceed. Leaving a CSV cell empty does **not** clear an existing profile value. If your intent is to erase a value, verify the supported way to make that change for the account’s source. [Okta · Import users from a CSV file](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-csv.htm)

    Review the activation options before submitting. **Automatically activate new users** controls whether new users are activated by the import. Enabling it makes the **Do not create a password and only allow login via Identity Provider** setting available. An **identity provider** is the system the user authenticates through. Use the external-provider option when those users are meant to sign in through a configured external identity provider. Okta skips the activation emails and Okta password setup prompts on that path. For a CSV import with profile sourcing enabled, Okta documents that user status is updated only through CSV files. [Okta · Import users from a CSV file](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-csv.htm)

    ### Assign users from an app’s Import tab

    The app’s **Import from CSV** workflow uses the app profile’s fields and their mappings into Okta. A **mapping** tells Okta which source field supplies a destination field. In **Directory → Profile Editor**, check that the app profile has **username**, **firstname**, **lastname**, and **email**, that they are text fields, and that they are mapped to Okta. The app’s CSV template includes app-user fields mapped into Okta. Save the file in CSV UTF-8 format. [Okta · Assign users to apps using a CSV file](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-users-csv.htm)

    Open the app’s **Import** tab. **Import from CSV** is the file workflow. **Import Now** indicates provisioning is enabled, in which case this app CSV assignment workflow is unavailable. After using the file workflow, review the summary for new, uploaded, unchanged, or failed rows and download the error report if needed. Then check the user under the app’s **Assignments** so you know the intended app access is present. [Okta · Assign users to apps using a CSV file](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-assign-users-csv.htm)

    ## Connected imports read the source and propose a result

    For a connected app that supports provisioning, check **Applications and Resources → Applications → select the app → Provisioning → To Okta**. This direction means the data is coming into Okta. If you’re ready to run it manually, use the app’s **Import → Import Now**. Where the connector supports both modes, a **full import** reads the complete configured set and an **incremental import** reads changes since the previous import. The connector determines which modes are offered. When both schedules are available, Okta does not allow full imports to run more frequently than incremental imports. [Okta · Import users from an app](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-users-app.htm) · [Okta · Edit app provisioning settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm)

    ### Matching, confirmation, and activation

    1. **Find the person.** In **User Creation & Matching**, choose what counts as an exact match. The **Okta username format** setting defines the login name Okta derives from an incoming account. Exact-match options can use that username format, an email address, a mapped base or custom attribute, or an attribute combination. If matching by a mapped attribute, pay attention to case. If the attribute is missing from the list, check the app-to-Okta mapping in **Profile Editor**.
    2. **Review the proposed result.** A match links the source account to an existing user when confirmed. An unmatched record can become a new user. If enabled, a **partial match** can suggest someone whose first and last names agree even though the username or email does not. Two people can share a name, so verify a second identifier before accepting that suggestion.
    3. **Decide whether to confirm and activate.** Confirmation accepts the proposed outcome. Okta has separate **Confirm matched users** and **Confirm new users** settings. For new users, you can also choose activation during confirmation where offered. Start with the import result, then check the Okta status to see whether the record is ready or still needs an action.

    A good way to read this is to compare two incoming records. If a mapped, unique employee number already belongs to someone in Okta, you expect a link to that account. If you only have matching names, open the proposed record and check another identifier before you confirm. [Okta · Match imported user attributes](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-matching-imported-users.htm) · [Okta · Edit app provisioning settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm)

    Once a record is linked, **Profile & Lifecycle Sourcing** governs which system can supply data and how source-side deactivation or reactivation affects Okta. For example, **Do Nothing** for source-side deactivation can coexist with sourcing profile values from that app. Some integrations also expose an **import inline hook**, which lets a configured external service help resolve attribute conflicts or matching during import. Profile ownership is the focus of Lesson 4. [Okta · Edit app provisioning settings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-edit-app-provisioning.htm)

    If an import picked up the wrong accounts and none of the affected rows should be confirmed, **Clear Unconfirmed Users** clears the entire unconfirmed queue for the selected app. Review the queue first because this action applies to all its unconfirmed rows. The control is unavailable while an import for the app is in progress. [Okta · Clear unconfirmed users](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-clear-unconfirmed.htm)

    ## Monitor the import and understand a safeguard stop

    The app’s **Import** tab shows the results you may need to review. For import progress, status, and logs across apps, use **Reports → Import Monitoring**. Okta documents a seven-day view and requires the **Manage applications** and **Run Imports** permissions for it. Filter by app or status, expand the run details, or use **View** in the **Logs** column to open the related System Log information. Then check the user record or app assignment to verify the final result. [Okta · Import Monitoring](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-view-import-monitoring-dashboard.htm)

    An **import safeguard** can pause processing if the import is about to remove too much access. It protects against outcomes such as many assignments disappearing because the incoming data changed unexpectedly. Its coverage depends on what would be removed.

    | Safeguard | What to check |
    | --- | --- |
    | **App unassignment** | Okta documents a default of **20%**, enabled by default, for apps with **more than 100 users**. It covers app assignment changes through groups imported from Active Directory. For example, removal of a direct app assignment and AD user deactivation from an Okta-managed assignment group fall outside its app-level count. Okta documents that changing the app threshold in one app applies the new setting across apps. |
    | **Org-wide unassignment** | The documented default is **20%**, enabled by default, and the org needs at least **100 app assignments**. User deletions and unassignments can count independently of the source’s configured deactivation action. When both user safeguards apply, the first limit reached stops the import. The app safeguard takes priority if the limits are equal. |
    | **Entitlement unassignment** | An **entitlement** is access within an app, such as a role or license. Where this Early Access feature is enabled, its safeguard is per app and has no minimum user count. It can use a percentage threshold or a fixed user count. Okta documents defaults of **10%** and **100 users**, respectively. The first full import after enabling the safeguard or schema block establishes the comparison baseline and does not trigger a safeguard limit. Okta documents a maximum of 3,000 entitlements per user. A separate schema protection setting allows additions and blocks modifications or deletions of entitlement types. |

    The enable, disable, and threshold controls are under the integration’s **Provisioning → To Okta → Import Safeguard** settings, where supported. If the warning shows the removals you planned and verified, Okta provides **Resume All Imports**. If the removals are unexpected, use **Cancel the Affected Import and Resume Other Imports**, then check the source data and the integration before retrying. You can read a safeguard configuration in a small org even when your test data falls below the minimum for triggering it. [Okta · Import safeguards](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-import-safeguard.htm) · [Okta · Enable or disable safeguards](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-enable-disable-safeguard.htm) · [Okta · Change the threshold](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-safeguard-threshold.htm) · [Okta · Resolve warnings](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-resolve-import-safeguard.htm)

    ## JIT starts with authentication

    **Just-in-Time provisioning** can create an Okta account when an eligible user first authenticates through a configured source. With **delegated authentication**, Okta relies on the connected directory to validate the user’s credentials. For Active Directory (AD) and LDAP, follow the integration-specific guides. They call for delegated authentication and show **Directory → Directory Integrations → select the directory → Provisioning → To Okta → Create and update users on login**. An inbound SAML identity provider has its own matching, account linking, and JIT settings. [Okta · AD JIT](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-add-update-JIT.htm) · [Okta · LDAP JIT](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-add-update-jit.htm) · [Okta · SAML identity provider](https://help.okta.com/en-us/Content/Topics/Security/idp-add-saml.htm)

    For AD and LDAP, JIT account creation and activation apply to new Okta users. If you already confirmed that user on **Import Results**, the user is outside JIT activation even if they are still waiting to be activated. JIT follows its own path and ignores the source directory’s ordinary **User Creation & Matching** settings. The JIT path does not send an Okta activation email. [Okta · JIT provisioning](https://help.okta.com/oie/en-us/Content/topics/users-groups-profiles/usgp-add-users-jit.htm) · [Okta · AD JIT](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-add-update-JIT.htm) · [Okta · LDAP JIT](https://help.okta.com/oie/en-us/content/topics/directory/ldap-agent-add-update-jit.htm)

    Account creation and refresh are separate outcomes. For an existing linked AD user, the AD guide also documents that opening or refreshing that user’s profile in the console can bring in changes since the last sync when JIT is enabled. If you’re trying to prove what an import changed, account for that before using the visible profile as evidence of what the import alone did. When investigating a missed first-sign-in creation, check the actual sign-in source, the integration’s JIT setting, and whether the user was already linked or confirmed. [Okta · AD JIT](https://help.okta.com/oie/en-us/Content/Topics/Directory/ad-agent-add-update-JIT.htm)

=== "Hands-on Lab"

    --8<-- "lab-3.md"


=== "Revision"

    ## Choose the right import path

    | Path | Trigger and proof |
    | --- | --- |
    | **People CSV** | **Directory → People → More Actions → Import users from CSV**. Use the org's template, validate, choose activation options, and verify the exact user and imported values. A blank input cell does not clear an existing value. |
    | **App CSV** | **Applications → app → Import → Import from CSV**, where supported. Use the app's template and check inbound mappings and the app assignment. |
    | **Connected import** | Review **Provisioning → To Okta → User Creation & Matching**. Run **Import → Import Now** where supported, inspect proposed rows, then verify the linked or newly created record. |
    | **Just-in-Time (JIT)** | Eligible first sign-in through a configured source can create the Okta user. For AD and LDAP, check delegated authentication, the directory JIT setting, and prior import confirmation. Inbound SAML has its own controls. |

    **Matching → confirmation → activation.** Matching proposes an existing user or a new record. Confirmation accepts the result. Activation controls account availability. Use a mapped unique identifier to validate a proposed match. Treat similar names as a reason to inspect the record.

    **When an import stalls.** Use **Reports → Import Monitoring** and the connector's import results. If a safeguard stops the run, compare source scope and proposed removals before resuming or cancelling. A full import reads the configured population. An incremental import reads changes when the connector supports it.

    **Exam focus.** Explain how import and JIT differ for AD. Verify the required settings and compare the final record in **People**. A People CSV exercise provides practice with file import. Live JIT requires a configured identity source.

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. An AD user is already confirmed and Staged. The goal is to let that exact account sign in. What action fits? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. Turn off matching</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Import a duplicate</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Wait for JIT to activate the staged record</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. Activate the confirmed record and verify sign-in</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> Confirmation creates or links the record. Activation is a separate operation for a staged, confirmed user.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. An import proposes an unexpected surge in removals after a connector change. Which checks belong before approval? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Compare the current source filter and scope to the last good run</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Verify which removals were authorized</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Inspect import results and safeguard details</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Confirm all changes so the import finishes</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> A scope error can look like a mass departure. Validate the source population before applying removals.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. An exact identifier match and a matching display name carry the same evidence that two records belong together. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> A display name can collide or change. Validate a durable identity identifier under the configured matching rules.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. An incoming employee has a new surname and the same unique mapped employee ID. What do you inspect?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>Review the proposed existing-account match and confirm the exact linked person before accepting it.</p>
    </details>

    **2. A user was already confirmed in directory import results. Should you expect AD or LDAP JIT to activate the staged account?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>No. Check the user's import and activation state and use the appropriate activation workflow.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** An import proposes five matches and one same-name record with a different username. You have never seen this integration's matching rules. What do you do with the sixth record?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Review its configured matching fields, unique identifiers, and source record before confirming anything for that row. Resolve the ambiguity before choosing the existing account or a new one. A false match can attach the wrong source to an existing identity.</p>
    </details>

    **Interview question.** An HR feed shrinks after its search filter changes. The import safeguard stops processing. What would you do before allowing the job to continue?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Compare the source population and connector filter with the last good run. Reconcile the proposed unassignments against approved changes, restore a bad filter, and rerun. Only approve verified removals. A stopped import is a signal to investigate scope.</p>
    </details>
