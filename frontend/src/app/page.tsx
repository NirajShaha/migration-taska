'use client';

import React, { useState } from 'react';
import VariantForm from '@/components/VariantForm';
import TypeForm from '@/components/TypeForm';

type Tab = 'variant' | 'type';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('variant');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: '#003366', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>WVTA CoC Management System</h1>
        <p>Certificate of Conformity Content Management</p>
      </header>

      <nav style={{ backgroundColor: '#0056b3', padding: '10px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setActiveTab('variant')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'variant' ? '#003d82' : 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Variant Management (HA003U)
        </button>
        <button
          onClick={() => setActiveTab('type')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'type' ? '#003d82' : 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Type Approval (HA003U)
        </button>
      </nav>

      <div style={{ padding: '20px' }}>
        {activeTab === 'variant' && <VariantForm />}
        {activeTab === 'type' && <TypeForm />}
      </div>

      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <p>© 2024 WVTA CoC Management System v1.0.0</p>
        <p>Migrated from TELON/COBOL HA003U Screen</p>
      </footer>
    </main>
  );
}
