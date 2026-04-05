import { Box, Typography, Button } from "@mui/material";
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
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
          <Typography variant="h5" fontWeight="bold"
            sx={{ color: darkMode ? "#fff" : "#333" }}>
            💳 Transactions
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <ExportButton />
            {role === "admin" && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditData(null);
                  setModalOpen(true);
                }}
                sx={{ borderRadius: 2 }}
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