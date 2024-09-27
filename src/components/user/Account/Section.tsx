import { Button } from '@/components/ui/button';
import { Card } from './Dashboard';

import { useUser } from '@/Providers/UserContext';
import { useBudget } from '@/Providers/BudgetContext';
import { Transactions } from '../Admin';
import TransferFundsDialog from './TransferFunds';
import { Transaction } from '@/declarations/backend/backend.did';

const Section: React.FC = () => {
  const { user, isLoading } = useUser();
  const { budget, isLoading: Loading } = useBudget();
  if (isLoading && Loading) return <div>Loading..</div>;

  const filterTransaction = () => {
    let transactions: Transaction[] = [];
    user?.transactions.map((transaction) => {
      transactions.push(transaction[1]);
    });
    return transactions;
  };

  const transactions = filterTransaction();

  return (
    <div className="w-full bg-white rounded-lg">
      {/* Head */}
      <div className="px-12 pt-12 pb-6 flex justify-between items-center">
        <div>
          <p className="font-black text-slate-900 text-2xl">Dashboard</p>
        </div>
        <div className="flex gap-6">
          <TransferFundsDialog />
          <Button variant="outline">Logout</Button>
        </div>
      </div>

      {/* Balance Info */}
      <div className="px-12 grid ">
        <div className="flex gap-3 justify-between">
          <Card
            title="Current Balance"
            body={`Rs.${user?.balance}`}
            footer={`Intial Balance : Rs.  ${budget?.totalAmt}`}
          />
          <Card
            title="Total Tax Collected"
            body="Rs. 1567892"
            footer="Today Collection : Rs. 54546"
          />

          <Card
            title="Recent Transaction"
            body={
              user?.transactions && user.transactions.length > 0
                ? Number(
                    user.transactions[user.transactions.length - 1][1].amount,
                  )
                : 'N/A'
            }
            footer={
              user?.transactions && user.transactions.length > 0
                ? `With ${
                    user.transactions[user.transactions.length - 1][1].from.name
                  }`
                : 'N/A'
            }
          />
        </div>
      </div>
      <div className="p-12">
        <p className="pl-2 font-bold text-xl">Recent Transactions</p>
        <Transactions
          allTransactions={[
            transactions[transactions.length - 1],
          ]}
        />
      </div>
    </div>
  );
};

export default Section;
