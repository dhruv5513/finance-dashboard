import { useApp } from "../context/AppContext";
import { groupByMonth, groupByCategory, getHighestCategory } from "../utils/helpers";

export default function useTransactions() {
  const {
    transactions,
    filteredTransactions,
    totalIncome,
    totalExpense,
    totalBalance,
  } = useApp();

  const monthlyData = groupByMonth(transactions);
  const categoryData = groupByCategory(transactions);
  const highestCategory = getHighestCategory(transactions);

  const monthlyArray = Object.entries(monthlyData).map(([month, values]) => ({
    month,
    ...values,
    balance: values.income - values.expense,
  }));

  return {
    transactions,
    filteredTransactions,
    totalIncome,
    totalExpense,
    totalBalance,
    monthlyData,
    monthlyArray,
    categoryData,
    highestCategory,
  };
}
