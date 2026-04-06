import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByMonth } from "../../utils/helpers";

export default function BalanceTrendChart() {
  const { transactions, darkMode } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const grouped = groupByMonth(transactions);
  const chartData = Object.entries(grouped).map(([month, values]) => ({
    month: month.split(" ")[0].slice(0, 3),
    Income: values.income,
    Expense: values.expense,
    Balance: values.income - values.expense,
  }));

  const bg = darkMode ? "rgba(30,30,46,0.8)" : "rgba(255,255,255,0.8)";
  const border = darkMode ? "#2a2a3e" : "#f0f0f0";

  return (
    <Card elevation={0} sx={{
      borderRadius: 3,
      background: bg,
      border: `1px solid ${border}`,
      mb: 2,
      height: "100%",
    }}>
      <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography fontWeight="bold" mb={2}
          sx={{ color: darkMode ? "#fff" : "#333", fontSize: { xs: 14, md: 17 } }}>
          📈 Balance Trend
        </Typography>

        <ResponsiveContainer width="100%" height={isMobile ? 180 : 230}>
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
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
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#2a2a3e" : "#f0f0f0"}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? "#aaa" : "#666", fontSize: isMobile ? 9 : 11 }}
              axisLine={{ stroke: darkMode ? "#333" : "#e0e0e0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: darkMode ? "#aaa" : "#666", fontSize: isMobile ? 8 : 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              width={isMobile ? 30 : 38}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1e1e2e" : "white",
                border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
                borderRadius: 8,
                fontSize: 11,
                padding: "6px 10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              labelStyle={{
                color: darkMode ? "#fff" : "#333",
                fontWeight: 700,
                marginBottom: 4,
              }}
              itemStyle={{
                color: darkMode ? "#ccc" : "#555",
                fontSize: 10,
                padding: "1px 0",
              }}
              formatter={(value, name) => [`₹${(value / 1000).toFixed(1)}k`, name]}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{
                fontSize: isMobile ? 10 : 12,
                paddingTop: 8,
                color: darkMode ? "#ccc" : "#555",
              }}
            />
            <Area type="monotone" dataKey="Income" stroke="#2e7d32" strokeWidth={2} fill="url(#colorIncome)" dot={{ r: isMobile ? 2 : 3, fill: "#2e7d32" }} activeDot={{ r: isMobile ? 3 : 4 }} />
            <Area type="monotone" dataKey="Expense" stroke="#d32f2f" strokeWidth={2} fill="url(#colorExpense)" dot={{ r: isMobile ? 2 : 3, fill: "#d32f2f" }} activeDot={{ r: isMobile ? 3 : 4 }} />
            <Area type="monotone" dataKey="Balance" stroke="#1976d2" strokeWidth={2} fill="url(#colorBalance)" dot={{ r: isMobile ? 2 : 3, fill: "#1976d2" }} activeDot={{ r: isMobile ? 3 : 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}