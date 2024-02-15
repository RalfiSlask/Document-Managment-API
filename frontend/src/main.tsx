import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './components/pages/login/LoginScreen.tsx';
import DocumentsScreen from './components/pages/documents/DocumentsScreen.tsx';
import './styles/index.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext.tsx';
import { DocumentsProvider } from './context/DocumentsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <LoginProvider>
          <DocumentsProvider>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/documents" element={<DocumentsScreen />} />
          </DocumentsProvider>
        </LoginProvider>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
