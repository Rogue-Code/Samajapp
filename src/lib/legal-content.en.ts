import type { LegalBundle } from "./legal-content";

/**
 * English source text for both legal documents. This is the authoritative
 * version — see the final section of each document — so treat the Gujarati in
 * `legal-content.gu.ts` as following this file, never the other way round.
 *
 * Wording ported verbatim from the original JSX pages; any change here changes
 * what the app promises its members.
 */
export const EN_LEGAL: LegalBundle = {
  terms: {
    title: "Terms of Use",
    intro: "The rules for using Sangath. By creating an account or signing in, you accept them.",
    sections: [
      {
        heading: "1. What Sangath is",
        blocks: [
          {
            kind: "p",
            text: "Sangath is a private directory app for the members of {community}. It exists so members can find each other, keep a record of their household, and follow community news, events and facilities. It is provided for the community's benefit, not as a commercial service.",
          },
        ],
      },
      {
        heading: "2. Who owns Sangath",
        blocks: [
          {
            kind: "p",
            text: "The app itself — its code, design, screens, name and logo — is the property of {operator}, who built it and runs it. Nothing in these terms transfers any of that to {community} or to you. You get a personal, non-transferable permission to use the app as a member, for as long as you are one. You may not copy, resell, rebrand or redistribute it, or build a competing service from it.",
          },
          {
            kind: "highlight",
            title: "Owning the app is not owning your data",
            text: "The software is ours. The personal details you enter are not — they remain yours, and you can correct or delete them as set out in the Privacy Policy. What you post as community news also stays yours. We hold and look after member data as the party accountable for it, which is a duty, not a claim of ownership.",
          },
        ],
      },
      {
        heading: "3. Who may use it",
        blocks: [
          {
            kind: "p",
            text: "Accounts are for members of the community. You must be 18 or older to hold an account. Children may appear only as entries in a family list, added by their own parent or guardian — they do not get logins of their own.",
          },
          {
            kind: "p",
            text: "We may decline or close an account that does not belong to a member of the community.",
          },
        ],
      },
      {
        heading: "4. Your account",
        blocks: [
          {
            kind: "p",
            text: "Give accurate details and keep them current — a directory is only useful if the entries are true. You are responsible for what happens under your account.",
          },
          {
            kind: "highlight",
            title: "There is no password — the code is the key",
            text: "You sign in with a 6-digit code sent to your email or your phone, so whoever can read that inbox or receive that SMS can sign in as you. **Never share a login code with anyone**, including someone claiming to be from Sangath or from the samaj — we will never ask you for one. If you lose access to the number or address on your account, or think someone else has used it, tell us at {email}.",
          },
        ],
      },
      {
        heading: "5. How you may use the directory",
        blocks: [
          {
            kind: "p",
            text: "Other members' details are shared with you for ordinary community purposes — getting in touch, recognising relatives, staying connected. They are not a mailing list.",
          },
          {
            kind: "highlight",
            title: "You must not",
            text: "Copy, scrape or export the directory in bulk; use member contact details for marketing, sales, political canvassing, fundraising outside the community, debt collection or matrimonial brokering; pass anyone's number or address to a person outside the community; or publish member details anywhere else, including social media and messaging groups.",
          },
          {
            kind: "p",
            text: "Doing any of this is grounds for immediate removal from the app, and may also be a criminal offence.",
          },
        ],
      },
      {
        heading: "6. What you post",
        blocks: [
          {
            kind: "p",
            text: "You keep ownership of the news, notices and content you publish. By posting it in Sangath you allow us to display it to other members inside the app.",
          },
          { kind: "p", text: "Do not post anything that:" },
          {
            kind: "bullets",
            items: [
              "Is false, misleading, or presented as coming from someone else.",
              "Harasses, threatens, defames or humiliates another person.",
              "Discloses another member's private details without their agreement.",
              "Solicits money, promotes a business, or advertises a service.",
              "Is unlawful, or infringes someone else's copyright.",
            ],
          },
        ],
      },
      {
        heading: "7. Family entries",
        blocks: [
          {
            kind: "p",
            text: "When you add a family member you are entering another person's details. Add adults only with their agreement, and children only if you are their parent or lawful guardian. You are responsible for keeping those entries accurate and for removing them if the person asks. See the Privacy Policy for who can see a family entry.",
          },
        ],
      },
      {
        heading: "8. Donations and community funds",
        blocks: [
          {
            kind: "p",
            text: "Sangath does not process payments. The app does not take card, UPI or bank transfers, and no payment details are collected through it. Any contribution to a community cause is arranged outside the app, directly with the community.",
          },
          {
            kind: "p",
            text: "The community does not hold an 80G certificate, so contributions are not eligible for tax deduction under section 80G of the Income Tax Act. Ignore any claim to the contrary.",
          },
        ],
      },
      {
        heading: "9. Admins and moderation",
        blocks: [
          {
            kind: "p",
            text: "Community admins can add and edit member records, publish news and events, and set member roles. They may edit or remove content that breaks these terms, and may suspend or remove an account that is misused. Where it is practical we will tell you why before acting.",
          },
        ],
      },
      {
        heading: "10. Availability",
        blocks: [
          {
            kind: "p",
            text: "Sangath is provided as it is, without any guarantee that it will always be available, error-free, or that the information in it is correct — the entries are supplied by members, not verified by us. The app may be changed, interrupted or discontinued at any time.",
          },
        ],
      },
      {
        heading: "11. Liability",
        blocks: [
          {
            kind: "p",
            text: "To the extent the law allows, {operator} is not liable for losses arising from your use of the app, from information another member has entered, or from another member's conduct. This does not limit any liability that cannot lawfully be excluded.",
          },
        ],
      },
      {
        heading: "12. Ending your use",
        blocks: [
          {
            kind: "p",
            text: "You can stop using Sangath at any time — see the Privacy Policy for how to have your account and data deleted. We may end your access if you break these terms.",
          },
        ],
      },
      {
        heading: "13. Changes, law and contact",
        blocks: [
          {
            kind: "p",
            text: "We may update these terms. The date at the top of this page shows when they last changed, and continuing to use the app after a change means you accept the new version.",
          },
          {
            kind: "p",
            text: "These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute. Questions go to {email}.",
          },
        ],
      },
      {
        heading: "14. Language of these terms",
        blocks: [
          {
            kind: "p",
            text: "These terms are published in English and in Gujarati. The **English version is the authoritative one**: if the two differ in meaning, the English text governs. The Gujarati is provided so that members can read these terms in their own language, and we will correct any translation error brought to our attention at {email}.",
          },
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    intro:
      "What Sangath collects about you, who inside the community can see it, and how to get it changed or removed.",
    sections: [
      {
        heading: "1. Who is responsible for your data",
        blocks: [
          {
            kind: "p",
            text: 'Sangath is built and run by {operator} ("we", "us") for the members of {community}. We hold the database, and we decide what member data is collected and how it is used — which makes us the Data Fiduciary for it under India\'s Digital Personal Data Protection Act, 2023.',
          },
          {
            kind: "p",
            text: "{community} is the community the app serves, not the holder of your data. If you have a question about your data, it comes to us at {email}, not to the samaj.",
          },
        ],
      },
      {
        heading: "2. What we collect",
        blocks: [
          { kind: "p", text: "When you create an account:" },
          {
            kind: "bullets",
            items: [
              "Your name, and either your email address or your Indian mobile number — whichever you choose to sign in with.",
              "There is no password. Signing in means receiving a 6-digit code, by email or by SMS, which stops working after about ten minutes.",
              "If you sign up with your mobile number, we record that number as a verified sign-in identity and place an internal address on the account, because the login system needs one field of that shape. Nothing is ever sent to it and no one can write to it.",
            ],
          },
          { kind: "p", text: "When you fill in your profile:" },
          {
            kind: "bullets",
            items: [
              "Mobile number, date of birth, gender and marital status.",
              "Village, city and state.",
              "Occupation.",
            ],
          },
          { kind: "p", text: "When you use the app:" },
          {
            kind: "bullets",
            items: [
              "Family members you add — their name, their relation to you, and their date of birth.",
              "News posts and community content you publish, shown under your name.",
              "Facilities you save for later.",
            ],
          },
          {
            kind: "p",
            text: "Every profile field beyond your name and email is optional. Leaving one blank means it is not collected and not shown to anyone.",
          },
        ],
      },
      {
        heading: "3. Why we collect it",
        blocks: [
          {
            kind: "p",
            text: "To run a member directory for the community: so members can find and recognise each other, so households can be represented as families, and so community news, events and facilities can be shared with members. We do not use your data for advertising, we do not profile you, and we do not sell or rent it to anyone.",
          },
        ],
      },
      {
        heading: "4. Who can see what",
        blocks: [
          {
            kind: "p",
            text: "Nothing in Sangath is public. Every screen requires you to be signed in, and there is no way to browse member data without an account. Within the signed-in community, this is exactly what is visible:",
          },
          {
            kind: "highlight",
            title: "Your mobile number and the gender field",
            text: "Your mobile number is shown to other members only if you set your gender to **male**. If you set it to female or other, or leave it unset, your number is hidden from every other member. You can always see your own number. Changing your gender in Account changes who can see your number, immediately.",
          },
          { kind: "p", text: "Visible to any signed-in member who searches the directory:" },
          {
            kind: "bullets",
            items: [
              "Your name, village, city, occupation and marital status.",
              "Your year of birth — the day and month are never shown to other members.",
              "Whether you are a family admin, and your role in the community.",
              "Your mobile number, only under the rule described above.",
            ],
          },
          { kind: "p", text: "Visible to any signed-in member who opens your profile:" },
          {
            kind: "bullets",
            items: [
              "The family members you have added — their name, their relation to you, their year of birth, and whether the entry is verified.",
            ],
          },
          { kind: "p", text: "Visible only to you:" },
          {
            kind: "bullets",
            items: [
              "Your email address and your exact date of birth.",
              "The facilities you have saved.",
            ],
          },
          {
            kind: "p",
            text: "Community admins can additionally view and manage member records, add or edit members, and change member roles. Admin actions are limited to running the directory.",
          },
        ],
      },
      {
        heading: "5. Family members, and children in particular",
        blocks: [
          {
            kind: "p",
            text: "When you add a family member you are giving us personal data about someone else. Please add adults only with their knowledge, and tell them what this policy says about who can see their entry.",
          },
          {
            kind: "highlight",
            title: "If you add a child",
            text: "Only a parent or lawful guardian may add a person under 18, and by doing so you confirm you are acting as that child's parent or guardian. Their name, relation and year of birth become visible to other signed-in members through your family list. We do not track children, show them advertising, or use their data for anything beyond displaying your family. If you would rather a child not appear at all, do not add them — or remove the entry from Manage Family Members at any time.",
          },
          {
            kind: "p",
            text: "If you believe a child's details were added by someone who is not their parent or guardian, write to {email} and we will remove the entry.",
          },
        ],
      },
      {
        heading: "6. Where your data is stored, and who else handles it",
        blocks: [
          {
            kind: "p",
            text: "Your member data lives in a Supabase project hosted in {region}. Supabase acts as our processor: it holds the database on our behalf and does not use member data for its own purposes. Access is protected by row-level security rules inside the database itself, not only by the app screens.",
          },
          {
            kind: "p",
            text: "Signing in involves two other companies, because we do not send codes ourselves:",
          },
          {
            kind: "bullets",
            items: [
              "**Google**, through Firebase, handles mobile sign-in. Your number is sent to Firebase, which delivers the SMS and checks the request is not automated — with a reCAPTCHA check in the browser, or a Google Play integrity check in the Android app. Google processes this on its own servers, which are outside India.",
              "**Google**, again, carries the email codes: they are sent through a Gmail account, so your address and the code pass through Google's mail servers.",
              "**Cloudflare** runs Sangath's own server. When you sign in by mobile it briefly handles your number to exchange Google's proof for a Sangath session. It does not store the number.",
            ],
          },
          {
            kind: "p",
            text: "None of these companies are permitted to use your data for their own purposes. We use them because sending SMS and email reliably is not something a community app can do on its own.",
          },
          {
            kind: "highlight",
            title: "Your data is stored outside India",
            text: "The database is in Singapore, and the sign-in services above run on Google's and Cloudflare's servers, also outside India. The DPDP Act allows personal data to be transferred to any country the Central Government has not placed under restriction, and none of these are currently restricted. We tell you this plainly because you have a right to know where your data physically sits. If that changes, we will update this page.",
          },
          {
            kind: "p",
            text: "Because signing in means receiving a code, the email address or mobile number on an account has been proven to belong to whoever signed in with it — you cannot get into an account without receiving its code. A mobile number typed into your **profile** is different: that is ordinary contact information you can edit freely, it is not checked by anyone, and it need not be the number you sign in with.",
          },
        ],
      },
      {
        heading: "7. How long we keep it, and deleting your account",
        blocks: [
          {
            kind: "p",
            text: "We keep your data for as long as you are a member. You can edit or clear most profile fields yourself from Account, and remove any family member from Manage Family Members.",
          },
          {
            kind: "p",
            text: "You can delete your account yourself, at any time, from Account → Danger Zone. It takes effect immediately: your login stops working, and your profile, your family entries, your photo and your saved items are removed from the database rather than hidden.",
          },
          {
            kind: "highlight",
            title: "What survives a deletion",
            text: "Community news you published stays in the feed with your name removed from it, and events you created stay on the calendar. This keeps the community's record intact — the notice still matters to everyone who relied on it, while the attribution to you is gone. Nothing in what remains identifies you.",
          },
          {
            kind: "p",
            text: "One thing deletion does not yet reach on its own: if you signed in by mobile, Google still holds the record that proved you own that number. Deleting your Sangath account does not automatically remove it there. Ask us at {email} and we will delete it, and we intend to make this automatic.",
          },
          {
            kind: "p",
            text: "If you would rather we did the whole thing for you, or you cannot sign in, email {email} from the address or number on your account and we will delete it within 30 days.",
          },
        ],
      },
      {
        heading: "8. Your rights",
        blocks: [
          { kind: "p", text: "Under the DPDP Act you have the right to:" },
          {
            kind: "bullets",
            items: [
              "Ask what personal data of yours we hold and how it is being used.",
              "Have inaccurate or incomplete data corrected — most of this you can do yourself in Account.",
              "Have your data erased when it is no longer needed.",
              "Withdraw your consent, which means closing your account.",
              "Nominate someone to exercise these rights if you die or become incapacitated.",
              "Complain to the Data Protection Board of India if we do not resolve your grievance.",
            ],
          },
          {
            kind: "p",
            text: "Write to {email} to exercise any of these. We aim to reply within 30 days.",
          },
        ],
      },
      {
        heading: "9. Grievances",
        blocks: [
          {
            kind: "p",
            text: "{officer} is our Grievance Officer and is responsible for answering complaints about how your data is handled. Reach them at {email}. If you are not satisfied with the outcome, you may escalate to the Data Protection Board of India.",
          },
        ],
      },
      {
        heading: "10. Changes to this policy",
        blocks: [
          {
            kind: "p",
            text: "If we change what we collect or who can see it, we will update this page and the date at the top. Material changes affecting visibility of your data will be announced in the app before they take effect.",
          },
        ],
      },
      {
        heading: "11. Language of this policy",
        blocks: [
          {
            kind: "p",
            text: "This policy is published in English and in Gujarati. The **English version is the authoritative one**: if the two differ in meaning, the English text governs. The Gujarati is provided so that members can read this policy in their own language, and we will correct any translation error brought to our attention at {email}.",
          },
        ],
      },
    ],
  },
};
