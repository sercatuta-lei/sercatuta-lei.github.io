import { NextRequest, NextResponse } from 'next/server';

// Disable this API route for static export
export const dynamic = 'force-static';
export const revalidate = false;

// Interface for Google Scholar publication data
interface ScholarPublication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url: string;
  citations: number;
  pub_url: string;
}

// Interface for our publication format
interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  url: string;
  year: number;
  type: "conference" | "journal" | "workshop" | "book";
  acceptanceRate?: string;
}

// Function to determine publication type based on venue
function determinePublicationType(venue: string): "conference" | "journal" | "workshop" | "book" {
  const venueLower = venue.toLowerCase();
  
  if (venueLower.includes('proceedings') || venueLower.includes('conference') || venueLower.includes('symposium')) {
    return 'conference';
  } else if (venueLower.includes('journal') || venueLower.includes('ieee transactions') || venueLower.includes('acm')) {
    return 'journal';
  } else if (venueLower.includes('workshop')) {
    return 'workshop';
  } else if (venueLower.includes('book') || venueLower.includes('chapter')) {
    return 'book';
  }
  
  // Default to conference for academic papers
  return 'conference';
}

// Function to clean and format author names
function formatAuthors(authors: string[]): string {
  return authors.join(', ');
}

// Function to clean venue name
function cleanVenue(venue: string): string {
  // Remove common prefixes and clean up formatting
  return venue
    .replace(/^Proceedings of the\s*/i, '')
    .replace(/^Proceedings\s*/i, '')
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get('author_id') || 'UEHiYcoAAAAJ'; // Default to Jeff Lei's ID
    const updateMode = searchParams.get('update') === 'true';

    // For development/testing, we'll use a mock response
    // In production, you would integrate with a Python service or external API
    if (process.env.NODE_ENV === 'development') {
      const mockPublications: ScholarPublication[] = [
        {
          title: "Resolving Indirect Calls in Binary Code via Cross-Reference Augmented Graph Neural Networks",
          authors: ["Haotian Zhang", "Kun Liu", "Cristian Garces", "Chenke Luo", "Yu Lei", "Jiang Ming"],
          venue: "arXiv preprint arXiv:2507.18801",
          year: 2025,
          url: "https://doi.org/10.48550/arXiv.2507.18801",
          citations: 0,
          pub_url: "https://doi.org/10.48550/arXiv.2507.18801"
        },
        {
          title: "Efficient Adaptation of Large Language Models for Smart Contract Vulnerability Detection",
          authors: ["Fadul Sikder", "Yu Lei", "Yuede Ji"],
          venue: "Proceedings of the 21st International Conference on Predictive Models and Data Analytics in Software Engineering",
          year: 2025,
          url: "https://doi.org/10.1145/3727582.3728688",
          citations: 0,
          pub_url: "https://doi.org/10.1145/3727582.3728688"
        }
      ];

      const formattedPublications: Publication[] = mockPublications.map((pub, index) => ({
        id: Date.now() + index, // Generate unique ID
        title: pub.title,
        authors: formatAuthors(pub.authors),
        venue: cleanVenue(pub.venue),
        url: pub.url,
        year: pub.year,
        type: determinePublicationType(pub.venue)
      }));

      return NextResponse.json({
        success: true,
        publications: formattedPublications,
        total: formattedPublications.length,
        message: 'Publications fetched successfully (mock data)'
      });
    }

    // Production implementation would call a Python service or external API
    // This is a placeholder for the actual implementation
    return NextResponse.json({
      success: false,
      message: 'Production implementation requires Python service integration',
      error: 'Not implemented in production yet'
    }, { status: 501 });

  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch publications',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST endpoint to trigger manual update
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author_id = 'UEHiYcoAAAAJ', force_update = false } = body;

    // This would trigger the actual scraping process
    // For now, return a success response
    return NextResponse.json({
      success: true,
      message: 'Update triggered successfully',
      author_id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error triggering update:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to trigger update',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

