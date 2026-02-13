import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Account from "./_components/account";

export default function AccountPage() {
  return (
    <div className="mx-auto flex w-full items-center justify-center gap-4 md:max-w-3/4 xl:max-w-3/5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Get information on your Warframe account for use in other Warframe
            tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Account />
        </CardContent>
      </Card>
    </div>
  );
}
