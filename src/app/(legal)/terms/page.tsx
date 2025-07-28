import TermsPage from "@/pages/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Innoveda",
  description: "Read our terms and conditions to understand your rights and responsibilities.",
  alternates: {
    canonical: "https://innoveda.tech/terms",
  },
};

export default function page(){
  return (
    <TermsPage />
  )
}