export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getMonthName = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export const groupByMonth = (transactions) => {
  return transactions.reduce((acc, tx) => {
    const month = getMonthName(tx.date);
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (tx.type === "income") acc[month].income += tx.amount;
    else acc[month].expense += tx.amount;
    return acc;
  }, {});
};

export const groupByCategory = (transactions) => {
  return transactions
    .filter(tx => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});
};

export const getHighestCategory = (transactions) => {
  const grouped = groupByCategory(transactions);
  return Object.entries(grouped).sort((a, b) => b[1] - a[1])[0];
};