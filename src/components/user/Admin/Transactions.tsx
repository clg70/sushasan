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

const Transactions: React.FC<{ allTransactions: Transaction[] }> = ({
  allTransactions,
}) => {
  const { user } = useUser();
  if (allTransactions.length > 0)
    return (
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
          {allTransactions[0] && (
            <>
              {allTransactions.map((transaction) => {
                return (
                  <TableRow>
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
                      {Number(transaction?.amount)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    );
};

export default Transactions;
