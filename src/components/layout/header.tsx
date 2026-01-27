import Link from 'next/link';
import { Backpack, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Backpack className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">CampusLost</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-4">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/submit"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Report Found Item
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Search
          </Link>
        </nav>
        <div className="flex items-center justify-end">
          <Button asChild>
            <Link href="/submit">
              <Plus className="mr-2 h-4 w-4" /> Submit an Item
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
