import { createContext, useContext, useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTx) => {
    setTransactions(prev => [...prev, { ...newTx, id: Date.now() }]);
  };

  const editTransaction = (id, updatedTx) => {
    setTransactions(prev =>
      prev.map(tx => tx.id === id ? { ...tx, ...updatedTx } : tx)
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === "all" || tx.type === filter;
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tx.category === selectedCategory;
    const matchesDateFrom = !dateFrom || tx.date >= dateFrom;
    const matchesDateTo = !dateTo || tx.date <= dateTo;
    const matchesAmountMin = !amountMin || tx.amount >= Number(amountMin);
    const matchesAmountMax = !amountMax || tx.amount <= Number(amountMax);

    return (
      matchesFilter &&
      matchesSearch &&
      matchesCategory &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesAmountMin &&
      matchesAmountMax
    );
  });

  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const resetFilters = () => {
    setFilter("all");
    setSearchQuery("");
    setSelectedCategory("all");
    setDateFrom("");
    setDateTo("");
    setAmountMin("");
    setAmountMax("");
  };

  return (
    <AppContext.Provider value={{
      transactions,
      filteredTransactions,
      role, setRole,
      filter, setFilter,
      searchQuery, setSearchQuery,
      darkMode, setDarkMode,
      selectedCategory, setSelectedCategory,
      dateFrom, setDateFrom,
      dateTo, setDateTo,
      amountMin, setAmountMin,
      amountMax, setAmountMax,
      resetFilters,
      addTransaction,
      editTransaction,
      deleteTransaction,
      totalIncome,
      totalExpense,
      totalBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);