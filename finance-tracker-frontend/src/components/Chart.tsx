import type { FC } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface ChartProps {
  totalIncome: number;
  totalExpense: number;
}

export const Chart: FC<ChartProps> = ({ totalIncome, totalExpense }) => {
  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const COLORS = ["#00a63e", "#fb2c36"];

  return (
    <PieChart height={240} width={320}>
      <Pie
        data={data}
        cx={"50%"}
        cy={"50%"}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
};
