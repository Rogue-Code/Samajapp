import { createLazyFileRoute } from "@tanstack/react-router";
import { Bullets, Highlight, LegalPage, Section } from "@/components/LegalPage";
import {
  COMMUNITY_NAME,
  CONTACT_EMAIL,
  DATA_REGION,
  GRIEVANCE_OFFICER,
  OPERATOR_NAME,
} from "@/lib/legal";

export const Route = createLazyFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What Sangath collects about you, who inside the community can see it, and how to get it changed or removed."
    >
      <Section heading="1. Who is responsible for your data">
        <p>
          Sangath is built and run by {OPERATOR_NAME} ("we", "us") for the members of{" "}
          {COMMUNITY_NAME}. We hold the database, and we decide what member data is collected and
          how it is used — which makes us the Data Fiduciary for it under India's Digital Personal
          Data Protection Act, 2023.
        </p>
        <p>
          {COMMUNITY_NAME} is the community the app serves, not the holder of your data. If you have
          a question about your data, it comes to us at {CONTACT_EMAIL}, not to the samaj.
        </p>
      </Section>

      <Section heading="2. What we collect">
        <p>When you create an account:</p>
        <Bullets
          items={[
            "Your full name and email address.",
            "Your password, which is stored only as a cryptographic hash — we never see or store the password itself.",
          ]}
        />
        <p>When you fill in your profile:</p>
        <Bullets
          items={[
            "Mobile number, date of birth, gender and marital status.",
            "Village, city and state.",
            "Occupation.",
          ]}
        />
        <p>When you use the app:</p>
        <Bullets
          items={[
            "Family members you add — their name, their relation to you, and their date of birth.",
            "News posts and community content you publish, shown under your name.",
            "Facilities you save for later.",
          ]}
        />
        <p>
          Every profile field beyond your name and email is optional. Leaving one blank means it is
          not collected and not shown to anyone.
        </p>
      </Section>

      <Section heading="3. Why we collect it">
        <p>
          To run a member directory for the community: so members can find and recognise each other,
          so households can be represented as families, and so community news, events and facilities
          can be shared with members. We do not use your data for advertising, we do not profile
          you, and we do not sell or rent it to anyone.
        </p>
      </Section>

      <Section heading="4. Who can see what">
        <p>
          Nothing in Sangath is public. Every screen requires you to be signed in, and there is no
          way to browse member data without an account. Within the signed-in community, this is
          exactly what is visible:
        </p>
        <Highlight>
          <p className="font-semibold mb-2">Your mobile number and the gender field</p>
          <p>
            Your mobile number is shown to other members only if you set your gender to{" "}
            <span className="font-semibold">male</span>. If you set it to female or other, or leave
            it unset, your number is hidden from every other member. You can always see your own
            number. Changing your gender in Account changes who can see your number, immediately.
          </p>
        </Highlight>
        <p>Visible to any signed-in member who searches the directory:</p>
        <Bullets
          items={[
            "Your name, village, city, occupation and marital status.",
            "Your year of birth — the day and month are never shown to other members.",
            "Whether you are a family admin, and your role in the community.",
            "Your mobile number, only under the rule described above.",
          ]}
        />
        <p>Visible to any signed-in member who opens your profile:</p>
        <Bullets
          items={[
            "The family members you have added — their name, their relation to you, their year of birth, and whether the entry is verified.",
          ]}
        />
        <p>Visible only to you:</p>
        <Bullets
          items={[
            "Your email address and your exact date of birth.",
            "The facilities you have saved.",
          ]}
        />
        <p>
          Community admins can additionally view and manage member records, add or edit members, and
          change member roles. Admin actions are limited to running the directory.
        </p>
      </Section>

      <Section heading="5. Family members, and children in particular">
        <p>
          When you add a family member you are giving us personal data about someone else. Please
          add adults only with their knowledge, and tell them what this policy says about who can
          see their entry.
        </p>
        <Highlight>
          <p className="font-semibold mb-2">If you add a child</p>
          <p>
            Only a parent or lawful guardian may add a person under 18, and by doing so you confirm
            you are acting as that child's parent or guardian. Their name, relation and year of
            birth become visible to other signed-in members through your family list. We do not
            track children, show them advertising, or use their data for anything beyond displaying
            your family. If you would rather a child not appear at all, do not add them — or remove
            the entry from Manage Family Members at any time.
          </p>
        </Highlight>
        <p>
          If you believe a child's details were added by someone who is not their parent or
          guardian, write to {CONTACT_EMAIL} and we will remove the entry.
        </p>
      </Section>

      <Section heading="6. Where your data is stored, and that it leaves India">
        <p>
          Sangath stores data in a Supabase project hosted in {DATA_REGION}. Supabase acts as our
          processor: it holds the database and the authentication system on our behalf and does not
          use member data for its own purposes. Access is protected by row-level security rules in
          the database itself, not only by the app screens.
        </p>
        <Highlight>
          <p className="font-semibold mb-2">Your data is stored outside India</p>
          <p>
            The server is in Singapore, so your personal data is held there rather than in India.
            The DPDP Act allows personal data to be transferred to any country the Central
            Government has not placed under restriction, and Singapore is not currently restricted.
            We tell you this plainly because you have a right to know where your data physically
            sits. If that changes, we will update this page.
          </p>
        </Highlight>
        <p>
          Email confirmation is currently switched off, which means an email address on an account
          has not been independently verified. Treat an email shown in the app as claimed, not
          proven.
        </p>
      </Section>

      <Section heading="7. How long we keep it, and deleting your account">
        <p>
          We keep your data for as long as you are a member. You can edit or clear most profile
          fields yourself from Account, and remove any family member from Manage Family Members.
        </p>
        <p>
          You can delete your account yourself, at any time, from Account → Danger Zone. It takes
          effect immediately: your login stops working, and your profile, your family entries, your
          photo and your saved items are removed from the database rather than hidden.
        </p>
        <Highlight>
          <p className="font-semibold mb-2">What survives a deletion</p>
          <p>
            Community news you published stays in the feed with your name removed from it, and
            events you created stay on the calendar. This keeps the community's record intact — the
            notice still matters to everyone who relied on it, while the attribution to you is gone.
            Nothing in what remains identifies you.
          </p>
        </Highlight>
        <p>
          If you would rather we did it for you, or you cannot sign in, email {CONTACT_EMAIL} from
          the address on your account and we will delete it within 30 days.
        </p>
      </Section>

      <Section heading="8. Your rights">
        <p>Under the DPDP Act you have the right to:</p>
        <Bullets
          items={[
            "Ask what personal data of yours we hold and how it is being used.",
            "Have inaccurate or incomplete data corrected — most of this you can do yourself in Account.",
            "Have your data erased when it is no longer needed.",
            "Withdraw your consent, which means closing your account.",
            "Nominate someone to exercise these rights if you die or become incapacitated.",
            "Complain to the Data Protection Board of India if we do not resolve your grievance.",
          ]}
        />
        <p>Write to {CONTACT_EMAIL} to exercise any of these. We aim to reply within 30 days.</p>
      </Section>

      <Section heading="9. Grievances">
        <p>
          {GRIEVANCE_OFFICER} is our Grievance Officer and is responsible for answering complaints
          about how your data is handled. Reach them at {CONTACT_EMAIL}. If you are not satisfied
          with the outcome, you may escalate to the Data Protection Board of India.
        </p>
      </Section>

      <Section heading="10. Changes to this policy">
        <p>
          If we change what we collect or who can see it, we will update this page and the date at
          the top. Material changes affecting visibility of your data will be announced in the app
          before they take effect.
        </p>
      </Section>
    </LegalPage>
  );
}
