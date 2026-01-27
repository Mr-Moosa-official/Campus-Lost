import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { SubmitItemForm } from '@/components/forms/submit-item-form';

export default function SubmitPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-2 text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Report a Found Item
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Thank you for helping our community. Please fill out the details
                below.
              </p>
            </div>
            <SubmitItemForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
