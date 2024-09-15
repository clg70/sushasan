import backend from '@/declarations/export';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [cookie, _, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const verifyUser = async () => {
    if (!cookie.token) return navigate('/');
    try {
      const response = await backend.getUser(String(cookie.token));

      if (response == null || response.length == 0) {
        removeCookie('token');
        navigate('/');
      }
    } catch (e) {
      console.error('Authentication failed:', e);
      removeCookie('token');
      navigate('/'); // Redirect to login on error as well
    }
  };

  useEffect(() => {
    verifyUser();
  }, [cookie.token, navigate]);

  return { isAuthenticated: !!cookie.token, cookie };
};

export default useAuth;
