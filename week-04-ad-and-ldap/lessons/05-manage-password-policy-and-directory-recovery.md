# Lesson 5 · Manage password policy and directory recovery

=== "Theory"

    A **password authenticator** lets a user prove their identity with a password. In Okta Identity Engine, open **Security → Authenticators → Setup → Password → Actions → Edit** to inspect password policies. The policy selects an authentication provider and applies rules to the users in scope. Identify where the password lives before changing requirements or recovery settings.

    | Setting | What to check |
    | --- | --- |
    | Okta-managed password | Okta stores and validates the password and enforces the applicable Okta password requirements. |
    | AD-delegated password | AD validates the password and applies its directory password requirements. Select **Use Active Directory requirements** for AD-sourced users. AD enforces password length and complexity. Okta's custom complexity selections can change the guidance the user sees. |
    | LDAP-delegated password | LDAP validates the password. Inspect both the LDAP server's password policy and Okta's applicable Password settings. |
    | Failed attempts and recovery | Okta documents settings that also apply to AD and LDAP users. Compare the failed-attempt thresholds on both sides. Okta recommends setting its threshold significantly lower to reduce directory lockouts. Review which recovery methods the rule allows and which the user has enrolled. |

    [Configure the Password authenticator](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm)

    ## Read the effective Password rule

    **Provider** and group scope determine which Password policy applies. Its rules can choose permitted self-service actions, network conditions, recovery methods, and additional verification. The enrollment policy determines which authenticators users can enroll, and the sign-in policy determines which proof they must present. Test with a user in scope who has completed the required enrollment.

    For AD-sourced users, use AD requirements for minimum length and complexity. Okta can still check configured restricted content and commonly used passwords before passing a proposed password to AD. AD-sourced password expiration is imported from the directory. Check agent and AD functional-level requirements if you need AD history enforcement. For AD or LDAP delegation, Okta recommends setting its failed-attempt threshold to no more than half the directory's threshold.

    | Action | What the administrator verifies |
    | --- | --- |
    | **Change password** | The user knows their current password and the effective rule allows a change. |
    | **Reset a forgotten password** | The user proves ownership using recovery, and the target directory accepts the write. |
    | **Unlock** | Verify the lock state in the system that locked the account. The LDAP self-service unlock in Okta can leave the on-premises LDAP account locked. |

    [Password requirements, lockout, and enrollment](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/configure-password.htm) · [AD feature and password support](https://help.okta.com/oie/en-us/content/topics/directory/ad-feature-support.htm)

    ## Trace a password reset back to AD

    In a delegated AD reset from Okta, the recovery policy determines whether the user may proceed. The Okta AD agent then needs permissions to make the change on the target AD user. A successful directory import establishes that the agent could read the user. A successful reset requires a separate operation and rights.

    | Permission on user objects in the target OU | Why it matters |
    | --- | --- |
    | **Reset Password** control access right | Authorizes the agent's service account to reset the password. |
    | Write **pwdLastSet** | Lets the service account change password-last-set state as required by the flow. |
    | Write **lockoutTime** | Lets the service account change the AD lockout state as required by the flow. |

    Inspect the Windows service's runtime identity and its effective rights on the affected AD object. Confirm those rights reach the user through OU inheritance. Verify both the outcome in the Okta System Log and the result in AD. For a successful reset, use a fresh sign-in to verify the new AD password.

    [Okta service account permissions](https://help.okta.com/oie/en-us/content/topics/directory/ad-agent-about-service-account.htm)

=== "Hands-on Lab"

    --8<-- "ad-lab-5.md"

=== "Revision"

    ### Cheat sheet

    | Topic | Remember |
    | --- | --- |
    | AD minimum and complexity | Apply the effective AD requirements. |
    | Okta recovery | Check Password rule scope and enrolled recovery methods. |
    | AD reset permissions | Reset Password, plus Write Property for pwdLastSet and lockoutTime. |

=== "Quiz"

    ### Check your answers

    Choose your answers, then select **Check answer** for feedback. Try the written questions before revealing the model answers.

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>1. The directory password works, but Okta cannot reset it. Which separate requirement is most relevant? <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-1" value="A"> <span>A. The username mapping must change</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="B"> <span>B. Admin Console installer needs to be the user</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="C" data-correct> <span>C. Agent runtime identity needs effective reset rights on that AD user</span></label>
    <label><input type="radio" name="lesson-quiz-1" value="D"> <span>D. The user&#x27;s app tile needs to launch first</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>C.</strong> Directory validation and password writes require different access.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>2. Which checks isolate a delegated password recovery failure? <small>(Select all that apply)</small></legend>
    <label><input type="checkbox" name="lesson-quiz-2" value="A" data-correct> <span>A. Applicable recovery policy and available enrollment</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="B" data-correct> <span>B. Effective AD password requirements</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="C" data-correct> <span>C. Agent runtime permissions on the target object</span></label>
    <label><input type="checkbox" name="lesson-quiz-2" value="D"> <span>D. A successful app group push</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>A and B and C.</strong> Recovery verification, password acceptance, and directory writes are separate steps.</p>
    </details>
    </fieldset>
    </div>

    <div>
    <fieldset class="lesson-quiz-question">
    <legend>3. A reset succeeds in one OU. That alone verifies the same rights are effective on protected accounts elsewhere. <small>(Choose one)</small></legend>
    <label><input type="radio" name="lesson-quiz-3" value="A"> <span>A. True</span></label>
    <label><input type="radio" name="lesson-quiz-3" value="B" data-correct> <span>B. False</span></label>
    <button type="button" hidden>Check answer</button>
    <p role="status"></p>
    <details class="revision-answer">
    <summary>Show answer and explanation</summary>
    <p><strong>B.</strong> Check the specific target user&#x27;s effective permissions. Group protection and differing inheritance can change the result.</p>
    </details>
    </fieldset>
    </div>

    ### Check your recall

    **Why might delegated sign-in work while a reset through Okta fails?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Sign-in exercises password validation. Recovery also needs an applicable Okta recovery rule and directory permissions on the target user. Check where the operation failed.</p>
    </details>

    **Where do you change the minimum password length for an AD-sourced user?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>The applicable AD password policy enforces the minimum. Changing the Okta minimum does not replace it.</p>
    </details>

    **What directory access does the AD agent need for password reset?**

    <details class="revision-answer">
    <summary>Show answer</summary>
    <p>Reset Password and Write Property on pwdLastSet and lockoutTime, scoped to the relevant AD user objects.</p>
    </details>

    ### Scenario and interview practice

    **Troubleshooting scenario.** A lab account resets its password through Okta, but an account in a protected AD group cannot. Both can authenticate. What would you inspect before expanding privileges?

    <details class="revision-answer">
    <summary aria-label="Show troubleshooting scenario answer">Show answer</summary>
    <p>Compare effective permissions on the two actual accounts and check whether protection prevents inherited OU permissions. Review the approved recovery path for the protected account. A working delegated bind or successful reset for one user does not establish effective reset rights everywhere.</p>
    </details>

    **Interview question.** A user completed recovery verification but cannot set the proposed password. How do you tell a policy rejection from a failed write?

    <details class="revision-answer">
    <summary aria-label="Show interview question answer">Show answer</summary>
    <p>Check the effective AD password requirements and test an approved compliant value. Compare the recovery and agent outcomes, then verify the runtime account's rights on the target user if a compliant write is still rejected.</p>
    </details>
