import { useUser } from '@/Providers/UserContext';
import TransactionTable from '../../Admin/Transactions';
import { Transaction } from '@/declarations/backend/backend.did';
const Section: React.FC = () => {
  const { isLoading, user } = useUser();

  if (isLoading) return <div>Loading...</div>;

  const filterTransaction = () => {
    let transactions: Transaction[] = [];
    user?.transactions.map((transaction) => {
      transactions.push(transaction[1]);
    });
    return transactions;
  };

  const transactions = filterTransaction();
  return (
    <div className="w-full bg-white rounded-lg px-12 py-6">
      <h1 className="font-bold text-xl">All Transactions:</h1>
      <TransactionTable
        allTransactions={
          transactions.length == 0 ? [transactions[0]] : transactions
        }
      />
    </div>
  );
};

export default Section;
