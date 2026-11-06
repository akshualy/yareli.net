import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="mx-auto w-full md:max-w-3/4 xl:max-w-3/5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 [&_a]:text-primary [&_a]:break-all [&_a]:underline [&_h2]:text-primary [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-2 [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
