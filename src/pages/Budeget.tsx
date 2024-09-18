import { Section } from '@/components/user/Account/Budget';
import { Nav } from '@/components/user/Account/Dashboard';

const Budget: React.FC = () => {
  return (
    <div className="w-screen h-screen flex  bg-slate-50 p-12">
      <Nav />
      <Section />
    </div>
  );
};

export default Budget;
