'use server';

/**
 * @fileOverview A Genkit flow to suggest potential matches for lost items based on descriptions and locations.
 *
 * - suggestPotentialMatches - A function that suggests potential matches for a lost item.
 * - SuggestPotentialMatchesInput - The input type for the suggestPotentialMatches function.
 * - SuggestPotentialMatchesOutput - The return type for the suggestPotentialMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPotentialMatchesInputSchema = z.object({
  lostItemDescription: z
    .string()
    .describe('The description of the lost item.'),
  lostItemLocation: z.string().describe('The location where the item was lost.'),
  foundItemDescription: z
    .string()
    .describe('The description of the found item.'),
  foundItemLocation: z.string().describe('The location where the item was found.'),
});
export type SuggestPotentialMatchesInput = z.infer<
  typeof SuggestPotentialMatchesInputSchema
>;

const SuggestPotentialMatchesOutputSchema = z.object({
  isMatch: z
    .boolean()
    .describe(
      'Whether the found item is a potential match for the lost item.'
    ),
  matchConfidence: z
    .number()
    .describe(
      'A number between 0 and 1 indicating the confidence level of the match.'
    ),
  reason: z
    .string()
    .describe('The reasoning behind the match determination.'),
});
export type SuggestPotentialMatchesOutput = z.infer<
  typeof SuggestPotentialMatchesOutputSchema
>;

export async function suggestPotentialMatches(
  input: SuggestPotentialMatchesInput
): Promise<SuggestPotentialMatchesOutput> {
  return suggestPotentialMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPotentialMatchesPrompt',
  input: {schema: SuggestPotentialMatchesInputSchema},
  output: {schema: SuggestPotentialMatchesOutputSchema},
  prompt: `You are an AI assistant helping to match lost items with found items.

You will be given a description and location of a lost item, and a description and location of a found item.  You will determine if the found item is a potential match for the lost item, and the confidence level of the match (0 to 1).

Lost Item Description: {{{lostItemDescription}}}
Lost Item Location: {{{lostItemLocation}}}
Found Item Description: {{{foundItemDescription}}}
Found Item Location: {{{foundItemLocation}}}

Consider the similarity of the descriptions and the proximity of the locations when determining if it is a match.  Also, return the reasoning behind your decision.`,
});

const suggestPotentialMatchesFlow = ai.defineFlow(
  {
    name: 'suggestPotentialMatchesFlow',
    inputSchema: SuggestPotentialMatchesInputSchema,
    outputSchema: SuggestPotentialMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
