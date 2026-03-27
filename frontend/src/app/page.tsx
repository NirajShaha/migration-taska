'use client';

import React from 'react';
import UnifiedCoCAForm from '@/components/UnifiedCoCAForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Modern Header with Gradient */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">WVTA CoC Management</h1>
          <p className="text-xl md:text-2xl text-blue-100">Certificate of Conformity - Enhanced Management System</p>
          <p className="text-sm md:text-base text-blue-200 mt-2">Powered by React, Next.js & shadcn/ui</p>
        </div>
      </header>

      {/* Main Content */}
      <div>
        <UnifiedCoCAForm />
      </div>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-2">About</h3>
              <p className="text-sm">Modern web application for managing Certificate of Conformity data.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Version</h3>
              <p className="text-sm">v2.0.0 - Modernized UI with shadcn/ui</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">License</h3>
              <p className="text-sm">© 2024 WVTA System - All rights reserved</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>Migrated from TELON/COBOL HA003U Screen • Built with modern web technologies</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
