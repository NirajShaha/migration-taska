import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthSessionProvider } from '@/components/AuthSessionProvider';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'WVTA CoC Management System',
  description: 'Certificate of Conformity Content Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <AuthSessionProvider>
        <TooltipProvider>
          <body>{children}</body>
        </TooltipProvider>
      </AuthSessionProvider>
    </html>
  );
}
