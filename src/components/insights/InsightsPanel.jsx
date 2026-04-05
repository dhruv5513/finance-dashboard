import {
  Grid, Card, CardContent, Typography, Box, LinearProgress
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import PieChartIcon from "@mui/icons-material/PieChart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useApp } from "../../context/AppContext";
import {
  groupByMonth, groupByCategory,
  getHighestCategory, formatCurrency
} from "../../utils/helpers";

const CATEGORY_COLORS = {
  Salary: "#2e7d32",
  Freelance: "#1976d2",
  Food: "#f57c00",
  Transport: "#7b1fa2",
  Shopping: "#0097a7",
  Bills: "#d32f2f",
};

export default function InsightsPanel() {
  const { transactions, darkMode } = useApp();

  const grouped = groupByMonth(transactions);
  const monthEntries = Object.entries(grouped);
  const categoryGrouped = groupByCategory(transactions);
  const highestCategory = getHighestCategory(transactions);
  const totalExpense = Object.values(categoryGrouped).reduce((a, b) => a + b, 0);

  const lastTwo = monthEntries.slice(-2);
  const prevMonth = lastTwo[0];
  const currMonth = lastTwo[1];
  const expenseDiff = currMonth && prevMonth
    ? currMonth[1].expense - prevMonth[1].expense
    : 0;

  const bg = darkMode ? "rgba(30,30,46,0.8)" : "rgba(255,255,255,0.8)";
  const textPrimary = darkMode ? "#fff" : "#1a1a2a";
  const textSecondary = darkMode ? "#aaa" : "#666";
  const borderColor = darkMode ? "#2a2a3e" : "#f0f0f0";
  const innerBg = darkMode ? "rgba(15,15,26,0.6)" : "#f9fafb";

  return (
    <Grid container spacing={2}>

      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{
          borderRadius: 3,
          background: bg,
          border: `1px solid ${borderColor}`,
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}>
          <Box sx={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: "linear-gradient(90deg, #f57c00, #ff9800)",
          }} />
          <CardContent sx={{ pt: 3, p: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ backgroundColor: "#f57c0018", borderRadius: 2, p: 0.8, display: "flex" }}>
                <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: 13, color: textSecondary }}>
                Top Spending Category
              </Typography>
            </Box>
            {highestCategory ? (
              <>
                <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800, color: "#f57c00", mb: 0.5, lineHeight: 1.2 }}>
                  {highestCategory[0]}
                </Typography>
                <Typography sx={{ fontSize: 12, color: textSecondary, mb: 2 }}>
                  Total spent this period
                </Typography>
                <Box sx={{ backgroundColor: innerBg, borderRadius: 2, p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{ fontSize: 12, color: textSecondary }}>Amount</Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#f57c00" }}>
                    {formatCurrency(highestCategory[1])}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">No data</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{
          borderRadius: 3,
          background: bg,
          border: `1px solid ${borderColor}`,
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}>
          <Box sx={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: expenseDiff > 0
              ? "linear-gradient(90deg, #d32f2f, #f44336)"
              : "linear-gradient(90deg, #2e7d32, #4caf50)",
          }} />
          <CardContent sx={{ pt: 3, p: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ backgroundColor: "#1976d218", borderRadius: 2, p: 0.8, display: "flex" }}>
                <TrendingUpIcon sx={{ color: "#1976d2", fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: 13, color: textSecondary }}>
                Monthly Comparison
              </Typography>
            </Box>
            {currMonth && prevMonth ? (
              <>
                <Grid container spacing={1.5} mb={2}>
                  <Grid item xs={6}>
                    <Box sx={{ backgroundColor: innerBg, borderRadius: 2, p: 1.5, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 11, color: textSecondary, mb: 0.5 }}>
                        {prevMonth[0].split(" ")[0]}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 700, color: "#d32f2f" }}>
                        {formatCurrency(prevMonth[1].expense)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ backgroundColor: innerBg, borderRadius: 2, p: 1.5, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 11, color: textSecondary, mb: 0.5 }}>
                        {currMonth[0].split(" ")[0]}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 700, color: "#d32f2f" }}>
                        {formatCurrency(currMonth[1].expense)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{
                  display: "flex", alignItems: "center", gap: 1, p: 1.5, borderRadius: 2,
                  backgroundColor: expenseDiff > 0 ? "#ffebee" : "#e8f5e9",
                }}>
                  {expenseDiff > 0
                    ? <ArrowUpwardIcon sx={{ color: "#d32f2f", fontSize: 16 }} />
                    : <ArrowDownwardIcon sx={{ color: "#2e7d32", fontSize: 16 }} />
                  }
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: expenseDiff > 0 ? "#d32f2f" : "#2e7d32" }}>
                    {expenseDiff > 0
                      ? `Expenses up by ${formatCurrency(expenseDiff)}`
                      : `Expenses down by ${formatCurrency(Math.abs(expenseDiff))}`
                    }
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">Not enough data</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card elevation={0} sx={{
          borderRadius: 3,
          background: bg,
          border: `1px solid ${borderColor}`,
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}>
          <Box sx={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: "linear-gradient(90deg, #2e7d32, #4caf50)",
          }} />
          <CardContent sx={{ pt: 3, p: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ backgroundColor: "#2e7d3218", borderRadius: 2, p: 0.8, display: "flex" }}>
                <SavingsIcon sx={{ color: "#2e7d32", fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: 13, color: textSecondary }}>
                Savings Rate
              </Typography>
            </Box>
            {monthEntries.map(([month, values]) => {
              const rate = values.income > 0
                ? Math.round((values.income - values.expense) / values.income * 100)
                : 0;
              return (
                <Box key={month} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontSize: 12, color: textSecondary }}>
                      {month.split(" ")[0]}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: rate > 0 ? "#2e7d32" : "#d32f2f" }}>
                      {rate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(Math.max(rate, 0), 100)}
                    sx={{
                      height: 6, borderRadius: 4,
                      backgroundColor: darkMode ? "#2a2a3e" : "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        backgroundColor: rate > 50 ? "#2e7d32" : rate > 25 ? "#f57c00" : "#d32f2f",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card elevation={0} sx={{
          borderRadius: 3,
          background: bg,
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
          position: "relative",
        }}>
          <Box sx={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: "linear-gradient(90deg, #7b1fa2, #9c27b0)",
          }} />
          <CardContent sx={{ pt: 3, p: { xs: 2, md: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Box sx={{ backgroundColor: "#7b1fa218", borderRadius: 2, p: 0.8, display: "flex" }}>
                <PieChartIcon sx={{ color: "#7b1fa2", fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: 13, color: textSecondary }}>
                Expense Breakdown
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {Object.entries(categoryGrouped).map(([cat, amount]) => {
                const percent = Math.round((amount / totalExpense) * 100);
                const color = CATEGORY_COLORS[cat] || "#1976d2";
                return (
                  <Grid item xs={12} sm={6} md={4} key={cat}>
                    <Box sx={{
                      p: 1.5, borderRadius: 2,
                      backgroundColor: innerBg,
                      border: `1px solid ${borderColor}`,
                    }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                          <Typography sx={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>
                            {cat}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color }}>
                          {percent}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={percent}
                        sx={{
                          height: 5, borderRadius: 4, mb: 0.8,
                          backgroundColor: darkMode ? "#2a2a3e" : "#e0e0e0",
                          "& .MuiLinearProgress-bar": { borderRadius: 4, backgroundColor: color },
                        }}
                      />
                      <Typography sx={{ fontSize: 11, color: textSecondary, textAlign: "right" }}>
                        {formatCurrency(amount)}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}