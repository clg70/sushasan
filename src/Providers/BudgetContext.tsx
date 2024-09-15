import { Budget } from '@/declarations/backend/backend.did';
import backend from '@/declarations/export';
import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery, useQueryClient } from 'react-query';

interface ContextType {
  budget: Budget | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const BudgetContext = createContext<ContextType | undefined>(undefined);

const BudgetContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [cookie] = useCookies(['token']);

  const fetchData = async () => {
    if (!cookie.token) return;

    try {
      const user = await backend.getCurrentBudget(
        String(new Date().getFullYear()),
      );
      return user[0];
    } catch (e) {
      console.error('Error fetching user data:', e);
      throw new Error('Failed to fetch user data');
    }
  };

  const {
    isLoading,
    isError,
    data: budget,
  } = useQuery({
    queryFn: fetchData,
    queryKey: ['budget'],
    enabled: !!cookie.token,
  });

  const refetch = () => {
    queryClient.invalidateQueries(['user']);
  };

  return (
    <BudgetContext.Provider value={{ budget, isError, isLoading, refetch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetContextProvider;

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
