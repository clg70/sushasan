'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

export const description = 'A multiple bar chart';

const chartConfig = {
  desktop: {
    label: 'Transaction',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function BarGraph() {
  const { user, isLoading } = useUser();
  if (isLoading) return <div>Loading..</div>;

  const structureData = () => {
    const schema = [
      { month: 'Jan', amount: 0 },
      { month: 'Feb', amount: 0 },
      { month: 'Mar', amount: 0 },
      { month: 'Apr', amount: 0 },
      { month: 'May', amount: 0 },
      { month: 'Jun', amount: 0 },
      { month: 'Jul', amount: 0 },
      { month: 'Aug', amount: 0 },
      { month: 'Sep', amount: 0 },
      { month: 'Oct', amount: 0 },
      { month: 'Nov', amount: 0 },
      { month: 'Dec', amount: 0 },
    ];

    let temp: Transaction[] = [];
    user?.transactions.map((transaction) => {
      temp.push(transaction[1]);
    });

    temp.forEach((transaction) => {
      const transactionMonth = new Date(transaction.date).toLocaleDateString(
        'default',
        {
          month: 'short',
        },
      );

      schema.forEach((m) => {
        if (m.month === transactionMonth) {
          m.amount += Number(transaction.amount);
        }
      });
    });

    return schema;
  };

  const data = structureData();

  return (
    <Card >
      <CardHeader>
        <CardTitle>Bar Chart - Monthly Transactions</CardTitle>
        <CardDescription>
          Showing transactions for each month in 2024.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-56" config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total transactions for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
