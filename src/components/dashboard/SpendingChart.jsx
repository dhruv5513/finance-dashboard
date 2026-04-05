import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByCategory, formatCurrency } from "../../utils/helpers";

const COLORS = [
  "#1976d2", "#f57c00", "#d32f2f",
  "#7b1fa2", "#0097a7", "#2e7d32"
];

export default function SpendingChart() {
  const { transactions, darkMode } = useApp();

  const grouped = groupByCategory(transactions);
  const chartData = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  if (chartData.length === 0) {
    return (
      <Card elevation={3} sx={{ borderRadius: 3, background: darkMode ? "#1e1e2e" : "white" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">🍩 Spending Breakdown</Typography>
          <Typography color="text.secondary">No expense data found.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3} sx={{ borderRadius: 3, background: darkMode ? "#1e1e2e" : "white", mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}
          sx={{ color: darkMode ? "#fff" : "#333" }}>
          🍩 Spending Breakdown
        </Typography>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={45}
              dataKey="value"
              label={false}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: darkMode ? "#1e1e2e" : "white",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <Box sx={{ mt: 2 }}>
          {chartData.map((item, index) => (
            <Box key={item.name} sx={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", py: 0.8,
              borderBottom: "1px solid",
              borderColor: darkMode ? "#333" : "#f0f0f0",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{
                  width: 12, height: 12, borderRadius: "50%",
                  backgroundColor: COLORS[index % COLORS.length],
                }} />
                <Typography variant="body2" sx={{ color: darkMode ? "#ccc" : "#444" }}>
                  {item.name}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold"
                sx={{ color: darkMode ? "#fff" : "#333" }}>
                {formatCurrency(item.value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}