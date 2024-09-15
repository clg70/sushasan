import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import backend from '@/declarations/export';
import useAuth from '@/hooks/useAuth';
import SelectProvince from './Select';

const Allocate: React.FC = () => {
  const { cookie } = useAuth();
  const [selected, setSelected] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [accountId, setAccountID] = useState<string>('');

  const handleAdd = async () => {
    setLoading(true);
    try {
      const response = await backend.perFormTransaction(
        String(cookie.token),
        accountId,
        BigInt(amount),
        'Budget Allocation',
        String(new Date().getFullYear()),
        String(new Date()),
        String(Math.random() * 1000),
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-12 mb-12">
      <div className="flex flex-col gap-3 w-96">
        <p>Allocate</p>
        <div className="w-72 flex flex-col gap-3">
          <Input
            placeholder="Account No."
            value={accountId}
            onChange={(e) => setAccountID(e.target.value)}
          />

          <Input
            placeholder="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          {/* <SelectProvince onSelect={onSelect} /> */}

          <Button disabled={isLoading} onClick={handleAdd}>
            {isLoading ? '...' : 'Allocate'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Allocate;
