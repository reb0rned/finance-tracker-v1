import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaMoneyBillWave,
  FaWallet,
  FaChartPie,
} from "react-icons/fa";
import { useLoaderData } from "react-router";
import { convertNumberToUSD } from "../helpers/currencyConvert.helper";

export const Home = () => {
  const { totalIncome, totalExpense } = useLoaderData();

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="p-6 space-y-6">
      <div className="text-white">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-white/60 mt-1">
          Here's a quick summary of your finances
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Income"
          icon={<FaMoneyBillWave className="text-green-400 w-6 h-6" />}
          value={`+ ${convertNumberToUSD(totalIncome)}`}
        />
        <StatCard
          title="Expense"
          icon={<FaWallet className="text-red-400 w-6 h-6" />}
          value={`- ${convertNumberToUSD(totalExpense)}`}
        />
        <StatCard
          title="Net Balance"
          icon={<FaChartPie className="text-blue-400 w-6 h-6" />}
          value={`${convertNumberToUSD(netBalance)}`}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <QuickAction
          title="Add Transaction"
          description="Track your income or expense"
          link="/transactions"
        />
        <QuickAction
          title="Manage Categories"
          description="Organize your spending"
          link="/categories"
        />
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-slate-800 rounded-xl p-4 text-white flex items-center gap-4 shadow hover:shadow-lg transition">
    <div className="p-3 bg-slate-700 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-white/60">{title}</p>
      <h2 className="text-lg font-bold">{value}</h2>
    </div>
  </div>
);

const QuickAction = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => (
  <Link
    to={link}
    className="flex-1 bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition text-white shadow group"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-white/50 text-sm">{description}</p>
      </div>
      <FaArrowRight className="text-white/30 group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);
