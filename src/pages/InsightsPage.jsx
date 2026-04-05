import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import InsightsPanel from "../components/insights/InsightsPanel";
import { useApp } from "../context/AppContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function InsightsPage() {
  const { darkMode } = useApp();

  return (
    <Box sx={{ width: "100%" }}>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <Typography variant="h5" fontWeight="bold" mb={3}
          sx={{ color: darkMode ? "#fff" : "#333" }}>
          💡 Insights
        </Typography>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <InsightsPanel />
      </motion.div>
    </Box>
  );
}