import { useUser } from '@/Providers/UserContext';
import TransactionTable from '../../Admin/Transactions';
import { Transaction } from '@/declarations/backend/backend.did';
import { Button } from '@/components/ui/button';
import { ImStatsDots } from 'react-icons/im';
import { useState } from 'react';
import { AreaChartComponent } from '../Statistics/AreaChart';
import PopUpDialogue from '../../Dialogue';
const Section: React.FC = () => {
  const { isLoading, user } = useUser();
  const [isStatsOpen, openStats] = useState<boolean>(false);
  const [selectedMode, setMode] = useState<string>('month');
  if (isLoading) return <div>Loading...</div>;

  const filterTransaction = () => {
    let transactions: Transaction[] = [];
    user?.transactions.map((transaction) => {
      transactions.push(transaction[1]);
    });
    return transactions;
  };

  const toggleStats = () => {
    openStats(!isStatsOpen);
  };

  const transactions = filterTransaction();
  return (
    <div className="w-full bg-white rounded-lg px-12 py-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">All Transactions:</h1>
        <Button className="flex gap-3" onClick={toggleStats}>
          <ImStatsDots />
          See Stats
        </Button>
      </div>

      <TransactionTable
        allTransactions={
          transactions.length == 0 ? [transactions[0]] : transactions
        }
      />
      <PopUpDialogue
        open={isStatsOpen}
        onClose={toggleStats}
        title="Transactions Data Visualization."
        description="See your transactions visualized here."
        body={
          <div className="flex flex-col gap-3">
            <SelectMode onChange={(value) => setMode(value)} />
            {selectedMode == 'month' ? <AreaChartComponent /> : <BarGraph />}
          </div>
        }
      />
    </div>
  );
};

export default Section;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarGraph } from '../Statistics/BarGraph';

const SelectMode: React.FC<{
  onChange: (value: string) => void;
}> = ({ onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Month's" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="month">Month's</SelectItem>
        <SelectItem value="year">Year's</SelectItem>
      </SelectContent>
    </Select>
  );
};
