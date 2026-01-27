'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchForm() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    const location = formData.get('location') as string;
    
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
    }
    if (location) {
      params.set('loc', location);
    }
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
      <Input
        type="text"
        name="query"
        placeholder="What did you lose? (e.g., 'blue backpack')"
        className="flex-grow bg-card"
      />
      <Input
        type="text"
        name="location"
        placeholder="Where did you lose it? (optional)"
        className="flex-grow bg-card sm:w-1/3"
      />
      <Button type="submit" className="w-full sm:w-auto">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}
