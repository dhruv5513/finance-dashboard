import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByMonth } from "../../utils/helpers";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        backgroundColor: darkMode ? "#1e1e2e" : "white",
        border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
        borderRadius: 2,
        p: 1,
        minWidth: 120,
        maxWidth: 140,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}>
        <Typography sx={{
          fontSize: 11, fontWeight: 700, mb: 0.5,
          color: darkMode ? "#fff" : "#333",
          borderBottom: `1px solid ${darkMode ? "#333" : "#eee"}`,
          pb: 0.4,
        }}>
          {label}
        </Typography>
        {payload.map((entry) => (
          <Box key={entry.name} sx={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", gap: 1, mb: 0.2,
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: entry.color, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 10, color: darkMode ? "#aaa" : "#666" }}>
                {entry.name}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: entry.color }}>
              ₹{(entry.value / 1000).toFixed(1)}k
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export default function BalanceTrendChart() {
  const { transactions, darkMode } = useApp();

  const grouped = groupByMonth(transactions);
  const chartData = Object.entries(grouped).map(([month, values]) => ({
    month: month.split(" ")[0].slice(0, 3),
    Income: values.income,
    Expense: values.expense,
    Balance: values.income - values.expense,
  }));

  return (
    <Card elevation={0} sx={{
      borderRadius: 3,
      background: darkMode ? "rgba(30,30,46,0.8)" : "rgba(255,255,255,0.8)",
      border: `1px solid ${darkMode ? "#2a2a3e" : "#f0f0f0"}`,
      mb: 2,
      height: "100%",
    }}>
      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography fontWeight="bold" mb={2}
          sx={{ color: darkMode ? "#fff" : "#333", fontSize: { xs: 14, md: 17 } }}>
          📈 Balance Trend
        </Typography>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#2a2a3e" : "#f0f0f0"} />
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#aaa" : "#666", fontSize: 10 }}
              axisLine={{ stroke: darkMode ? "#333" : "#e0e0e0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: darkMode ? "#aaa" : "#666", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              width={35}
            />
            <Tooltip
              content={<CustomTooltip darkMode={darkMode} />}
              allowEscapeViewBox={{ x: false, y: true }}
              position={{ y: 0 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area type="monotone" dataKey="Income" stroke="#2e7d32" strokeWidth={2} fill="url(#colorIncome)" dot={{ r: 3, fill: "#2e7d32" }} activeDot={{ r: 4 }} />
            <Area type="monotone" dataKey="Expense" stroke="#d32f2f" strokeWidth={2} fill="url(#colorExpense)" dot={{ r: 3, fill: "#d32f2f" }} activeDot={{ r: 4 }} />
            <Area type="monotone" dataKey="Balance" stroke="#1976d2" strokeWidth={2} fill="url(#colorBalance)" dot={{ r: 3, fill: "#1976d2" }} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}