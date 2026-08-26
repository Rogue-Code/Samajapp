import { createLazyFileRoute } from "@tanstack/react-router";
import { Bullets, Highlight, LegalPage, Section } from "@/components/LegalPage";
import { COMMUNITY_NAME, CONTACT_EMAIL, OPERATOR_NAME } from "@/lib/legal";

export const Route = createLazyFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The rules for using Sangath. By creating an account or signing in, you accept them."
    >
      <Section heading="1. What Sangath is">
        <p>
          Sangath is a private directory app for the members of {COMMUNITY_NAME}. It exists so
          members can find each other, keep a record of their household, and follow community news,
          events and facilities. It is provided for the community's benefit, not as a commercial
          service.
        </p>
      </Section>

      <Section heading="2. Who owns Sangath">
        <p>
          The app itself — its code, design, screens, name and logo — is the property of{" "}
          {OPERATOR_NAME}, who built it and runs it. Nothing in these terms transfers any of that to{" "}
          {COMMUNITY_NAME} or to you. You get a personal, non-transferable permission to use the app
          as a member, for as long as you are one. You may not copy, resell, rebrand or redistribute
          it, or build a competing service from it.
        </p>
        <Highlight>
          <p className="font-semibold mb-2">Owning the app is not owning your data</p>
          <p>
            The software is ours. The personal details you enter are not — they remain yours, and
            you can correct or delete them as set out in the Privacy Policy. What you post as
            community news also stays yours. We hold and look after member data as the party
            accountable for it, which is a duty, not a claim of ownership.
          </p>
        </Highlight>
      </Section>

      <Section heading="3. Who may use it">
        <p>
          Accounts are for members of the community. You must be 18 or older to hold an account.
          Children may appear only as entries in a family list, added by their own parent or
          guardian — they do not get logins of their own.
        </p>
        <p>We may decline or close an account that does not belong to a member of the community.</p>
      </Section>

      <Section heading="4. Your account">
        <p>
          Give accurate details and keep them current — a directory is only useful if the entries
          are true. Keep your password to yourself; you are responsible for what happens under your
          account. If you think someone else has access to it, change your password and tell us at{" "}
          {CONTACT_EMAIL}.
        </p>
        <p>
          Email addresses are not currently verified when an account is created, so do not treat an
          email shown in the app as proof of identity.
        </p>
      </Section>

      <Section heading="5. How you may use the directory">
        <p>
          Other members' details are shared with you for ordinary community purposes — getting in
          touch, recognising relatives, staying connected. They are not a mailing list.
        </p>
        <Highlight>
          <p className="font-semibold mb-2">You must not</p>
          <p>
            Copy, scrape or export the directory in bulk; use member contact details for marketing,
            sales, political canvassing, fundraising outside the community, debt collection or
            matrimonial brokering; pass anyone's number or address to a person outside the
            community; or publish member details anywhere else, including social media and messaging
            groups.
          </p>
        </Highlight>
        <p>
          Doing any of this is grounds for immediate removal from the app, and may also be a
          criminal offence.
        </p>
      </Section>

      <Section heading="6. What you post">
        <p>
          You keep ownership of the news, notices and content you publish. By posting it in Sangath
          you allow us to display it to other members inside the app.
        </p>
        <p>Do not post anything that:</p>
        <Bullets
          items={[
            "Is false, misleading, or presented as coming from someone else.",
            "Harasses, threatens, defames or humiliates another person.",
            "Discloses another member's private details without their agreement.",
            "Solicits money, promotes a business, or advertises a service.",
            "Is unlawful, or infringes someone else's copyright.",
          ]}
        />
      </Section>

      <Section heading="7. Family entries">
        <p>
          When you add a family member you are entering another person's details. Add adults only
          with their agreement, and children only if you are their parent or lawful guardian. You
          are responsible for keeping those entries accurate and for removing them if the person
          asks. See the Privacy Policy for who can see a family entry.
        </p>
      </Section>

      <Section heading="8. Donations and community funds">
        <p>
          Sangath does not process payments. The app does not take card, UPI or bank transfers, and
          no payment details are collected through it. Any contribution to a community cause is
          arranged outside the app, directly with the community.
        </p>
        <p>
          The community does not hold an 80G certificate, so contributions are not eligible for tax
          deduction under section 80G of the Income Tax Act. Ignore any claim to the contrary.
        </p>
      </Section>

      <Section heading="9. Admins and moderation">
        <p>
          Community admins can add and edit member records, publish news and events, and set member
          roles. They may edit or remove content that breaks these terms, and may suspend or remove
          an account that is misused. Where it is practical we will tell you why before acting.
        </p>
      </Section>

      <Section heading="10. Availability">
        <p>
          Sangath is provided as it is, without any guarantee that it will always be available,
          error-free, or that the information in it is correct — the entries are supplied by
          members, not verified by us. The app may be changed, interrupted or discontinued at any
          time.
        </p>
      </Section>

      <Section heading="11. Liability">
        <p>
          To the extent the law allows, {OPERATOR_NAME} is not liable for losses arising from your
          use of the app, from information another member has entered, or from another member's
          conduct. This does not limit any liability that cannot lawfully be excluded.
        </p>
      </Section>

      <Section heading="12. Ending your use">
        <p>
          You can stop using Sangath at any time — see the Privacy Policy for how to have your
          account and data deleted. We may end your access if you break these terms.
        </p>
      </Section>

      <Section heading="13. Changes, law and contact">
        <p>
          We may update these terms. The date at the top of this page shows when they last changed,
          and continuing to use the app after a change means you accept the new version.
        </p>
        <p>
          These terms are governed by the laws of India, and the courts of India have jurisdiction
          over any dispute. Questions go to {CONTACT_EMAIL}.
        </p>
      </Section>
    </LegalPage>
  );
}
