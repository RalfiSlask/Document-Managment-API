import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginScreen from './components/pages/login/LoginScreen.tsx';
import DocumentsScreen from './components/pages/documents/start/DocumentsScreen.tsx';
import './styles/index.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext.tsx';
import { DocumentsProvider } from './context/DocumentsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginProvider>
      <DocumentsProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/documents" element={<DocumentsScreen />} />
          </Routes>
        </HashRouter>
      </DocumentsProvider>
    </LoginProvider>
  </React.StrictMode>
);
