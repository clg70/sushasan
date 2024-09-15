import { useUser } from '@/Providers/UserContext';

const Balance: React.FC = () => {
  const { user, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-12">
      <div>
        <h2 className="text-slate-900">Current Balance</h2>
        <p className="font-black text-slate-900 text-4xl">
          Rs. {Number(user?.balance)}
        </p>
        <p>
          Initial balance :
          {user?.budgets[0] && Number(user?.budgets[0][1].totalAmt)}
        </p>
      </div>
    </div>
  );
};

export default Balance;
