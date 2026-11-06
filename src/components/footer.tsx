import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/impressum", label: "Legal Notice" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="text-muted-foreground flex flex-wrap justify-center gap-4 px-4 pb-6 text-sm">
      {LEGAL_LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="hover:text-accent">
          {link.label}
        </Link>
      ))}
    </footer>
  );
}
