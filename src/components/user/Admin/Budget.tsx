import { useBudget } from '@/Providers/BudgetContext';

const Budget: React.FC = () => {
  const { budget, isLoading } = useBudget();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="pl-12">
      <h2 className="font-bold text-xl">Budget</h2>
      <div className='flex gap-12' >
        <ul>
          <li>Current Amount</li>
          <li>Total Amount</li>
          <li>Fiscal Year</li>
        </ul>
        <ul>
          <li>{Number(budget?.remAmt)}</li>
          <li>{Number(budget?.totalAmt)}</li>
          <li>{budget?.fiscalYear}</li>
        </ul>
      </div>
    </div>
  );
};

export default Budget;
