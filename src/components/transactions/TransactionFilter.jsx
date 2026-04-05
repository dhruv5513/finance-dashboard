import {
  Box, TextField, Select, MenuItem,
  FormControl, InputLabel, InputAdornment,
  Button, Collapse, Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

const CATEGORIES = ["all", "Salary", "Freelance", "Food", "Transport", "Shopping", "Bills"];

export default function TransactionFilter() {
  const {
    filter, setFilter,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    amountMin, setAmountMin,
    amountMax, setAmountMax,
    resetFilters,
    darkMode,
  } = useApp();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const inputStyle = {
    backgroundColor: darkMode ? "#1e1e2e" : "white",
    borderRadius: 2,
  };

  return (
    <Box sx={{ mb: 3 }}>

      {/* Basic Filter Row */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", mb: 1.5 }}>

        {/* Search */}
        <TextField
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200, ...inputStyle }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        {/* Type Filter */}
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filter}
            label="Type"
            onChange={(e) => setFilter(e.target.value)}
            sx={inputStyle}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        {/* Advanced Filter Toggle */}
        <Button
          variant={showAdvanced ? "contained" : "outlined"}
          startIcon={<FilterListIcon />}
          onClick={() => setShowAdvanced(!showAdvanced)}
          sx={{ borderRadius: 2 }}
          size="small"
        >
          Filters
        </Button>

        {/* Reset */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<RestartAltIcon />}
          onClick={resetFilters}
          sx={{ borderRadius: 2 }}
          size="small"
        >
          Reset
        </Button>

      </Box>

      {/* Advanced Filters */}
      <Collapse in={showAdvanced}>
        <Box sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: darkMode ? "#1e1e2e" : "white",
          border: `1px solid ${darkMode ? "#2a2a3e" : "#e0e0e0"}`,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}>

          <Typography variant="body2" fontWeight="bold"
            sx={{ color: darkMode ? "#aaa" : "#555", mr: 1 }}>
            Advanced Filters:
          </Typography>

          {/* Category */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={inputStyle}
            >
              {CATEGORIES.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date From */}
          <TextField
            label="Date From"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150, ...inputStyle }}
          />

          {/* Date To */}
          <TextField
            label="Date To"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150, ...inputStyle }}
          />

          {/* Amount Min */}
          <TextField
            label="Min Amount"
            type="number"
            value={amountMin}
            onChange={(e) => setAmountMin(e.target.value)}
            size="small"
            sx={{ minWidth: 120, ...inputStyle }}
          />

          {/* Amount Max */}
          <TextField
            label="Max Amount"
            type="number"
            value={amountMax}
            onChange={(e) => setAmountMax(e.target.value)}
            size="small"
            sx={{ minWidth: 120, ...inputStyle }}
          />

        </Box>
      </Collapse>
    </Box>
  );
}