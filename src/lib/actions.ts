'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
    name: z.string().min(3, 'Item name must be at least 3 characters.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    location: z.string().min(3, 'Location must be at least 3 characters.'),
    contact: z.string().email('Please enter a valid email address.'),
    imageUrl: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
});

type State = {
    message: string;
    success: boolean;
};

export async function createItem(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = formSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        location: formData.g