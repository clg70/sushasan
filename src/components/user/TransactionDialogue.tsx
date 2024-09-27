import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tran } from './Admin/Transactions';

const TransactionDialogue: React.FC<{
  transaction: Tran;
  open: boolean;
  onClose: () => void;
}> = ({ transaction, open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction ID - {transaction.id}</DialogTitle>
          <DialogDescription>
            You can see the transactions details here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-12">
          <ul>
            <li>ID</li>
            <li>From</li>
            <li>To</li>
            <li>Amount</li>
            <li>Purpose</li>
            <li>Date</li>
          </ul>
          <ul>
            <li>{transaction.id}</li>
            <li>
              {transaction.from.name}({transaction.from.id})
            </li>
            <li>
              {transaction.to.name}({transaction.to.id})
            </li>
            <li>Rs. {transaction.amount}</li>
            <li>{transaction.purpose}</li>
            <li>{transaction.date}</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialogue;
