'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart, Cell } from 'recharts'; // Import Cell for custom colors

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

export const description = 'A donut chart with text';

// Configuring chart labels and colors.
const chartConfig = {
  amount: {
    label: 'Total',
  },
} satisfies ChartConfig;

type Data = {
  name: string;
  amount: number;
  color: string;
};

// A list of colors for pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PieC: React.FC = () => {
  const { user } = useUser();

  // Structuring the data for the PieChart
  const structureData = (): Data[] => {
    let chartD: Data[] = [];

    user?.transactions.map((temp, index) => {
      const transaction: Transaction = temp[1];

      if (transaction.to.name !== user.name) {
        // Check if an entry for this recipient already exists
        const existingRecipient = chartD.find(
          (item) => item.name === transaction.to.name,
        );

        if (existingRecipient) {
          // Increment the amount for the existing recipient
          existingRecipient.amount += Number(transaction.amount);
        } else {
          // Assign different colors for each entity (cycling through COLORS array)
          chartD.push({
            name: transaction.to.name,
            amount: Number(transaction.amount),
            color: COLORS[index % COLORS.length], // Cycling through the COLORS array
          });
        }
      }
    });

    return chartD;
  };

  const data = structureData();
  const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Allocated Budgets Entities</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              strokeWidth={5}
            >
              {/* Apply the custom color to each pie segment */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-black"
                        >
                          Rs. {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Amount
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by N/A% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing transaction allocations for various entities
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieC;
