import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem,
  FormControl, InputLabel, Box, Typography
} from "@mui/material";
import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

const CATEGORIES = ["Salary", "Freelance", "Food", "Transport", "Shopping", "Bills"];

const defaultForm = {
  date: "",
  amount: "",
  category: "Food",
  type: "expense",
  description: "",
};

export default function AddTransactionModal({ open, onClose, editData }) {
  const { addTransaction, editTransaction, darkMode } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editData, open]);

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required";
    if (!form.amount || isNaN(form.amount) || form.amount <= 0)
      newErrors.amount = "Valid amount is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editData) {
      editTransaction(editData.id, {
        ...form,
        amount: Number(form.amount),
      });
    } else {
      addTransaction({
        ...form,
        amount: Number(form.amount),
      });
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: darkMode ? "#1e1e2e" : "white",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          {editData ? "✏️ Edit Transaction" : "➕ Add Transaction"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>

          {/* Date */}
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date}
            fullWidth
            size="small"
          />

          {/* Amount */}
          <TextField
            label="Amount (₹)"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            error={!!errors.amount}
            helperText={errors.amount}
            fullWidth
            size="small"
          />

          {/* Description */}
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            size="small"
          />

          {/* Category */}
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={form.category}
              label="Category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Type */}
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={form.type}
              label="Type"
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>

        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}