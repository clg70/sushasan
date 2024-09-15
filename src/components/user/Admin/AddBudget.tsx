import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import backend from '@/declarations/export';
import useAuth from '@/hooks/useAuth';
import { useBudget } from '@/Providers/BudgetContext';
import { useState } from 'react';

const AddBudget: React.FC = () => {
  const { cookie } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { refetch } = useBudget();
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
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-12">
      <div className="flex w-80 gap-3 flex-col">
        <p className="font-bold text-xl">Add Budget</p>
        <div className="flex gap-6">
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button disabled={isLoading} onClick={handleAdd}>
            {isLoading ? '...' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBudget;
