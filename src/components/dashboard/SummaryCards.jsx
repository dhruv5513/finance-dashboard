import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers";

const StatCard = ({ title, amount, icon, color, darkMode }) => (
  <Card elevation={0} sx={{
    borderRadius: 3,
    background: darkMode ? "rgba(30,30,46,0.8)" : "rgba(255,255,255,0.8)",
    border: `1px solid ${darkMode ? "#2a2a3e" : "#f0f0f0"}`,
    borderLeft: `4px solid ${color}`,
    transition: "transform 0.2s",
    "&:hover": { transform: "translateY(-4px)" },
  }}>
    <CardContent sx={{ p: { xs: 1.5, md: 2 }, "&:last-child": { pb: { xs: 1.5, md: 2 } } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography sx={{
            color: darkMode ? "#aaa" : "#666",
            mb: 0.5,
            fontSize: { xs: 11, sm: 12, md: 13 },
          }}>
            {title}
          </Typography>
          <Typography fontWeight="bold" sx={{
            color: color,
            fontSize: { xs: 16, sm: 18, md: 22 },
          }}>
            {formatCurrency(amount)}
          </Typography>
        </Box>
        <Box sx={{
          backgroundColor: `${color}22`,
          borderRadius: "50%",
          p: { xs: 0.8, md: 1.2 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpense, darkMode } = useApp();

  const cards = [
    { title: "Total Balance",  amount: totalBalance, icon: <AccountBalanceIcon sx={{ color: "#1976d2", fontSize: { xs: 18, md: 22 } }} />, color: "#1976d2" },
    { title: "Total Income",   amount: totalIncome,  icon: <TrendingUpIcon sx={{ color: "#2e7d32", fontSize: { xs: 18, md: 22 } }} />,    color: "#2e7d32" },
    { title: "Total Expenses", amount: totalExpense, icon: <TrendingDownIcon sx={{ color: "#d32f2f", fontSize: { xs: 18, md: 22 } }} />,  color: "#d32f2f" },
  ];

  return (
    <Grid container spacing={{ xs: 1.5, md: 3 }} mb={{ xs: 2, md: 3 }}>
      {cards.map((card) => (
        <Grid item xs={12} sm={4} key={card.title}>
          <StatCard {...card} darkMode={darkMode} />
        </Grid>
      ))}
    </Grid>
  );
}