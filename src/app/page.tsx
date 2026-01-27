import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { SearchForm } from '@/components/search-form';
import { ItemCard } from '@/components/item-card';
import { dummyFoundItems } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Find What You've Lost
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our campus-wide system helps you reconnect with your
                  belongings. Report a found item or search for your lost one.
                </p>
              </div>
              <div className="w-full max-w-2xl">
                <SearchForm />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                  Recently Found Items
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Is one of these yours? Check out the latest items turned in to lost & found.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/submit">
                  Report a Found Item <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
              {dummyFoundItems.slice(0, 4).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
