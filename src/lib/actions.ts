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
        location: formData.get('location'),
        contact: formData.get('contact'),
        imageUrl: formData.get('imageUrl'),
    });

    if (!validatedFields.success) {
        const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
        return {
            message: firstError || 'Invalid data. Please check the form.',
            success: false,
        };
    }

    // Here you would typically save the data to a database.
    // For now, we'll just log it to the console.
    console.log('New item submitted:', validatedFields.data);

    // In a real app, you would add the new item to your data source.
    // e.g., await db.insert(validatedFields.data);
    // Then revalidate the path to show the new item.
    revalidatePath('/');
    revalidatePath('/search');

    return {
        message: `Successfully submitted "${validatedFields.data.name}". Thank you!`,
        success: true,
    };
}
