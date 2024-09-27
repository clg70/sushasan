'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
import { useEffect, useState } from 'react';
import { Transaction } from '@/declarations/backend/backend.did';

export const description = 'A stacked area chart';

const chartConfig = {
  desktop: {
    label: 'Transaction',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type ChartData = {
  month: string;
  amount: number;
};

export function AreaChartComponent() {
  const { isLoading, user } = useUser();
  const [data, setChartData] = useState<ChartData[]>([]);
  const [trend, setTrend] = useState<number>(0); // Store trend percentage
  const [isTrendingUp, setIsTrendingUp] = useState<boolean>(true); // For trending direction

  if (isLoading) return <div>Loading...</div>;

  const structureChartData = () => {
    let temp: Transaction[] = [];

    // Extract all transactions
    user?.transactions.forEach((transactions) => {
      temp.push(transactions[1]);
    });

    let temp2: ChartData[] = [];

    // Extract transaction month and filter based on current month
    temp.forEach((transaction) => {
      let transactionMonth = new Date(transaction.date).toLocaleDateString(
        'default',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      );

      let transactionMonthShort = new Date(transaction.date).toLocaleDateString(
        'default',
        {
          month: 'short',
        },
      );

      let currentMonth = new Date().toLocaleDateString('default', {
        month: 'short',
      });

      // Check if the transaction is in the current month
      if (currentMonth === transactionMonthShort) {
        temp2.push({
          amount: Number(transaction.amount),
          month: transactionMonth,
        });
      }
    });

    // Sort by date (ascending)
    temp2.sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
    );

    // Update chart data
    setChartData(temp2);

    // Trend Calculation (when we have at least two data points)
    if (temp2.length >= 2) {
      const lastMonthAmount = temp2[temp2.length - 1].amount;
      const prevMonthAmount = temp2[temp2.length - 2].amount;

      const trendValue =
        ((lastMonthAmount - prevMonthAmount) / prevMonthAmount) * 100;
      setTrend(Math.abs(trendValue));
      setIsTrendingUp(trendValue > 0);
    }
  };

  useEffect(() => {
    structureChartData();
  }, [user]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          Area Chart -{' '}
          {new Date().toLocaleDateString('default', {
            month: 'long',
          })}
          's Transactions
        </CardTitle>
        <CardDescription>
          Showing total transaction for this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-56" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              dataKey="amount"
              type="natural"
              fill="#236FBE"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {isTrendingUp ? (
                <>
                  Trending up by {trend.toFixed(2)}% this month{' '}
                  <TrendingUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Trending down by {trend.toFixed(2)}% this month{' '}
                  <TrendingDown className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {data.length > 0
                ? `${data[0].month} - ${data[data.length - 1].month}`
                : 'No data available'}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
