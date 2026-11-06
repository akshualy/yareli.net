import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/terms",
  },
  title: "Terms",
  description:
    "Terms of use for the Merframe app, yareli.net and api.merframe.net.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p className="text-muted-foreground">Last updated: 3 November 2026</p>
      <p>
        These terms apply to the Merframe app, this website (yareli.net,
        including Relay Robber) and the services api.merframe.net and
        api.yareli.net. By using any of them, you accept these terms.
      </p>

      <h2>Free software</h2>
      <p>
        Merframe is free software under the GNU General Public License, version
        3 or later. The license grants you the right to run, study, change and
        share the software. Sections 15 and 16 of the license state that the
        software is provided without any warranty and that its authors are not
        liable for damages arising from its use, to the extent permitted by
        applicable law. The license text is available at{" "}
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.gnu.org/licenses/gpl-3.0.html
        </a>
        .
      </p>

      <h2>No affiliation with Digital Extremes</h2>
      <p>
        Merframe and yareli.net are independent fan projects. They are not
        affiliated with, endorsed, sponsored or approved by Digital Extremes
        Ltd. Warframe and its logos are trademarks or registered trademarks of
        Digital Extremes Ltd. Game names, images and artwork are the property of
        Digital Extremes Ltd. and are used in accordance with its content policy
        for non-commercial fan projects.
      </p>

      <h2>Use at your own risk</h2>
      <p>
        Merframe reads the running game and its log file on your computer.
        Whether this is permitted is governed by the EULA and Terms of Use of
        Warframe, which you have agreed to with Digital Extremes Ltd. We cannot
        rule out that Digital Extremes takes action against accounts that use
        third-party tools. The decision to use Merframe, and the consequences
        for your account, rest with you.
      </p>

      <h2>Availability of the services</h2>
      <p>
        api.merframe.net, api.yareli.net and this website are operated as a
        non-commercial project. We do not guarantee their availability, accuracy
        or continued operation and may change or discontinue them at any time
        without notice. Prices originate from warframe.market and the world
        state from Digital Extremes, and both may be outdated by the time they
        are displayed.
      </p>

      <h2>Permitted use of the services</h2>
      <p>
        api.merframe.net and api.yareli.net are provided for the Merframe app
        and this website. Automated mass requests and the resale of the data
        obtained are not permitted. If you wish to build on these services,
        contact us via the issue tracker on GitHub.
      </p>

      <h2>Liability</h2>
      <p>
        We are not liable for damage arising from the use of Merframe or the
        services named above. This does not apply to damage resulting from
        intent or gross negligence, to injury to life, body or health, or to
        claims under the German Product Liability Act. Mandatory consumer rights
        remain unaffected.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may change these terms when the app or the services change. The date
        at the top of this page indicates the current version.
      </p>

      <h2>Applicable law</h2>
      <p>
        The law of the Federal Republic of Germany applies. If you are a
        consumer residing in another member state of the European Union, the
        mandatory consumer protection provisions of that state remain
        unaffected.
      </p>
    </LegalPage>
  );
}
