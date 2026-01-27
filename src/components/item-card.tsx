import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CalendarDays, Sparkles } from 'lucide-react';
import type { FoundItem } from '@/lib/definitions';
import { formatDate } from '@/lib/utils';
import type { SuggestPotentialMatchesOutput } from '@/ai/flows/suggest-potential-matches';

interface ItemCardProps {
  item: FoundItem;
  match?: SuggestPotentialMatchesOutput;
}

export function ItemCard({ item, match }: ItemCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        {match && match.isMatch && (
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="bg-accent/80 text-accent-foreground">
              <Sparkles className="mr-2 h-4 w-4" />
              Potential Match
            </Badge>
            <span className="text-xs font-semibold text-accent-foreground">
              {Math.round(match.matchConfidence * 100)}% Match
            </span>
          </div>
        )}
        <CardTitle className="font-headline">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative aspect-video w-full mb-4">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="rounded-md object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={item.imageHint}
          />
        </div>
        {match && match.isMatch && (
            <p className="text-sm text-muted-foreground p-3 bg-accent/20 rounded-md">
                <span className="font-semibold text-foreground">AI Reason:</span> {match.reason}
            </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>{formatDate(item.dateFound)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
