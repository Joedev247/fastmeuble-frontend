import { redirect } from 'next/navigation';

// Mark as dynamic to prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootPage() {
  // Redirect to French (default locale)
  // The client will detect their language preference in the [locale] layout
  redirect('/fr');
}
