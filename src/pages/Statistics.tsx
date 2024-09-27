import { Nav } from '@/components/user/Account/Dashboard';
import { Section } from '@/components/user/Account/Statistics';

const Statistics: React.FC = () => {
  return (
    <div className="w-screen h-screen flex bg-primary p-12">
      <Nav selected="stats" />
      <Section />
    </div>
  );
};

export default Statistics;
