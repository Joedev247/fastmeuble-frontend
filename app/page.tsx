import { redirect } from "next/navigation";
import { locales } from "@/i18n";

export default function RootPage() {
  // Redirect to default locale (French)
  redirect('/fr');
}
