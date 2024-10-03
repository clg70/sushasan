import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction } from '@/declarations/backend/backend.did';
import { useUser } from '@/Providers/UserContext';
import TransactionDialogue from '../TransactionDialogue';
import { useEffect, useState } from 'react';

export type Tran = {
  id: string;
  from: {
    name: string;
    id: string;
  };
  to: {
    name: string;
    id: string;
  };
  date: string;
  amount: number;
  purpose: string;
};

const Transactions: React.FC<{ allTransactions: Transaction[] }> = ({
  allTransactions,
}) => {
  const { user } = useUser();
  const [selectedTransaction, selectTransaction] = useState<Tran>({
    amount: 0,
    date: '',
    from: {
      name: '',
      id: '',
    },
    id: '',
    purpose: '',
    to: {
      id: '',
      name: '',
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const onClick = (transaction: Transaction) => {
    selectTransaction({
      amount: Number(transaction.amount),
      id: transaction.id,
      date: transaction.date,
      from: {
        name: transaction.from.name,
        id: transaction.from.id,
      },
      to: {
        name: transaction.to.name,
        id: transaction.to.id,
      },
      purpose: transaction.purpose,
    });
    setOpen(true);
  };
  const totaltAllTransaction = ()=>{
    let total = 0;
    try{
allTransactions.forEach((transaction) => {
      total += Number(transaction.amount);
    });
    }catch(e){
      console.log(e);
    }
    
    return total;
  }

  const totalTransaction = totaltAllTransaction();
  if (allTransactions.length > 0)
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] relative right-2">TransactionID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTransactions[0] && (
            <>
              {allTransactions.map((transaction) => {
                return (
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => onClick(transaction)}
                  >
                    <TableCell className="font-medium">
                      {transaction?.id}
                    </TableCell>
                    <TableCell>
                      {transaction?.from.name == user?.name
                        ? 'You'
                        : transaction?.from.name}
                    </TableCell>
                    <TableCell>
                      {transaction?.to.name == user?.name
                        ? 'You'
                        : transaction?.to.name}
                    </TableCell>

                    <TableCell className="text-right">
                      Rs. {Number(transaction.amount)}
                    </TableCell>
                    
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell className="text-right font-bold">Total</TableCell>
                <TableCell className="text-right">Rs. {totalTransaction}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>

        <TransactionDialogue
          open={open}
          transaction={selectedTransaction}
          onClose={() => setOpen(!open)}
        />
      </Table>
    );
};

export default Transactions;
