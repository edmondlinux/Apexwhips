import { Button } from '@/components/ui/button';
import { CircleIcon } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <CircleIcon className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">ACME</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              Welcome to <span className="text-orange-500">Your Simple App</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
              A clean and minimalist setup ready for your next big idea.
              No complex integrations, just pure potential.
            </p>
            <div className="mt-10">
              <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2026 ACME Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
