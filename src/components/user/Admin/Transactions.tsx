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
import { useEffect, useState } from 'react';

const Transactions: React.FC = () => {
  const { isLoading, user } = useUser();
  const [allTransactions, setTransactions] = useState<Transaction[]>([]);
  const filterTractions = () => {
    console.log(user?.transactions);
    let allTran: Transaction[] = [];
    user?.transactions.map((transaction) => {
      allTran.push(transaction[1]);
    });
    setTransactions(allTran);
  };

  useEffect(() => {
    filterTractions();
  }, []);

  if (isLoading) return <div>Loading..</div>;
  return (
    <div className="pl-12 mt-6 pr-12">
      <h2 className="font-bold">All Transactions :</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TransactionID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTransactions.map((transaction) => {
            return (
              <TableRow>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>
                  {transaction.from.name == user?.name
                    ? 'You'
                    : transaction.from.name}
                </TableCell>
                <TableCell>
                  {transaction.to.name == user?.name
                    ? 'You'
                    : transaction.to.name}
                </TableCell>

                <TableCell className="text-right">
                  {Number(transaction.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
