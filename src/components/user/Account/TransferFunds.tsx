import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import backend from '@/declarations/export';
import useAuth from '@/hooks/useAuth';
import { useUser } from '@/Providers/UserContext';

const TransferFundsDialog: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  const { cookie } = useAuth();
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [accountid, setAccountid] = useState<string>('');

  const handleAdd = async () => {
    setLoading(true);
    try {
      if (user?.role == 'admin') {
        await backend.allocateBudget(
          String(cookie.token),
          accountid,
          BigInt(amount),
          String(new Date().getFullYear()),
          String(new Date()),
          String(Math.random() * 1000),
        );
      } else {
        await backend.perFormTransaction(
          String(cookie.token),
          accountid,
          BigInt(amount),
          'Budeget Allocation',
          String(new Date().getFullYear()),
          String(new Date()),
          String(Math.random() * 1000),
        );
      }

      setAccountid('');
      setAmount(0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogTrigger>
        <Button>Transfer Funds</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tranfer Funds</DialogTitle>
          <DialogDescription>
            Type in the account number and amount.
          </DialogDescription>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Account No."
              onChange={(e) => setAccountid(e.target.value)}
              value={accountid}
            />
            <Input
              placeholder="Amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
            <Button disabled={isLoading} onClick={handleAdd}>
              {isLoading ? '...' : 'Transfer'}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TransferFundsDialog;
