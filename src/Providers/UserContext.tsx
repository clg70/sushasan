import { User } from '@/declarations/backend/backend.did';
import backend from '@/declarations/export';
import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery, useQueryClient } from 'react-query';

interface ContextType {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [cookie] = useCookies(['token']);

  const fetchData = async () => {
    if (!cookie.token) return; // Avoid API call if no token is available

    try {
      const user = await backend.getUser(String(cookie.token));
      return user[0];
    } catch (e) {
      console.error('Error fetching user data:', e);
      throw new Error('Failed to fetch user data');
    }
  };

  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryFn: fetchData,
    queryKey: ['user'],
    enabled: !!cookie.token,
  });

  const refetch = () => {
    queryClient.invalidateQueries(['user']);
  };

  return (
    <UserContext.Provider value={{ user, isError, isLoading, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
