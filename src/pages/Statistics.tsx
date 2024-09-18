import { Nav } from '@/components/user/Account/Dashboard';
import { Section } from '@/components/user/Account/Statistics';

const Statistics: React.FC = () => {
  return (
    <div className="w-screen h-screen flex  bg-slate-50 p-12">
      <Nav />
      <Section />
    </div>
  );
};

export default Statistics;
