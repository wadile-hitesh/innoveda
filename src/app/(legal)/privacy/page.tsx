import PrivacyPolicy from "@/pages/Privacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Innoveda",
  description: "Read our privacy policy to understand how we protect your data.",
  alternates: {
    canonical: "https://www.innoveda.tech/privacy",
  },
};

export default function page() {
  return <PrivacyPolicy />;
}
