'use client';

import React from 'react';
import UnifiedCoCAForm from '@/components/UnifiedCoCAForm';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: '#003366', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>WVTA CoC Management System</h1>
        <p>Certificate of Conformity Content Management - Unified Form (HA003U)</p>
      </header>

      <div style={{ padding: '0' }}>
        <UnifiedCoCAForm />
      </div>

      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <p>© 2024 WVTA CoC Management System v1.0.0</p>
        <p>Migrated from TELON/COBOL HA003U Screen</p>
      </footer>
    </main>
  );
}
