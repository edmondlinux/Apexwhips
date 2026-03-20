import { Zap } from 'lucide-react';

interface FooterProps {
  variant?: 'full' | 'compact' | 'town';
  townName?: string;
}

export function Footer({ variant = 'compact', townName }: FooterProps) {
  if (variant === 'full') {
    return (
      <footer className="bg-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center group mb-8">
                <div className="bg-orange-500 p-2 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-black tracking-tighter uppercase italic">
                  ApexWhips
                </span>
              </div>
              <p className="text-gray-400 font-medium max-w-sm">
                The UK&apos;s #1 supplier of SmartWhip, FastGas, and Cream Deluxe.
                Premium food-grade N2O for professional culinary results.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-4 text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
              <p>© 2026 APEXWHIPS INTERNATIONAL</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'town') {
    return (
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="ml-2 text-sm font-black text-gray-900 uppercase tracking-tighter italic">
              ApexWhips
            </span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
            © 2026 APEXWHIPS {townName ? `${townName.toUpperCase()} HUB` : 'INTERNATIONAL'}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
          © 2026 APEXWHIPS INTERNATIONAL
        </p>
      </div>
    </footer>
  );
}
