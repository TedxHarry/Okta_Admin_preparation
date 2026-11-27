# Lesson 3 · Manage Universal Directory user types

=== "Theory"

    A custom user type lets an administrator give a population its own profile schema and app property mappings. Decide which attributes belong to that type and which should be shared with the default type.

    ### Separate the assigned type from the profile label

    An **assigned user type** determines which Universal Directory schema applies to an account. Every account has one assigned type. An org can have up to ten types, including the default and up to nine custom types. In **Directory → Profile Editor → Create Okta User Type**, a Super Admin or Org Admin can define a new type. Its schema starts with the 31 default base attributes, and you add the custom fields it needs. The display name can be changed later. Choose the variable name carefully because it cannot be changed after creation.

    The base profile property `userType` is a string value, such as `Contractor`. Setting that field leaves the assigned type and schema as they were. To verify which schema applies, read the type shown at the top of the person’s profile and inspect that type in Profile Editor.

    [About custom user types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-usertypes-about.htm) · [Create a custom user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-user-type.htm)

    ### Create, move, and retire users

    | Action | What to verify |
    | --- | --- |
    | Create an Okta-sourced user | Select the type in **Directory → People → Add Person**. After saving, verify the type and any type-specific fields on the new profile. |
    | Import a new user | Okta documents the default type for new users imported from AD, LDAP, Workday, or CSV. Inbound federation Just-in-Time (JIT) creation also uses the default type. |
    | Change an existing user’s assigned type | In the person’s profile, click **Change** and choose the destination. Values can carry over when the attribute name and data type match. Review required fields and preserve any source-only values before confirming. |
    | Retire a custom type | Change the type of remaining users or follow your approved process for retiring disposable accounts. Verify that nobody is assigned the type before deleting it. Deletion is permanent and the default type cannot be deleted. |

    Before changing a user's type, record values for fields that exist only in the original schema. A matching field such as Department can transfer when its name and data type match. Restoring a former type may also require repopulating its type-specific values. Where the same custom attribute name appears in multiple schemas, Okta requires the data types to match.

    [Create and assign a user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-assign-user-type.htm) · [Change a user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-change-user-type.htm) · [Delete a user type](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-delete-user-type.htm)

    ### Verify which parts of Okta use the type

    A **property mapping** copies or transforms a field between Okta and an integration. In **Profile Editor → Apps → app → Mappings**, select the assigned user type and inspect the mapping direction. Two types can have different mappings to the same app. Record the type, input field, target field, and resulting value. If a connector writes to an external system, verify that record too.

    | Feature | Documented boundary |
    | --- | --- |
    | Group rules | Validation uses the default schema. A custom-type-only field cannot be used to save or preview the rule, and group rules do not execute for non-default user types. |
    | Group app assignments | Validation uses the default user type. Check any assignment attributes that vary by type. |
    | SAML assertion mappings | Okta uses the default type for SAML assertion mappings. Review the default schema when validating username expressions or sensitive fields. Verify real assertions for the populations you support. |
    | App username settings and directories | Changes on app sign-in and AD or LDAP provisioning settings pages can update only the default type’s mapping. Inspect the custom type’s mapping in Profile Editor. For AD partial matches to an existing custom-type user, Okta documents UPN as the supported Okta username format. |
    | Inbound federation | Routing and policy property checks use the default schema. User Match lists and validates default-type properties, then attempts matching against the user’s actual type. Create mappings for custom types explicitly where needed. |

    Okta also documents edge cases for Self-Service Registration forcing login to email, LDAP relative distinguished name validation using the default type, and Office 365 or SharePoint template updates applying only to default-type instances. Check the relevant limitation for the integration you are changing.

    [Map a user type to an app](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-map-user-type.htm) · [Known issues for custom user types](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-user-types-known-issues.htm)

=== "Hands-on Lab"

    --8<-- "manage-profiles-lab-3.md"

=== "Revision"

    ### Certification cheat sheet

    | Task | First check |
    | --- | --- |
    | Prove the assigned user type | Read the type at the top of the user profile. |
    | Add a field to one population | Open that type’s schema in Profile Editor. |
    | Predict values after a type change | Match the attribute name and data type in both schemas. |
    | Map users of different types to one app | Select the intended type and direction in Profile Editor. |
    | Delete a custom type | Verify it has zero assigned users before deletion. |

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **A user type change affects access**

    A contractor has a Sponsor Reference on a custom schema. The employee schema lacks it. An app reads that field and an admin expects a group rule to follow the text label Contractor.

    1. Which field or setting picks the actual schema?
    2. What preflight stops a transfer from losing data or app access?
    3. When would you choose classification over a new user type?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>The Okta user type assigned to the person. An editable classification value does not select a schema.</li>
    <li>Identify fields absent from the destination type, capture required values, and test the conversion and dependent mappings on a disposable user. Verify the resulting app identity and claims.</li>
    <li>When the same schema fits both populations and supported mappings or rules only need a category. If a distinct schema is needed, test the lesson&#x27;s default-type restrictions before relying on group rules.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. A profile has a text classification of Contractor but no custom user type assignment. What decides the schema? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. The latest group rule</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. The text value alone</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. The first app assigned</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. The actual Okta user type</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> The actual user type selects the schema. A label stored on the profile is a separate field.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which preflight checks matter before converting a test user to another type? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Fields missing from the destination schema</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Dependent mappings or claims</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Expected group rule behavior for that type</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Only whether both types use the same display label</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> Conversion may affect field values and automation. Test the destination schema and dependent integrations.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. An app needs a category for users who otherwise share the same schema. Which approach is easier to evaluate first? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. Create a unique user type for each user</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. Use a classification attribute on the shared schema</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="C"> <span>C. Rename the app integration for each category</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Use a distinct schema only when the population needs it. A field may provide all the classification required.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. An employee’s `userType` text is Contractor. The profile header still shows the default type. Which schema applies?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>The default schema applies. The profile header shows the assigned type, while the text field is descriptive.</p>
    </details>

    **2. A contractor moves to a type that has Department but no Sponsor Reference. Which value can carry over?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Department can carry over when the field name and type match. Preserve Sponsor Reference separately if it is needed after the move.</p>
    </details>

    **3. A group rule uses a field that exists only on a custom type. What happens when you preview or save it?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Validation uses the default schema and rejects the field. Okta also documents that group rules do not execute for non-default types.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A transfer changes Jamie from Contractor to Employee. The new schema lacks Sponsor Reference and the second app expects it. What preflight would you run?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Inventory populated fields and dependencies, identify schema differences and any mapped or claimed Sponsor Reference values, then test the conversion on a disposable user. Capture needed values before conversion and verify affected mappings and app access afterward.</p>
    </details>

    **Interview question.** An app needs to distinguish contractors and employees. When would an attribute be easier to operate than a custom user type?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Use an attribute when the users need the same schema and you mainly need classification for mappings or supported group rules. Choose a custom type when a distinct schema is necessary, after testing rule and integration limitations for that type.</p>
    </details>
