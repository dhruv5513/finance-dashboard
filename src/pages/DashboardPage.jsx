import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import { useApp } from "../context/AppContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function DashboardPage() {
  const { darkMode } = useApp();

  return (
    <Box sx={{ width: "100%" }}>
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <Typography
          fontWeight="bold"
          mb={3}
          sx={{
            color: darkMode ? "#fff" : "#333",
            fontSize: { xs: 18, sm: 20, md: 24 },
          }}
        >
          📊 Dashboard Overview
        </Typography>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <SummaryCards />
      </motion.div>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={7}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <BalanceTrendChart />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={5}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <SpendingChart />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}