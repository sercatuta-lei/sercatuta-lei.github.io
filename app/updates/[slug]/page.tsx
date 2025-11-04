import StudentUpdateClient from './StudentUpdateClient';

// Generate static paths for all students at build time
export async function generateStaticParams() {
  // List of all possible student slugs
  return [
    { slug: 'arjun-dahal' },
    { slug: 'fadul-sikder' },
    { slug: 'krishna-khadka' },
    { slug: 'pujan-budhathoki' },
    { slug: 'qiping-wei' },
    { slug: 'saif-uddin-mahmud' },
    { slug: 'shovon-niverd' },
  ];
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
