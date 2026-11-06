import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/impressum",
  },
  title: "Legal Notice",
  description: "Legal website operator identification for yareli.net.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="About Us">
      <p className="font-bold">Legal website operator identification:</p>
      <p className="font-bold">
        Huppertz
        <br />
        Merframe
        <br />
        c/o Händlerbund ID #1258
        <br />
        Kohlgartenstraße 11-13
        <br />
        04315 Leipzig
        <br />
        Deutschland
      </p>
      <p className="font-bold">E-Mail: merframe@yareli.net</p>
      <h3>
        Contact point pursuant to Regulation (EU) 2021/784 of the European
        Parliament and of the Council:
      </h3>
      <p>
        E-mail: merframe@yareli.net
        <br />
        Contact is possible in the following languages: English, German
      </p>
      <h3>
        Contact point for users and authorities in accordance with Regulation
        (EU) 2022/2065 of the European Parliament and of the Council:
      </h3>
      <p>
        E-mail: merframe@yareli.net
        <br />
        Contact is possible in the following languages: English, German
      </p>
      <p>
        We are neither willing nor obliged to participate in dispute resolution
        proceedings before consumer arbitration boards.
      </p>
    </LegalPage>
  );
}
