
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: "Terms and Conditions | Innoveda",
  description: "Read our terms and conditions to understand your rights and responsibilities.",
  alternates: {
    canonical: "https://innoveda.tech/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">Terms and Conditions – Innoveda</h1>

      <p className="mb-4"><strong>Effective Date:</strong> July 24, 2025</p>
      <p className="mb-10"><strong>Last Updated:</strong> July 24, 2025</p>

      <Section title="1. Acceptance of Terms">
        By using Innoveda (the “Service”), you agree to these Terms and our{' '}
        <Link href="/privacy" className="">Privacy Policy</Link>.
        If you do not agree, please do not use our services.
      </Section>

      <Section title="2. Eligibility">
        You must be at least 13 years old to use Innoveda. By using our platform, you represent that
        you are eligible and have the authority to accept these terms.
      </Section>

      <Section title="3. Use of the Service">
        <ul className="list-disc list-inside">
          <li>Do not use the platform for unlawful or harmful purposes.</li>
          <li>Do not upload or convert content that violates intellectual property rights.</li>
          <li>Do not interfere with the operation or security of the service.</li>
        </ul>
        <p className="mt-2">We may suspend your access if you violate these terms.</p>
      </Section>

      <Section title="4. User Content">
        You retain ownership of any content you upload. We process your files only to fulfill your
        request and do not store them longer than necessary unless otherwise stated.
      </Section>

      <Section title="5. Intellectual Property">
        All content, branding, and technology on Innoveda belong to us or our licensors. You may not
        copy, modify, or distribute without permission.
      </Section>

      <Section title="6. Disclaimers">
        Innoveda is provided “as is” without guarantees of accuracy, availability, or error-free use.
        We are not liable for any issues arising from your use of the service.
      </Section>

      <Section title="7. Limitation of Liability">
        We are not responsible for indirect or consequential damages related to your use of Innoveda.
      </Section>

      <Section title="8. Dispute Resolution">
        Disputes must first be attempted to resolve informally. If unresolved after 30 days, disputes
        will be settled by binding arbitration in <strong>[Mumbai, India]</strong>. Class action suits are waived.
      </Section>

      <Section title="9. Termination">
        We may terminate or suspend your access at any time, especially if you violate these Terms.
      </Section>

      <Section title="10. Changes to Terms">
        These Terms may change. Your continued use of Innoveda indicates acceptance of any updates.
        Check this page regularly.
      </Section>

      <Section title="11. Contact Us">
        If you have any questions, contact us at:
        <div className="mt-2">
          <p>Email: <Link href="mailto:support@innoveda.tech" className="">support@innoveda.tech</Link></p>
          <p>Website: <Link href="https://innovedLink.tech" className="">https://www.innoveda.tech</Link></p>
        </div>
      </Section>
    </main>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-white">{children}</div>
    </section>
  )
}
