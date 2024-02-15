import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './components/pages/login/LoginScreen.tsx';
import DocumentsScreen from './components/pages/documents/DocumentsScreen.tsx';
import './styles/index.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/documents" element={<DocumentsScreen />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
