import { Nav } from '@/components/user/Account/Dashboard';
import { Section } from '@/components/user/Account/Transaction';

const Transactions: React.FC = () => {
  return (
    <div className="w-screen h-screen flex  bg-slate-50 p-12">
      <Nav selected="transactions" />
      <Section />
    </div>
  );
};

export default Transactions;
