(() => {
  const glossary = [
    ["Okta org","An Okta environment with its own users, groups, applications, and settings.",["org","tenant"]],
    ["Integrator Free Plan","An Okta org used to build and test integrations. Its features and limits can differ from a production subscription.",["Integrator org"]],
    ["Admin Console","The part of Okta where authorized admins manage the org."],
    ["End-User Dashboard","The page where a signed-in user can see their available app tiles."],
    ["Hostname","The name in a web address that identifies the server or service, such as the name before the first slash.",["hostnames"]],
    ["User account","A record in a system that identifies a user and lets that system manage their sign-in and access.",["user accounts","account","accounts"]],
    ["User profile","The fields and values Okta stores about one user, such as their login, email, and Department.",["Okta user profile","profile","profiles"]],
    ["Attribute","A named field, such as Department. The value is what that field contains for a particular user.",["attributes"]],
    ["Custom attribute","A field an administrator adds to a profile definition to store information the built-in fields do not cover.",["custom attributes","custom field","custom fields"]],
    ["Base attribute","A field that comes with a profile definition, such as first name.",["base attributes"]],
    ["User type","The category of an Okta user that determines which profile definition applies to their account.",["user types"]],
    ["Username","The identifier the user uses to sign in. The email field can contain the same text and has its own purpose.",["usernames"]],
    ["Primary email","The main email address on the user profile. Okta can use it to send account setup messages."],
    ["Activation","The process that starts or completes making an account available for sign-in.",["Activate later","Activate now"]],
    ["Staged","The account exists, and an administrator still needs to start activation."],
    ["Pending user action","The user still has to complete a step such as following the activation email or setting up credentials."],
    ["Suspension","A temporary hold that stops Okta sign-in while keeping the user record and its existing assignments.",["suspend","suspended"]],
    ["Deactivation","A lifecycle action that disables the Okta account and removes its app assignments. The Okta user record remains.",["deactivate","deactivated","deprovisioned"]],
    ["Sign-in session","The state a system maintains after accepting a sign-in so the browser can continue as that user.",["Okta session","browser session","app session","session","sessions"]],
    ["Session revocation","Ending a session so the user must authenticate again to establish a new one.",["clear user sessions","clear sessions"]],
    ["Universal Logout","Okta's mechanism for requesting sign-out from compatible apps configured to receive it."],
    ["Authentication","How a system verifies who is signing in.",["authenticate","authenticated"]],
    ["Authenticator","A method a person uses to prove who they are, such as a password or Okta Verify.",["authenticators"]],
    ["Enrollment","Setting up an authenticator so the user can use it when Okta asks for proof.",["authenticator enrollment"]],
    ["MFA","Multifactor authentication. A sign-in that requires proof from more than one type of factor.",["multifactor authentication"]],
    ["Okta Verify","An Okta app that can help users prove their identity during sign-in."],
    ["Global session policy","Rules for establishing and managing the user's session with Okta."],
    ["App sign-in policy","The rules that determine what proof the user needs to open a particular app through Okta.",["app authentication policy","authentication policy","sign-in policy"]],
    ["Group","A named collection of users. An app assignment or policy can use the collection to apply to its members.",["groups"]],
    ["Group membership","The relationship that says which users belong to a group.",["membership","memberships"]],
    ["Group profile","The attributes on a group record, including the group's name and description.",["group profiles"]],
    ["Group source","The system or integration that the group originates from.",["group source type"]],
    ["Group ID","The unique identifier Okta uses to distinguish a group from other records, including groups with similar names."],
    ["Membership authority","The system or automation responsible for changes to a particular group's membership."],
    ["Group rule","A condition Okta evaluates to decide whether a user belongs in one or more groups.",["group rules"]],
    ["Source group","The group whose membership a rule can read when deciding whether a user qualifies.",["source groups"]],
    ["Target group","The group a rule adds a qualifying user to.",["target groups"]],
    ["Rule exception","A user the rule skips, even if their profile matches the condition.",["exception","exceptions","exception list"]],
    ["Imported group","A group from a connected system such as AD. Check that system to see where the membership was set.",["imported groups","AD group","AD groups"]],
    ["App integration","Okta's configuration for a specific application. It can describe how to open the app, sign users in, or make supported account changes.",["app integrations","application integration"]],
    ["App assignment","The relationship that makes an app integration available to an Okta user, directly or through a group.",["app assignments","assignment","assignments"]],
    ["Direct assignment","An app assignment made to one specific user.",["individual assignment","direct grant"]],
    ["Group assignment","An app assignment made to a group so qualifying members receive the integration.",["group-based assignment","group-derived assignment"]],
    ["App assignment source","Where an app assignment comes from, such as an individual grant or membership in an assigned group.",["assignment source","assignment owner"]],
    ["Bookmark App","An Okta integration that adds a tile opening a URL."],
    ["OIN","The Okta Integration Network, a catalog of app integrations.",["Okta Integration Network"]],
    ["SSO","Single sign-on. A user signs in through an identity service to reach a connected application.",["single sign-on"]],
    ["System Log","Okta's record of past operations, decisions, and outcomes. Use it alongside current settings."],
    ["Event type","A label for the kind of operation a System Log event records.",["event types"]],
    ["Actor","The person, service, or process that initiated an event."],
    ["Target","The user, group, application, or other object an event affected.",["targets"]],
    ["Outcome","The result of the recorded operation. Read it together with the event type."],
    ["Universal Directory","The part of Okta that stores and organizes user profiles, their fields, and the rules that define those fields.",["UD"]],
    ["Schema","The definition of which fields a profile can have and which types of values they accept.",["profile schema","user schema"]],
    ["String","A text value. A code like FIN-0042 is a string so its letters and leading zeros can be kept.",["string type"]],
    ["Boolean","A value that is either true or false.",["true or false"]],
    ["Variable name","The field name used in an expression or integration, such as labCostCenter.",["variable names"]],
    ["Display name","The label an administrator or user sees on screen.",["display names"]],
    ["Profile mapping","An instruction that tells Okta which value to read and which field should receive the result.",["attribute mapping","mappings","mapping","outbound mapping","inbound mapping"]],
    ["App user profile","The values Okta keeps for one user on a particular app integration. The receiving app can have its own account record.",["app-user profile","app user profiles"]],
    ["Expression","A short formula Okta evaluates to produce a value or a true-or-false result.",["expressions"]],
    ["Okta Expression Language","The syntax Okta uses for formulas in places such as group rules, mappings, and claims. Each editor has its own supported references.",["OEL"]],
    ["Matching","Finding which existing user record belongs to an incoming account, based on the configured criteria.",["account matching"]],
    ["Profile source","The system Okta relies on to supply a user's profile or a particular field.",["profile sources","profile sourcing"]],
    ["Source priority","The order Okta uses to choose among sources that apply to a user or field.",["source precedence"]],
    ["Attribute-level sourcing","Choosing which system supplies a particular Okta profile field, such as Department."],
    ["Write-back","Sending an Okta value back to another system that supports receiving the change.",["writeback"]],
    ["Provisioning","Creating, updating, or disabling a user account in a receiving application through a connection."],
    ["Deprovisioning","Removing access, such as by disabling a receiving account when its app assignment ends."],
    ["Connector","The part of an integration that knows how to exchange data with the receiving system.",["connectors"]],
    ["API","A way for one program to ask another for data or an action using a documented set of requests.",["APIs","application programming interface"]],
    ["SCIM","System for Cross-domain Identity Management. A standard way for systems to request user and group changes.",["SCIM 2.0"]],
    ["Endpoint","A specific network address a system uses to receive a request.",["endpoints","SCIM endpoint"]],
    ["SCIM base URL","The starting web address the test service gives Okta for its SCIM API. Okta uses it to reach the user and group routes.",["base URL"]],
    ["Authorization header","Part of an HTTP request that can carry the credential the receiving service uses to authorize the request.",["header authentication","Header Auth"]],
    ["Group Push","An Okta feature that sends a group and its membership changes to a supported receiving application."],
    ["Push group","The Okta group whose memberships you want to manage in the receiving app.",["pushed group","push groups"]],
    ["Group Linking","Connecting an Okta group to a group that already exists in the receiving application."],
    ["Okta Workflows","A service for automating tasks by connecting steps, such as reading an activated user's profile and adding them to a group.",["Workflows"]],
    ["Event card","The first step in an event-driven flow. It starts a run when the selected event occurs."],
    ["Action card","A step that reads or changes data in Okta or another connected service."],
    ["Function card","A step that works with data or controls what the flow does next."],
    ["Connection","The saved setup that tells a flow which service it can use and how it authenticates.",["connector connection"]],
    ["Execution History","The Workflows record of a particular run, which helps you see what ran and where it stopped.",["run history"]],
    ["Control user","A comparison account that should produce a different result, such as staying outside a group.",["control users"]],
    ["SAML","Security Assertion Markup Language. A way for an identity provider to send an application a signed statement about the user.",["SAML 2.0"]],
    ["Identity provider","The system that authenticates the user and issues the sign-in message. In the SAML labs, this is Okta.",["IdP"]],
    ["Service provider","The receiving app in a SAML sign-in. It checks the response and decides whether to start an app session.",["SP","test SP"]],
    ["SAML response","The message the browser delivers to the receiving app after the identity provider processes the sign-in.",["SAMLResponse"]],
    ["SAML assertion","The part of the SAML response with statements about the user and the app the statements are for.",["assertion","assertions"]],
    ["ACS URL","The Assertion Consumer Service address on the app that receives the SAML response.",["ACS","Assertion Consumer Service"]],
    ["Entity ID","The identifier a SAML system uses for itself. The assertion's Audience identifies the receiving app by its expected ID.",["SP Entity ID","Audience URI"]],
    ["Issuer","The identifier the receiving app uses to recognize which identity provider issued the SAML response.",["IdP issuer"]],
    ["NameID","The SAML value the receiving app uses to identify the user, such as their login or email.",["Name ID"]],
    ["Attribute statement","A named value in a SAML assertion that the app can read, such as a cost-center code.",["attribute statements","SAML claim","SAML claims"]],
    ["Signing certificate","The public certificate the receiving app can use to verify the signature on the SAML message.",["signing certificates","public signing certificate"]],
    ["Metadata","Configuration that describes SAML settings such as identifiers, endpoint addresses, and the public certificate."],
    ["IdP-initiated","The user starts in the identity provider, such as by selecting a tile in Okta.",["IdP-initiated sign-in"]],
    ["SP-initiated","The user starts at the application, which sends an authentication request to the identity provider.",["SP-initiated sign-in"]],
    ["SAML tracer","A tool that captures and decodes the sign-in messages your browser carries.",["SAML-tracer","browser trace"]],
    ["XML","A text format that uses named tags to describe parts of a document or message."],
    ["HTTP POST","A request method the browser can use to send data, such as a SAML response, to a web address.",["POST"]],
    ["OpenID Connect","A sign-in standard built on OAuth 2.0. The application receives an ID token describing authentication.",["OIDC"]],
    ["OAuth 2.0","A framework for letting an application access a resource within granted permissions.",["OAuth"]],
    ["ID token","The token that tells an OpenID Connect client about the user and the authentication event."],
    ["Access token","A credential an application presents to an API to request access under granted permissions."],
    ["JWT","JSON Web Token. A compact format for carrying claims. An OpenID Connect ID token uses this format."],
    ["SWA","Secure Web Authentication. Okta uses the configured username and password for the app's sign-in form.",["Secure Web Authentication"]],
    ["Active Directory Domain Services","Microsoft's directory service for users, computers, and groups in a Windows domain.",["AD DS","Active Directory","AD"]],
    ["Domain controller","A Windows server that runs AD DS and answers directory requests for its domain.",["domain controllers"]],
    ["AD domain","A collection of directory objects administered together in Active Directory.",["lab domain","domain"]],
    ["Organizational unit","A container that organizes AD objects and can be selected to scope an Okta import.",["organizational units","OU","OUs"]],
    ["AD agent","A Windows service that communicates with the AD domain and Okta.",["Okta AD agent","Okta Active Directory agent"]],
    ["Agent host","The Windows server that runs the agent service.",["agent hosts"]],
    ["Member server","A server joined to the Windows domain that does not run the domain controller role.",["member servers"]],
    ["Service account","The account a background service runs as. Its permissions control what the service can do.",["service accounts","AD agent service account","runtime identity"]],
    ["Delegated authentication","Okta asks the connected directory to check the user's credentials for an Okta sign-in.",["delegated sign-in"]],
    ["Import scope","The set of directory objects the integration is configured to bring into Okta."],
    ["UPN","User Principal Name. The full sign-in name of an AD user, commonly in the form name@domain.",["User Principal Name"]],
    ["DNS","Domain Name System. It helps the host find the network address associated with a name.",["AD DNS","name resolution"]],
    ["HTTPS","The encrypted web connection the agent uses to communicate with Okta."],
    ["Port","A number that identifies which network service on a computer should receive a connection.",["ports"]],
    ["Proxy","A network service that forwards requests on behalf of a client.",["proxy server"]],
    ["DMZ","A separated network segment that limits how systems on different networks connect."],
    ["LDAP","A protocol that software can use to read or modify directory information or authenticate against a directory."],
    ["High availability","A setup that keeps a service available when one component goes down.",["agent high availability","failover"]],
    ["TCP","A network protocol that establishes a connection between two systems. The AD lab checks whether it can open a connection to a particular port."],
    ["Security group","An Active Directory group that can be used to grant permissions to its members."],
    ["Password reset","Setting a new password on the account in the system that owns its credentials."],
    ["Cost center","A code that identifies the part of an organization where expenses are tracked. The labs use it as a test profile value."],
    ["JSON","A text format for representing data as named values, lists, and objects."],
    ["Use case","A set of related tasks performed to achieve a particular result."]
  ];

  const definitions = new Map();
  const escapeRegex = label => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const [name, meaning, aliases = []] of glossary) {
    const entry = { name, meaning };
    for (const label of [name, ...aliases]) definitions.set(label.toLowerCase(), entry);
  }

  const specificWords = new Set([
    "activation", "attribute", "attributes", "authenticator", "authenticators",
    "deprovisioning", "endpoint", "endpoints", "hostname", "hostnames",
    "metadata", "nameid", "provisioning", "schema", "sourcing", "upn"
  ]);
  const labels = [...definitions.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    "(?<![\\p{L}\\p{N}_-])(?:" + labels.map(escapeRegex).join("|") + ")(?![\\p{L}\\p{N}_-])",
    "giu"
  );

  const tooltip = document.createElement("div");
  tooltip.id = "okta-term-tooltip";
  tooltip.className = "course-term-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  const title = document.createElement("strong");
  const meaning = document.createElement("span");
  tooltip.append(title, meaning);
  let active = null;

  function close() {
    if (active) active.term.removeAttribute("aria-describedby");
    active = null;
    tooltip.hidden = true;
  }

  function show(term, input) {
    close();
    if (!tooltip.isConnected) document.body.append(tooltip);
    active = { term, ...input };
    title.textContent = term.dataset.termName;
    meaning.textContent = term.dataset.termMeaning;
    term.setAttribute("aria-describedby", tooltip.id);
    tooltip.hidden = false;

    const anchor = term.getBoundingClientRect();
    const box = tooltip.getBoundingClientRect();
    const left = Math.max(12, Math.min(anchor.left, document.documentElement.clientWidth - box.width - 12));
    const preferredTop = anchor.top >= box.height + 20 ? anchor.top - box.height - 8 : anchor.bottom + 8;
    tooltip.style.left = left + "px";
    tooltip.style.top = Math.max(12, Math.min(preferredTop, window.innerHeight - box.height - 12)) + "px";
  }

  function initialize() {
    close();
    if (!/(?:^|\/)week-\d+[^/]*\/(?:lessons|labs)\//.test(window.location.pathname)) return;
    const article = document.querySelector(".md-content__inner");
    if (!article || article.dataset.termHelpReady) return;

    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      const block = parent?.closest("p, li, td, dd");
      if (!block || parent.closest("a, button, code, pre, script, style, nav, summary, label, kbd, svg, .course-term-help")) continue;
      nodes.push([node, block]);
    }

    // One reminder per term per block. Use bold text to opt in ambiguous single words.
    const seen = new WeakMap();
    let count = 0;
    for (const [node, block] of nodes) {
      if (!seen.has(block)) seen.set(block, new Set());
      const blockTerms = seen.get(block);
      const fragment = document.createDocumentFragment();
      let end = 0;

      for (const match of node.textContent.matchAll(pattern)) {
        const label = match[0];
        const entry = definitions.get(label.toLowerCase());
        if (blockTerms.has(entry.name)) continue;
        const marked = node.parentElement.closest("strong");
        const specific = /[\s-]/.test(label) || /^[A-Z][A-Z0-9]{1,}$/.test(label) || specificWords.has(label.toLowerCase());
        if (!marked && !specific) continue;

        fragment.append(document.createTextNode(node.textContent.slice(end, match.index)));
        const term = document.createElement("span");
        term.setAttribute("role", "button");
        term.tabIndex = 0;
        term.className = "course-term-help";
        term.textContent = label;
        term.setAttribute("aria-label", label + ". Hold to read its meaning.");
        term.dataset.termName = entry.name;
        term.dataset.termMeaning = entry.meaning;
        fragment.append(term);
        end = match.index + label.length;
        blockTerms.add(entry.name);
        count++;
      }

      if (end) {
        fragment.append(document.createTextNode(node.textContent.slice(end)));
        node.replaceWith(fragment);
      }
    }

    article.dataset.termHelpReady = "true";
    const heading = article.querySelector("h1");
    if (count && heading) {
      const hint = document.createElement("p");
      hint.className = "course-term-hint";
      hint.textContent = "Hold a term with a dotted underline for its meaning. Release to close. Keyboard users can hold Space or Enter.";
      heading.after(hint);
    }
  }

  const termAt = event => event.target.closest?.(".course-term-help");

  document.addEventListener("pointerdown", event => {
    const term = termAt(event);
    if (!term || event.button !== 0 || event.isPrimary === false) return;
    show(term, { pointerId: event.pointerId });
  });

  function releasePointer(event) {
    if (active?.pointerId === event.pointerId) close();
  }

  window.addEventListener("pointerup", releasePointer);
  window.addEventListener("pointercancel", releasePointer);
  document.addEventListener("lostpointercapture", releasePointer, true);
  document.addEventListener("contextmenu", close);
  document.addEventListener("selectionchange", () => {
    if (active?.pointerId !== undefined && document.getSelection()?.isCollapsed === false) close();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      close();
      return;
    }
    const term = termAt(event);
    if (!term || ![" ", "Enter"].includes(event.key)) return;
    event.preventDefault();
    if (!event.repeat) show(term, { key: event.key });
  });

  window.addEventListener("keyup", event => {
    if (active?.key === event.key) {
      event.preventDefault();
      close();
    }
  });
  document.addEventListener("focusout", event => {
    if (event.target === active?.term) close();
  });
  window.addEventListener("blur", close);
  window.addEventListener("resize", close);
  window.addEventListener("scroll", close, true);
  document.addEventListener("visibilitychange", close);

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
