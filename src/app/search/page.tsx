import { Suspense } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ItemCard } from '@/components/item-card';
import { SearchForm } from '@/components/search-form';
import { suggestPotentialMatches } from '@/ai/flows/suggest-potential-matches';
import { dummyFoundItems } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SearchX } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
    loc?: string;
  };
}

function SearchSkeleton() {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

async function SearchResults({ query, location }: { query: string; location: string }) {
    
  const itemsInLocation = location ? dummyFoundItems.filter(item => item.location.toLowerCase().includes(location.toLowerCase())) : dummyFoundItems;

  const potentialMatches = await Promise.all(
    itemsInLocation.map(async (foundItem) => {
      try {
        const result = await suggestPotentialMatches({
          lostItemDescription: query,
          lostItemLocation: location || 'campus',
          foundItemDescription: foundItem.description,
          foundItemLocation: foundItem.location,
        });
        return { ...foundItem, match: result };
      } catch (error) {
        console.error("AI matching failed for item:", foundItem.id, error);
        return { ...foundItem, match: { isMatch: false, matchConfidence: 0, reason: "Error in matching." } };
      }
    })
  );

  const matchedItems = potentialMatches
    .filter((item) => item.match.isMatch)
    .sort((a, b) => b.match.matchConfidence - a.match.matchConfidence);

  if (matchedItems.length === 0) {
    return (
        <Alert className="max-w-2xl mx-auto">
            <SearchX className="h-4 w-4" />
            <AlertTitle>No Matches Found</AlertTitle>
            <AlertDescription>
                We couldn&apos;t find any items matching your search. You can try a different search term or check back later.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {matchedItems.map((item) => (
        <ItemCard key={item.id} item={item} match={item.match} />
      ))}
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', loc = '' } = searchParams;

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-card/50">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline mb-2">
              Search Results
            </h1>
            <p className="text-muted-foreground mb-8">
              {q ? `Showing results for "${q}"` : 'Refine your search below.'}
              {loc && ` in "${loc}"`}
            </p>
            <div className="w-full max-w-3xl">
              <SearchForm />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {!q ? (
                 <Alert className="max-w-2xl mx-auto">
                    <SearchX className="h-4 w-4" />
                    <AlertTitle>Start a Search</AlertTitle>
                    <AlertDescription>
                        Please enter a description of your lost item in the search bar above to find potential matches.
                    </AlertDescription>
                </Alert>
            ) : (
              <Suspense fallback={<SearchSkeleton />}>
                <SearchResults query={q} location={loc} />
              </Suspense>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
