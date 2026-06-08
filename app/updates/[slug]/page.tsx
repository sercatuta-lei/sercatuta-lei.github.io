import StudentUpdateClient from './StudentUpdateClient';
import { PEOPLE } from '@/lib/people';

// Generate static paths for everyone who has an individual page.
export async function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export default async function StudentUpdatePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // In Next.js 15, params is now a Promise and must be awaited
  const { slug } = await params;
  return <StudentUpdateClient slug={slug} />;
}
