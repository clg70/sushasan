import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import FormError from '@/components/user/FormError';
import { Button } from '@/components/ui/button';
import backend from '@/declarations/export';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { useEffect } from 'react';
import { canisterId, idlFactory } from '@/declarations/backend';

const schema = z.object({
  userid: z.string().min(1, {
    message: 'User ID is required!',
  }),
  password: z.string().min(1, {
    message: 'Password is required!',
  }),
});

type formField = z.infer<typeof schema>;
const Login: React.FC = () => {
  const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
  let host = 'http://127.0.0.1:4943';
  useEffect(() => {
    const initializeActor = async () => {
      try {
        // Fetch the root key for local development
        if (host === 'http://127.0.0.1:4943') {
          await agent.fetchRootKey();
        }

        const actor = Actor.createActor(idlFactory, {
          agent,
          canisterId,
        });

        const user = await actor.getCurrentBudget(
          String(new Date().getFullYear()),
        );
        console.log('Current Budget:', user);
      } catch (error) {
        console.error('Error initializing actor:', error);
      }
    };

    initializeActor();
  }, []);
  const [_, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: formField) => {
    try {
      const token = await backend.login(formData.userid, formData.password);

      if (token == String(404)) {
        return setError('root', { message: "User doesn't exists!" });
      }
      setCookie('token', token);
      navigate('/account');
    } catch (e) {
      setError('root', { message: 'Something went wrong!' });
    }
  };
  return (
    <div className="flex flex-col  w-screen h-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {errors.root && errors.root.message && (
          <FormError text={errors.root.message} />
        )}
        <Input placeholder="User ID" {...register('userid')} />
        {errors.userid && errors.userid.message && (
          <FormError text={errors.userid.message} />
        )}
        <Input placeholder="Password" {...register('password')} />
        {errors.password && errors.password.message && (
          <FormError text={errors.password.message} />
        )}
        <Button disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
