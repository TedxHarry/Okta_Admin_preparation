# Lesson 4 · Write an advanced group rule

=== "Theory"

    A contractor belongs to the Finance population group. An employee also belongs to Finance and has completed the required training. The access request says both memberships are required. In [Lesson 3](03-build-and-test-a-basic-group-rule.md), you used a Basic rule to test one source. In this lesson, you will express exactly which combinations qualify and prove the result before activating the rule.

    ## Decide who should qualify

    **Okta Expression Language (OEL)** lets you write the condition in **Directory → Groups → Rules → Add Rule → IF → Use Okta Expression Language (advanced)**. The expression must return a **Boolean**, which means true or false for a user. Put the groups you want to grant under **Then Assign to**. Group IDs inside the expression identify the groups you want to check.

    | Expression element | How to read it |
    | --- | --- |
    | `isMemberOfGroup("SOURCE_A_ID")` | Is the user a member of the group with this ID? |
    | `isMemberOfAnyGroup("SOURCE_A_ID", "SOURCE_B_ID")` | Is the user in at least one of the listed groups? |
    | `user.department == "Lab-M2-Advanced-Finance"` | Does the Department on the Okta user profile equal this string? Use `==` to compare values. |
    | `AND`, `OR`, `!` | Require both checks, accept either check, or negate a check. Use parentheses to show which checks belong together. |

    Open each source group in **Directory → Groups** and copy its group ID from the Admin Console address. Replace the placeholders inside the quotation marks. A name-based function can match identically named groups from different sources. Use the ID when you mean one specific group.

    [Okta · Create group rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · OEL group functions](https://developer.okta.com/docs/reference/okta-expression-language/#group-functions) · [Okta · Find a group ID](https://support.okta.com/help/s/article/how-to-find-group-ids-through-the-okta-user-interface)

    ## Use a truth table before opening Preview

    | Source A | Source B | A OR B | A AND B | A AND NOT B |
    | --- | --- | --- | --- | --- |
    | Yes | No | Match | Miss | Match |
    | No | Yes | Match | Miss | Miss |
    | Yes | Yes | Match | Match | Miss |
    | No | No | Miss | Miss | Miss |

    For **either** source, write:

    ```text
    isMemberOfGroup("SOURCE_A_ID") OR isMemberOfGroup("SOURCE_B_ID")
    ```

    For **both** sources, replace `OR` with `AND`. For A members who must be outside B, write:

    ```text
    isMemberOfGroup("SOURCE_A_ID") AND !isMemberOfGroup("SOURCE_B_ID")
    ```

    The Basic membership picker may say **includes any of the following** when multiple source groups are selected. Read the wording in your console and compare its Preview with the explicit OR and AND results. A test with only a user in both groups cannot distinguish those expressions. Include the A-only and B-only cases.

    [Okta · Group rule conditions and operators](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · Group rule best practices](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-group-rules-best.htm)

    ## Combine a group test with a profile value

    Suppose employees qualify if they are in either source **and** their Department is Finance. Group the membership checks so the Department requirement applies to either path:

    ```text
    (isMemberOfGroup("SOURCE_A_ID") OR isMemberOfGroup("SOURCE_B_ID"))
      AND user.department == "Lab-M2-Advanced-Finance"
    ```

    Use the attribute on the Okta user profile. If Department comes from an external system, check that the value was mapped and appears on the intended Okta user before debugging the expression. When your requirement is that a text attribute must contain a value, account for both an unset value and an empty string. For example:

    ```text
    user.department != null AND user.department != ""
    ```

    The exact Finance comparison already requires the configured text value. The presence check above is useful for a different requirement, such as accepting any populated department. A named exception in **Except The following users** is separate from a negated group check. Use an exception for one named test account. Use negation when the rule itself needs to exclude everyone in a defined source group.

    Use these expressions in the **group-rule editor**. Profile mappings, app sign-in policies, and claims may use a different set of references or accept a different result type. Check the reference for the editor you are working in.

    [Okta · Map inputs and create rules](https://help.okta.com/oie/en-us/content/topics/users-groups-profiles/usgp-create-group-rules.htm) · [Okta · OEL group rule samples and blank checks](https://developer.okta.com/docs/reference/okta-expression-language/#group-rules-samples)

    ## Check one value inside a multi-value field

    A **string array** holds a list of separate text values. `Arrays.contains()` returns a Boolean when it checks for a particular element. Use the variable name from the default Okta user schema. For a string array with the variable name `labTrainingCodes`, this rule checks for the exact element `SEC-101`.

    ```text
    Arrays.contains(user.labTrainingCodes, "SEC-101")
    ```

    A stored value of `SEC-101-ADV` is a different array element. To handle a missing list explicitly, check the list with `Arrays.isEmpty()` before evaluating membership. `Arrays.isEmpty()` returns true for an empty or null array.

    When a condition requires a date calculation or numeric conversion, compute and save the desired value through an inbound profile mapping. Use the resulting Okta attribute in the rule. For a date cutoff, the saved result can be a Boolean field and the rule can check whether it equals `true`.

    [Array functions and group-rule examples](https://developer.okta.com/docs/reference/okta-expression-language/#expressions-in-group-rules) · [Map a calculated field before using it in a rule](../manage-profiles/06-transform-values-and-manage-usernames.md#calculate-a-value-once-for-a-group-rule)

=== "Hands-on Lab"

    --8<-- "manage-groups-lab-4.md"

=== "Revision"

    ## Advanced rule cheat sheet

    | Requirement | Condition to reach for |
    | --- | --- |
    | One exact group | `isMemberOfGroup("GROUP_ID")` |
    | At least one of two groups | Join two checks with `OR`, or use `isMemberOfAnyGroup`. |
    | Both groups | Join the two checks with `AND`. |
    | A and outside B | Join the A check and the negated B check with `AND`. |
    | Either source and the right department | Parenthesize the OR checks, then apply `AND` and the Department comparison. |
    | Any populated text value | Check for both `null` and `""`. |
    | An exact value in a string array | Use `Arrays.contains(user.attributeName, "VALUE")`. |
    | Eligibility calculated from a date | Save the comparison in a Boolean profile field, then check that field. |
    | Skip one person | Use the rule’s named exception and verify the resulting target membership. |

    **Exam focus.** Translate the requirement into a Boolean condition, test a user who should miss, and verify the intended target after activation. This supports the custom app integration use case, which asks you to use OEL and assign a group to an app. [Okta Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide)

=== "Quiz"

    [Case challenge](#case-challenge) · [Quick checks](#check-your-answers) · [Interview and troubleshooting](#scenario-and-interview-practice)

    Work the case before revealing its solution. For each decision, name the evidence you would use to verify it.

    ### Case challenge

    **A Boolean condition that grants too much**

    The requirement is Finance, no matter whether a user enters through East or West. An editor saves East OR (West AND Finance). A training list later adds a second eligibility check.

    1. Which single user exposes the grouping error?
    2. What inputs prove exact membership in an optional list?
    3. How do you verify an expression imported from an external spreadsheet?

    <details class="revision-answer">
    <summary>Reveal the worked solution</summary>
    <ol>
    <li>A non-Finance member of East. The left branch can evaluate true alone. Require (East OR West) AND Finance, then test each source separately and test neither.</li>
    <li>Use a record with SEC-101, one with only SEC-101-ADV, and a blank or absent list. Test exact element membership and explicit missing-data handling.</li>
    <li>Compare the actual persisted Okta fields and exact groups referenced, preview matches and misses, and verify rule-driven membership after approved activation.</li>
    </ol>
    </details>

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. Which expression shape makes Finance required on either group path? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. A AND B AND Finance</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. A OR (B AND Finance)</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C"> <span>C. Finance OR (A AND B)</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D" data-correct> <span>D. Finance AND (A OR B)</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>D.</strong> The parentheses make Department apply to both source-group paths and allow either group.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which test inputs help catch bugs in an exact SEC-101 array match? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. An exact SEC-101 element</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. A suffixed SEC-101-ADV element</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. An empty or missing list</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. Only a populated exact-match user</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> The exact case proves the intended inclusion. The suffix and blank cases expose substring and missing-data errors.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A user in both groups can distinguish A AND B from A OR B by itself. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Both expressions match that user. Test at least one single-group user to expose the difference.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **1. Which user proves that A OR B and A AND B behave differently?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 1">Show answer</summary>
    <p>An A-only or B-only user. Either one matches OR and misses AND.</p>
    </details>

    **2. How do you make Finance apply to both source paths?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 2">Show answer</summary>
    <p>Put the two source checks joined by OR inside parentheses, then join that result to the Department equality check with AND.</p>
    </details>

    **3. Two integrations contain groups with the same name. What should you use in the condition?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 3">Show answer</summary>
    <p>Use the intended group's exact ID with isMemberOfGroup. Confirm the group's source before copying the ID.</p>
    </details>

    **4. The list contains `SEC-101-ADV`. Will the rule using `Arrays.contains(user.labTrainingCodes, "SEC-101")` match?**

    <details class="revision-answer">
    <summary aria-label="Show answer to question 4">Show answer</summary>
    <p>It only matches when the array contains the exact element SEC-101. The longer code is a different value.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** Finance is required for users in East or West. An expression uses East OR (West AND Finance). Give a test case that exposes the error and the corrected grouping.

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>A user in East who is outside Finance qualifies with the flawed expression. Use (East OR West) AND Finance. Preview that same user plus Finance users in East only and West only.</p>
    </details>

    **Interview question.** An optional training-code list contains SEC-101-ADV and sometimes is unset. How would you test a rule intended for exact SEC-101 certification?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Use an exact array membership test and account for an empty or null array. Test exact SEC-101, suffixed SEC-101-ADV, a different code, and no list. Verify the saved Okta profile values before judging the expression.</p>
    </details>
