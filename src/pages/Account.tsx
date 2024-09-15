import {
  AddBudget,
  Allocate,
  Budget,
  Transactions,
} from '@/components/user/Admin';

import {
  Balance,
  Allocate as AllocateDepartmental,
} from '@/components/user/Dept';
import useAuth from '@/hooks/useAuth';
import { useUser } from '@/Providers/UserContext';

const Account: React.FC = () => {
  useAuth();
  const { isLoading, user } = useUser();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {user?.role == 'admin' && (
        <div>
          <AddBudget />
          <Budget />
          <Allocate />
          <Transactions />
        </div>
      )}
      {user?.role == 'dept' && (
        <div>
          <div className="pl-12 pt-12">Account No. {user.id}</div>
          <Balance />
          <AllocateDepartmental />
          <Transactions />
        </div>
      )}
    </div>
  );
};

export default Account;
