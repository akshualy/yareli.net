import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
  },
  title: "Privacy",
  description:
    "What data yareli.net, api.merframe.net and the Merframe app process, and why.",
};

const BROWSER_COOKIE_HELP = [
  {
    browser: "Chrome Browser",
    url: "https://support.google.com/accounts/answer/61416?hl=en",
  },
  {
    browser: "Microsoft Edge",
    url: "https://support.microsoft.com/de-de/microsoft-edge/cookies-in-microsoft-edge-lB6schen-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
  {
    browser: "Mozilla Firefox",
    url: "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences",
  },
  {
    browser: "Safari",
    url: "https://support.apple.com/de-de/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
  },
];

function ExternalLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  );
}

function ObjectionNotice() {
  return (
    <p>
      <strong>
        <em>
          On grounds relating to your particular situation, you have the right
          to object at any time to this processing of your personal data and
          carried out on the basis of Article 6(1)(f) GDPR.
        </em>
      </strong>
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Data protection declaration">
      <p className="text-muted-foreground">Last updated: 3 November 2026</p>
      <p>
        Unless stated otherwise below, the provision of your personal data is
        neither legally nor contractually obligatory, nor required for
        conclusion of a contract. You are not obliged to provide your data. Not
        providing it will have no consequences. This only applies as long as the
        processing procedures below do not state otherwise.
        <br />
        &ldquo;Personal data&rdquo; is any information relating to an identified
        or identifiable natural person.
      </p>

      <h3>Server log files</h3>
      <p>You can use our websites without submitting personal data.</p>
      <p>
        Every time our website is accessed, user data is transferred to us or
        our web hosts/IT service providers by your internet browser and stored
        in server log files. This stored data includes for example the name of
        the site called up, date and time of the request, the IP address, amount
        of data transferred and the provider making the request. The processing
        is carried out on the basis of Article 6(1) f) GDPR due to our
        legitimate interests in ensuring the smooth operation of our website as
        well as improving our services.
      </p>

      <h3>Relay Robber</h3>
      <p>
        When you request relays, your browser transmits the region, language and
        filter values you selected to api.yareli.net, a service operated by us.
        No data beyond the server log files described above is stored. The
        processing is carried out on the basis of Article 6(1) f) GDPR due to
        our legitimate interest in providing the function you requested. The
        form values, blessing messages and role list are stored in your
        browser&apos;s local storage (see below) and are not transmitted to us.
      </p>
      <ObjectionNotice />

      <h2>Contact</h2>
      <h3>Responsible person</h3>
      <p>
        Contact us at any time. The person responsible for data processing is:
        Huppertz, Merframe, c/o Händlerbund ID #1258, Kohlgartenstraße 11-13,
        04315 Leipzig, Deutschland, merframe@yareli.net
      </p>

      <h3>
        Data processing when using the reporting system in accordance with the
        TCO Regulation (Regulation (EU) 2021/784) and the Digital Services Act
        (Regulation (EU) 2022/2065)
      </h3>
      <p>
        If you send us information regarding suspected terrorist content or
        other illegal content by email, contact form or other electronic means
        of communication provided by us, we will only collect your personal data
        (email address, name, message text) to the extent provided by you. The
        data processing serves the purpose of carrying out a reporting procedure
        in accordance with the aforementioned regulations.
        <br />
        The data processing is carried out to fulfill a legal obligation on the
        basis of Art. 6 para. 1 lit. c GDPR in conjunction with Art. 15 TCO-VO
        and Art. 6 para. 1 lit. c GDPR in conjunction with Art. 11, 12 and 16 of
        the Digital Services Act.
        <br />
        Your data will then be deleted in compliance with statutory retention
        periods.
      </p>

      <h3>Proactive contact of the customer by e-mail</h3>
      <p>
        If you make contact with us proactively via email, we shall collect your
        personal data (name, email address, message text) only to the extent
        provided by you. The purpose of the data processing is to handle and
        respond to your contact request.
      </p>
      <p>
        If the initial contact serves to implement pre-contractual measures
        (e.g. consultation in the case of purchase interest, order creation) or
        concerns an agreement already concluded between you and us, this data
        processing takes place on the basis of Article 6(1)(b) GDPR.
      </p>
      <p>
        If the initial contact occurs for other reasons, this data processing
        takes place on the basis of Article 6(1)(f) GDPR for the purposes of our
        overriding, legitimate interest in handling and responding to your
        request.{" "}
        <strong>
          <em>
            In this case, on grounds relating to your particular situation, you
            have the right to object at any time to this processing of personal
            data concerning you and carried out on the basis of Article 6(1)(f)
            GDPR.
          </em>
        </strong>
      </p>
      <p>
        We will only use your email address to process your request. Your data
        will subsequently be deleted in compliance with statutory retention
        periods, unless you have agreed to further processing and use.
      </p>

      <h3>Collection and processing when using the cancel button</h3>
      <p>
        If you cancel a subscription contract concluded via our website using
        the legally required cancel button, we will process the data you enter
        in the confirmation form. When you use the cancel button, we collect
        your personal data (name, email address, your telephone number if
        applicable, details identifying the contract you wish to cancel, and the
        time (date and time) of sending the notice of cancellation) only to the
        extent that you provide it. The purpose of this data processing is to
        provide you with the legally prescribed option to cancel your continuing
        contractual relationship and to ensure the proper processing of your
        cancellation.
      </p>
      <p>
        If the contact relates to a contract already concluded between you and
        us, this data processing is carried out on the basis of Article 6(1)(b)
        of the GDPR. Otherwise, data processing is carried out on the basis of
        Article 6(1)(c) of the GDPR, as we are legally obliged to provide you
        with a cancel button on our website.
      </p>
      <p>
        We use your email address solely to process your notice of cancellation.
        Your data will subsequently be deleted in accordance with statutory
        retention periods, provided you have not consented to further processing
        and use.
      </p>

      <h2>Cookies</h2>
      <p>
        Our website uses cookies. Cookies are small text files which are saved
        in a user&rsquo;s internet browser or by the user&rsquo;s internet
        browser on their computer system. When a user calls up a website, a
        cookie may be saved on the user&rsquo;s operating system. This cookie
        contains a characteristic character string which allows the browser to
        be clearly identified when the website is called up again.
      </p>
      <p>
        Cookies will be stored on your computer. You therefore have full control
        over the use of cookies. By choosing corresponding technical settings in
        your internet browser, you can be notified before the setting of cookies
        and you can decide whether to accept this setting in each individual
        case as well as prevent the storage of cookies and transmission of the
        data they contain. Cookies which have already been saved may be deleted
        at any time. We would, however, like to point out that this may prevent
        you from making full use of all the functions of this website.
      </p>
      <p>
        Using the links below, you can find out how to manage cookies (or
        deactivate them, among other things) in major browsers:
      </p>
      <ul>
        {BROWSER_COOKIE_HELP.map((entry) => (
          <li key={entry.url}>
            {entry.browser}: <ExternalLink href={entry.url} />
          </li>
        ))}
      </ul>

      <h3>technically necessary cookies</h3>
      <p>
        Insofar as no other information is given in the data protection
        declaration below we use only these technically necessary cookies
        cookies to make our offering more user-friendly, effective and secure.
        Cookies also allow our systems to recognise your browser after a page
        change and to offer you services. Some functions of our website cannot
        be offered without the use of cookies. These services require the
        browser to be recognised again after a page change.
      </p>
      <p>
        The use of cookies or comparable technologies is carried out on the
        basis of Art. 25 para. 2 TDDDG. Processing is carried out on the basis
        of art. 6 (1) lit. f GDPR due to our largely justified interest in
        ensuring the optimal functionality of the website as well as a
        user-friendly and effective design of our range of services.
      </p>
      <p>
        <strong>
          <em>
            You have the right to veto this processing of your personal data
            according to art. 6 (1) lit. f GDPR, for reasons relating to your
            personal situation.
          </em>
        </strong>
      </p>

      <h3>Local storage</h3>
      <p>
        This website stores your theme choice, the Relay Robber form values,
        your blessing messages and your role list in your browser&apos;s local
        storage so that they are available on your next visit. This data is not
        transmitted to us. The storage is carried out on the basis of Art. 25
        para. 2 TDDDG, as it is strictly necessary to provide the functions you
        requested. You can delete this data at any time via the site data
        settings of your browser.
      </p>

      <h2>Plug-ins</h2>
      <h3>Use of Cloudflare</h3>
      <p>
        On our website, we use the Content Delivery Network, Cloudflare CDN of
        Cloudflare Inc. (101 Townsend St, San Francisco, CA 94107, USA;
        &ldquo;Cloudflare&rdquo;). This is a supraregional network of servers in
        different data centres with which our web server connects and via which
        certain contents of our website are delivered.
      </p>
      <p>
        The purpose of the data processing is to optimise the loading times of
        our website in order to make our offer more user-friendly.
      </p>
      <p>
        This can involve the collection of, among other things, the following
        information: IP address, system configuration information, information
        about the traffic from and to customer websites (server log files).
      </p>
      <p>
        Your data may be transferred to the USA. For the USA, there is an
        adequacy decision of the EU Commission, the Trans-Atlantic Data Privacy
        Framework (TADPF). Cloudflare has certified itself in accordance with
        the TADPF and has thus undertaken to comply with European data
        protection principles.
        <br />
        Processing is carried out on the basis of Article 6(1)(f) GDPR for the
        purposes of our legitimate interest in needs-based and targeted design
        of the website.{" "}
        <strong>
          <em>
            On grounds relating to your particular situation, you have the right
            to object at any time to this processing of your personal data and
            carried out on the basis of Article 6(1)(f) GDPR.
          </em>
        </strong>
      </p>
      <p>
        For more information about privacy when using Cloudflare, please visit{" "}
        <ExternalLink href="https://www.cloudflare.com/de-de/privacypolicy/" />.
      </p>
      <p>
        Cloudflare is also used for the services api.yareli.net and
        api.merframe.net. The information above applies accordingly to requests
        to these services.
      </p>

      <h2>The Merframe app</h2>
      <p>
        The Merframe app is a desktop application that reads the running game
        and its log file on your computer. The data read in this way (inventory,
        trades, relic openings and other account data) is stored exclusively on
        your computer in the Merframe data folder and is not transmitted to us.
        In order to provide its functions, the app connects to the services
        listed below. Each request transmits your IP address to the respective
        service. Unless stated otherwise, the processing is carried out on the
        basis of Article 6(1) f) GDPR due to our legitimate interest in
        providing the function you requested.
      </p>

      <h3>Use of api.merframe.net</h3>
      <p>
        The app retrieves price tables of warframe.market, riven data and the
        item list from api.merframe.net, a service operated by us. The request
        contains no account data, only a version identifier of the data already
        present on your computer, so that unchanged data is not transmitted
        again. Requests are stored in server log files as described above.
      </p>
      <ObjectionNotice />

      <h3>Use of warframe.market</h3>
      <p>
        Prices and orders are retrieved from warframe.market without an account.
        If you log in to warframe.market within the app, your warframe.market
        e-mail address and password are transmitted to warframe.market, and the
        session token returned is stored in the Merframe data folder on your
        computer so that you remain logged in. Logging out deletes the token.
        While you are logged in, the app transmits the changes you make to your
        listings under your warframe.market account. warframe.market is a
        third-party service with its own data protection declaration:{" "}
        <ExternalLink href="https://warframe.market/" />
      </p>
      <ObjectionNotice />

      <h3>Retrieval of the world state from Digital Extremes</h3>
      <p>
        The World page retrieves the public world state of Warframe from
        api.warframe.com (Digital Extremes Ltd., London, Ontario, Canada) every
        5 to 10 minutes. The request contains no account data. For Canada, there
        is an adequacy decision of the EU Commission. For more information about
        privacy at Digital Extremes, please visit{" "}
        <ExternalLink href="https://www.warframe.com/en/privacy" />.
      </p>
      <ObjectionNotice />

      <h3>Retrieval of item data and images from WFCD</h3>
      <p>
        Item names, drop tables and item images are retrieved from the WFCD
        warframe-items project, which is hosted on GitHub (GitHub Inc., 88 Colin
        P Kelly Jr St, San Francisco, CA 94107, USA, a subsidiary of Microsoft
        Corporation) and at cdn.warframestat.us. Images are cached on your
        computer after the first retrieval. The requests contain no account
        data. Your data may be transferred to the USA. For the USA, there is an
        adequacy decision of the EU Commission, the Trans-Atlantic Data Privacy
        Framework (TADPF). GitHub has certified itself in accordance with the
        TADPF and has thus undertaken to comply with European data protection
        principles. For more information about the project, please visit{" "}
        <ExternalLink href="https://github.com/WFCD/warframe-items" />.
      </p>
      <ObjectionNotice />

      <h3>Update check via GitHub</h3>
      <p>
        When the app starts and when you select &ldquo;Check for Updates&rdquo;,
        the app retrieves the information on the latest release of Merframe from
        GitHub (GitHub Inc., see above). The request contains no account data.
        Your data may be transferred to the USA. GitHub has certified itself in
        accordance with the TADPF. For more information about privacy when using
        GitHub, please visit{" "}
        <ExternalLink href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" />
        .
      </p>
      <ObjectionNotice />

      <h3>Discord webhook</h3>
      <p>
        If you enter a Discord webhook in the settings of the app, the app
        transmits the alert messages you selected, with the message text you
        configured, to this webhook at discord.com (Discord Inc., 444 De Haro
        St, San Francisco, CA 94107, USA). The message may contain your in-game
        name if you included it in the message template. No data is transmitted
        to Discord unless you have set up a webhook. Discord states that it
        transfers the data of European users on the basis of standard
        contractual clauses and the Trans-Atlantic Data Privacy Framework. For
        more information about privacy when using Discord, please visit{" "}
        <ExternalLink href="https://discord.com/privacy" />.
      </p>
      <ObjectionNotice />

      <h3>Data stored on your computer</h3>
      <p>
        The app stores its settings, the cached inventory, the local database,
        cached item images and the warframe.market session token in the Merframe
        data folder on your computer. Deleting this folder removes all of this
        data. The About page of the app opens this folder.
      </p>

      <h2>Rights of persons affected and storage duration</h2>
      <h3>Duration of Storage</h3>
      <p>
        The data will be stored under consideration of legal retention periods
        and then deleted after expiration of the period, unless you have not
        agreed to further processing and use.
      </p>

      <h3>Rights of the affected person</h3>
      <p>
        If the legal requirements are fulfilled, you have the following rights
        according to art. 15 to 20 GDPR: Right to information, correction,
        deletion, restriction of processing, data portability. You also have a
        right of objection against processing based on art. 6 (1) GDPR, and to
        processing for the purposes of direct marketing, according to art. 21
        (1) GDPR.
      </p>

      <h3>Right to complain to the regulatory authority</h3>
      <p>
        You have the right to complain to the regulatory authority according to
        art. 77 GDPR if you believe that your data is not being processed
        legally.
      </p>
      <p>
        You can lodge a complaint with, among others, the supervisory authority
        responsible for us, which you may reach at the following contact
        details:
      </p>
      <p>
        Landesbeauftragte für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen
        <br />
        Postfach 20 04 44
        <br />
        40102 Düsseldorf
        <br />
        Tel.: +49 211 384240
        <br />
        Fax: +49 211 38424999
        <br />
        E-Mail: poststelle@ldi.nrw.de
      </p>

      <h3>Right to object</h3>
      <p>
        If the data processing outlined here is based on our legitimate
        interests in accordance with Article 6(1)f) GDPR, you have the right for
        reasons arising from your particular situation to object at any time to
        the processing of your data with future effect.
      </p>
      <p>
        If the objection is successful, we will no longer process the personal
        data, unless we can demonstrate compelling legitimate grounds for the
        processing that outweigh your interests or rights and freedoms, or the
        processing is intended for the assertion, exercise or defence of legal
        claims.
      </p>
    </LegalPage>
  );
}
