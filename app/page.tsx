import { redirect } from "next/navigation";
import { locales } from "@/i18n";

export default function RootPage() {
  // Redirect to default locale
  redirect(`/${locales[0]}`);
}
