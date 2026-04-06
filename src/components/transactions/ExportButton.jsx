import { useState } from "react";
import { Button, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TableViewIcon from "@mui/icons-material/TableView";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useApp } from "../../context/AppContext";

export default function ExportButton() {
  const { transactions } = useApp();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const exportCSV = () => {
    const headers = ["ID", "Date", "Description", "Category", "Type", "Amount"];
    const rows = transactions.map(tx =>
      [tx.id, tx.date, tx.description, tx.category, tx.type, tx.amount].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    handleClose();
  };

  const exportJSON = () => {
    const jsonContent = JSON.stringify(transactions, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
    URL.revokeObjectURL(url);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          whiteSpace: "nowrap",
          fontSize: { xs: 12, md: 14 },
          px: { xs: 1.5, md: 2 },
        }}
      >
        Export
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: 2, mt: 1 } }}
      >
        <MenuItem onClick={exportCSV}>
          <ListItemIcon>
            <TableViewIcon fontSize="small" sx={{ color: "#2e7d32" }} />
          </ListItemIcon>
          <Typography variant="body2">Export as CSV</Typography>
        </MenuItem>
        <MenuItem onClick={exportJSON}>
          <ListItemIcon>
            <DataObjectIcon fontSize="small" sx={{ color: "#1976d2" }} />
          </ListItemIcon>
          <Typography variant="body2">Export as JSON</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}