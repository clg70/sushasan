import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { idlFactory, canisterId } from './declarations/backend';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './Providers/UserContext';
import BudgetContextProvider from './Providers/BudgetContext';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AgentProvider withProcessEnv>
        <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
          <BrowserRouter>
            <UserContextProvider>
              <BudgetContextProvider>
                <App />
              </BudgetContextProvider>
            </UserContextProvider>
          </BrowserRouter>
        </ActorProvider>
      </AgentProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
