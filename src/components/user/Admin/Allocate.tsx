import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectDepartments from '../Select';
import { useState } from 'react';
import backend from '@/declarations/export';
import useAuth from '@/hooks/useAuth';

const Allocate: React.FC = () => {
  const { cookie } = useAuth();
  const [selected, setSelected] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [accountid, setAccountid] = useState<string>('');
  const onSelect = (id: string) => {
    setSelected(id);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const response = await backend.allocateBudget(
        String(cookie.token),
        accountid,
        BigInt(amount),
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
    <div className="pl-12 mt-16 w-96">
      <div>
        <h2 className="font-bold text-xl">Allocate</h2>
      </div>
      <div className="flex flex-col gap-6 mt-3">
        {/* <SelectDepartments onSelect={onSelect} /> */}
        <Input
          placeholder="Account ID"
          value={accountid}
          onChange={(e) => setAccountid(e.target.value)}
        />
        <Input
          placeholder="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button disabled={isLoading} onClick={handleAdd}>
          {isLoading ? '...' : 'Allocate'}
        </Button>
      </div>
    </div>
  );
};

export default Allocate;
