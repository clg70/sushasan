import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useBudget } from '@/Providers/BudgetContext';
import backend from '@/declarations/export';
import { Card } from '../Dashboard';
import TransactionFlow from '../../TransactionFlow';
import { useUser } from '@/Providers/UserContext';
const Section: React.FC = () => {
  const { cookie } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { refetch, budget } = useBudget();
  const { user } = useUser();
  const handleAdd = async () => {
    setLoading(true);
    try {
      const response = await backend.addBudget(
        String(cookie.token),
        String(new Date().getFullYear()),
        BigInt(amount),
        String(new Date()),
      );
      if (response == '404') {
        alert('Something went wrong!');
        refetch();
      } else {
        setAmount(0);
        window.location.reload();
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg px-12 py-6">
      <h1 className="font-bold text-slate-900 text-xl pl-2">
        {budget && <div>{`Budget ${new Date().getFullYear()}`}</div>}
      </h1>
      {budget ? (
        <div className="mt-6 flex gap-6">
          <Card
            title="Current Budget"
            body={`Rs. ${budget.remAmt}`}
            footer={`Initial Budget - ${budget.totalAmt}`}
          />
          <Card
            title="Allocated Budget"
            body={`Rs. ${budget.totalAmt - budget.remAmt}`}
            footer={`In Percentage - ${
              ((Number(budget.totalAmt) - Number(budget.remAmt)) /
                Number(budget.totalAmt)) *
              100
            }%`}
          />
          <Card
            title="Unallocated Budget"
            body={`Rs. ${budget.remAmt}`}
            footer={`In Percentage - ${
              (Number(budget.remAmt) / Number(budget.totalAmt)) * 100
            }%`}
          />
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-xl">
            Initialize Budget for {new Date().getFullYear()}
          </h1>
          <div className="flex gap-6 w-96 mt-6">
            <Input
              placeholder="Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button disabled={isLoading} onClick={handleAdd}>
              {isLoading ? '...' : 'Initialize'}
            </Button>
          </div>
        </div>
      )}
      {user?.role == 'admin' && (
        <div>
          <TransactionFlow />
        </div>
      )}
    </div>
  );
};

export default Section;
