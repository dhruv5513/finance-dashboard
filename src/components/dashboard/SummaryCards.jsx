import { Grid, Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers";

const StatCard = ({ title, amount, icon, color, darkMode, isMobile }) => (
  <Card elevation={0} sx={{
    borderRadius: 3,
    background: darkMode ? "rgba(30,30,46,0.8)" : "rgba(255,255,255,0.8)",
    border: `1px solid ${darkMode ? "#2a2a3e" : "#f0f0f0"}`,
    borderLeft: `4px solid ${color}`,
    transition: "transform 0.2s",
    "&:hover": { transform: "translateY(-4px)" },
  }}>
    <CardContent sx={{
      p: isMobile ? "12px !important" : "16px !important",
    }}>
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{
            backgroundColor: `${color}22`,
            borderRadius: 2,
            p: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {icon}
          </Box>
          <Box>
            <Typography sx={{ color: darkMode ? "#aaa" : "#666", fontSize: 11, mb: 0.2 }}>
              {title}
            </Typography>
            <Typography fontWeight="bold" sx={{ color, fontSize: 16 }}>
              {formatCurrency(amount)}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography sx={{ color: darkMode ? "#aaa" : "#666", mb: 0.5, fontSize: 13 }}>
              {title}
            </Typography>
            <Typography fontWeight="bold" sx={{ color, fontSize: 22 }}>
              {formatCurrency(amount)}
            </Typography>
          </Box>
          <Box sx={{
            backgroundColor: `${color}22`,
            borderRadius: "50%",
            p: 1.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {icon}
          </Box>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpense, darkMode } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cards = [
    { title: "Total Balance",  amount: totalBalance, icon: <AccountBalanceIcon sx={{ color: "#1976d2", fontSize: isMobile ? 16 : 22 }} />, color: "#1976d2" },
    { title: "Total Income",   amount: totalIncome,  icon: <TrendingUpIcon sx={{ color: "#2e7d32", fontSize: isMobile ? 16 : 22 }} />,    color: "#2e7d32" },
    { title: "Total Expenses", amount: totalExpense, icon: <TrendingDownIcon sx={{ color: "#d32f2f", fontSize: isMobile ? 16 : 22 }} />,  color: "#d32f2f" },
  ];

  return (
    <Grid container spacing={{ xs: 1.5, md: 3 }} mb={{ xs: 2, md: 3 }}>
      {cards.map((card) => (
        <Grid item xs={12} sm={4} key={card.title}>
          <StatCard {...card} darkMode={darkMode} isMobile={isMobile} />
        </Grid>
      ))}
    </Grid>
  );
}