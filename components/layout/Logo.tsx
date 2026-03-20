import { Zap } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = '/', className = '' }: LogoProps) {
  return (
    <Link href={href} className={`flex items-center group cursor-pointer ${className}`}>
      <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
        <Zap className="h-6 w-6 text-white" />
      </div>
      <span className="ml-3 text-2xl font-black text-gray-900 tracking-tighter uppercase italic">
        ApexWhips
      </span>
    </Link>
  );
}
