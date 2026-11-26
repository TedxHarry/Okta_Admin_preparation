# Module 5 · Behavior Detection exam coverage

The [Okta Administrator Performance Exam Study Guide](https://certification.okta.com/page/administrator-performance-exam-study-guide) assigns this use case **30% of Part II**. The lab values are course practice settings. Use the group, behavior, authentication, and testing requirements given in the exam task.

| Configuration task | Theory and guided practice | Evidence to check |
| --- | --- | --- |
| Set up Okta Verify for a user on your mobile device | [Lesson 1](../../week-05-behavior-detection/lessons/01-understand-behavior-detection.md) · [Lab 1](hands-on-labs.md#lab-1) | The intended user's active enrollment and a successful mobile Push in the guided exercise. |
| Configure a behavior detection rule for users in a group | [Lesson 2](../../week-05-behavior-detection/lessons/02-configure-a-group-scoped-behavior-rule.md) · [Lab 2](hands-on-labs.md#lab-2) | The named active behavior, app and policy association, group condition, expression, authentication requirement, and rule order. |
| Modify the Catch-All Rule for an authentication policy | [Lesson 3](../../week-05-behavior-detection/lessons/03-modify-the-catch-all-rule.md) · [Lab 3](hands-on-labs.md#lab-3) | The saved fallback requirement on the correct policy, below its more specific rule. |
| Test the authentication policy and behavior detection rule | [Lesson 4](../../week-05-behavior-detection/lessons/04-test-the-policy-and-read-the-system-log.md) · [Lab 4](hands-on-labs.md#lab-4) | Comparable fresh sign-ins, the behavior result, policy selection, and actual factor verification. |

The [guided end-to-end project](behavior-detection-project.md) walks through all four tasks in one test-org workflow. The [independent practice cases](practice-use-cases.md) let you repeat the configuration and practice troubleshooting. The [optional signals and history lab](hands-on-labs.md#lab-5) extends practice to New IP, AND and OR, and resetting a disposable user’s behavior profile.

## Official preparation resources

- [About Behavior Detection](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/about-behavior-detection.htm)
- [Behavior Detection and evaluation](https://help.okta.com/oie/en-us/content/topics/security/proc-security-behavior-detection.htm)
- [Configure Behavior Detection](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/configure-behavior-detection.htm)
- [Set Up an Authentication Policy](https://www.youtube.com/watch?v=fQLrgwg7mn4)
- [Enable Okta Verify Push Notifications](https://www.youtube.com/watch?v=1QzNfnThJGc&list=PLIid085fSVdshfpe-065q9Hi1kChFu2Tg&index=52)
- [Behavior Detection System Log events](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/logs-behavior-detection.htm)

## Configuration references

- [Authenticator enrollment policies](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/about-mfa-enrollment-policies.htm) · [Configure Okta Verify](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/authenticators/configure-okta-verify-options.htm)
- [Behavior types and defaults](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/type-behavior-detection.htm) · [Behavior expressions](https://help.okta.com/oie/en-us/content/Topics/security/behavior-detection/about-behavior-policy-rule.htm) · [Behavior conditions in an app sign-in rule](https://help.okta.com/oie/en-us/content/topics/security/behavior-detection/add-behavior-app-signon-rule.htm)
- [App sign-in rules](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/add-app-sign-on-policy-rule.htm) · [App policy associations](https://help.okta.com/oie/en-us/Content/Topics/identity-engine/policies/share-auth-policies.htm) · [Global session rules](https://help.okta.com/oie/en-us/content/Topics/identity-engine/policies/add-okta-sign-on-policy-rule.htm)
- [System Log event catalog](https://developer.okta.com/docs/reference/api/event-types/) · [Locate factor information](https://support.okta.com/help/s/article/how-to-locate-factor-information-in-okta-system-log) · [System Log search and filters](https://help.okta.com/oie/en-us/Content/topics/reports/syslog-filters.htm)
