import { Section } from '@/components/user/Account';
import { Nav } from '@/components/user/Account/Dashboard';

const Account: React.FC = () => {
  return (
    <div className="w-screen h-screen flex  bg-slate-50 p-12">
      <Nav selected="dashboard" />
      <Section />
    </div>
  );
};

export default Account;
