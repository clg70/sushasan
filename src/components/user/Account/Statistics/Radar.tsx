'use client';

import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useUser } from '@/Providers/UserContext';
import { Transaction } from '@/declarations/backend/backend.did';

export const description = 'A radar chart';

// Configuring chart labels and colors
const chartConfig = {
  transaction: {
    label: 'Transactions',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const RadarCharts = () => {
  const { user } = useUser();

  // Structuring the data from user transactions for the radar chart
  const structureData = () => {
    let chartD: { month: string; amount: number }[] = [];

    user?.transactions.forEach((temp) => {
      const transaction: Transaction = temp[1];

      // Extract month from the transaction date (assuming you have a date field)
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.toLocaleString('default', {
        month: 'long',
      });

      // Find if there's already an entry for this month
      const existingMonth = chartD.find((item) => item.month === month);

      if (existingMonth) {
        existingMonth.amount += Number(transaction.amount);
      } else {
        chartD.push({
          month,
          amount: Number(transaction.amount),
        });
      }
    });

    return chartD;
  };

  const data = structureData();

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Transactions Over Time</CardTitle>
        <CardDescription>
          Showing total transaction amounts for each month
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="amount" // Use the structured transaction amount
              fill="var(--chart-1)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by N/A% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Showing transaction data by month
        </div>
      </CardFooter>
    </Card>
  );
};

export default RadarCharts;
