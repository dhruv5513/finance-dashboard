import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <Typography
          fontWeight="bold"
          mb={{ xs: 2, md: 3 }}
          sx={{
            color: darkMode ? "#fff" : "#333",
            fontSize: { xs: 16, sm: 18, md: 24 },
          }}
        >
          📊 Dashboard Overview
        </Typography>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <SummaryCards />
      </motion.div>

      {isMobile ? (
        <Box>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <BalanceTrendChart />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <SpendingChart />
          </motion.div>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item md={7}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <BalanceTrendChart />
            </motion.div>
          </Grid>
          <Grid item md={5}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <SpendingChart />
            </motion.div>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}