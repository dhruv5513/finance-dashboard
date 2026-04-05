import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Typography,
  IconButton, Box, Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useApp } from "../../context/AppContext";
import { formatCurrency, formatDate } from "../../utils/helpers";

const CATEGORY_COLORS = {
  Salary:    "#2e7d32",
  Freelance: "#1976d2",
  Food:      "#f57c00",
  Transport: "#7b1fa2",
  Shopping:  "#0097a7",
  Bills:     "#d32f2f",
};

export default function TransactionList({ onEdit }) {
  const { filteredTransactions, deleteTransaction, role, darkMode } = useApp();
  const isAdmin = role === "admin";

  if (filteredTransactions.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          No transactions found 🙁
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        background: darkMode ? "#1e1e2e" : "white",
        border: `1px solid ${darkMode ? "#2a2a3e" : "#e0e0e0"}`,
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: darkMode ? "#16213e" : "#1976d2" }}>
            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 13, width: "15%" }}>Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 13, width: "25%" }}>Description</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 13, width: "15%" }}>Category</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 13, width: "15%" }}>Type</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 13, width: "15%" }}>Amount</TableCell>
            {isAdmin && (
              <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 13, width: "15%" }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredTransactions.map((tx, index) => (
            <TableRow
              key={tx.id}
              sx={{
                backgroundColor: darkMode
                  ? index % 2 === 0 ? "#1e1e2e" : "#22223a"
                  : index % 2 === 0 ? "#ffffff" : "#f9fafb",
                "&:hover": {
                  backgroundColor: darkMode ? "#2a2a4a" : "#eff6ff",
                },
                transition: "background 0.15s",
              }}
            >
              <TableCell sx={{ color: darkMode ? "#aaa" : "#555", fontSize: 13, py: 1.8 }}>
                {formatDate(tx.date)}
              </TableCell>

              <TableCell sx={{ color: darkMode ? "#fff" : "#222", fontSize: 13, fontWeight: 500 }}>
                {tx.description}
              </TableCell>

              <TableCell>
                <Chip
                  label={tx.category}
                  size="small"
                  sx={{
                    backgroundColor: `${CATEGORY_COLORS[tx.category]}18`,
                    color: CATEGORY_COLORS[tx.category],
                    fontWeight: 600,
                    fontSize: 11,
                    border: `1px solid ${CATEGORY_COLORS[tx.category]}44`,
                    borderRadius: "6px",
                  }}
                />
              </TableCell>

              <TableCell>
                <Box sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: "6px",
                  backgroundColor: tx.type === "income" ? "#e8f5e9" : "#ffebee",
                }}>
                  <Box sx={{
                    width: 6, height: 6, borderRadius: "50%",
                    backgroundColor: tx.type === "income" ? "#2e7d32" : "#d32f2f",
                  }} />
                  <Typography sx={{
                    fontSize: 12, fontWeight: 600,
                    color: tx.type === "income" ? "#2e7d32" : "#d32f2f",
                  }}>
                    {tx.type === "income" ? "Income" : "Expense"}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell sx={{
                fontWeight: 700,
                fontSize: 14,
                color: tx.type === "income" ? "#2e7d32" : "#d32f2f",
              }}>
                {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
              </TableCell>

              {isAdmin && (
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onEdit(tx)}
                        sx={{
                          width: 32, height: 32,
                          backgroundColor: darkMode ? "#1a3a5c" : "#e3f2fd",
                          color: "#1976d2",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#1976d2",
                            color: "white",
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        size="small"
                        onClick={() => deleteTransaction(tx.id)}
                        sx={{
                          width: 32, height: 32,
                          backgroundColor: darkMode ? "#3a1a1a" : "#ffebee",
                          color: "#d32f2f",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            color: "white",
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}