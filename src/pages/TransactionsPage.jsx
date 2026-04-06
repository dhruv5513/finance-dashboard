import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { motion } from "framer-motion";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilter from "../components/transactions/TransactionFilter";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import ExportButton from "../components/transactions/ExportButton";
import { useApp } from "../context/AppContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function TransactionsPage() {
  const { role, darkMode } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = (tx) => {
    setEditData(tx);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditData(null);
  };

  return (
    <Box sx={{ width: "100%" }}>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
        <Box sx={{ mb: 3 }}>
          <Typography
            fontWeight="bold"
            mb={1.5}
            sx={{
              color: darkMode ? "#fff" : "#333",
              fontSize: { xs: 18, md: 22 },
            }}
          >
            💳 Transactions
          </Typography>

          <Box sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "nowrap",
          }}>
            <ExportButton />
            {role === "admin" && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditData(null);
                  setModalOpen(true);
                }}
                sx={{
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  fontSize: { xs: 12, md: 14 },
                  px: { xs: 1.5, md: 2 },
                }}
              >
                Add Transaction
              </Button>
            )}
          </Box>
        </Box>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
        <TransactionFilter />
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
        <TransactionList onEdit={handleEdit} />
      </motion.div>

      <AddTransactionModal
        open={modalOpen}
        onClose={handleClose}
        editData={editData}
      />
    </Box>
  );
}