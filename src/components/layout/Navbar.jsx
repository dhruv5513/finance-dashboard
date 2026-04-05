import {
  AppBar, Toolbar, Typography, Switch,
  Select, MenuItem, Box, Chip, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  useMediaQuery, useTheme
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InsightsIcon from "@mui/icons-material/Insights";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const DRAWER_WIDTH = 220;

const navItems = [
  { label: "Dashboard",    icon: <DashboardIcon />,   path: "/" },
  { label: "Transactions", icon: <ReceiptLongIcon />, path: "/transactions" },
  { label: "Insights",     icon: <InsightsIcon />,    path: "/insights" },
];

export default function Navbar() {
  const { role, setRole, darkMode, setDarkMode } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" elevation={2}
        sx={{ backgroundColor: darkMode ? "#1a1a2e" : "#1976d2", zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>

          {/* Left — Hamburger (mobile) + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <AccountBalanceWalletIcon />
            <Typography variant="h6" fontWeight="bold">
              FinTrack
            </Typography>
          </Box>

          {/* Right — Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>

            {/* Role Badge */}
            <Chip
              icon={role === "admin"
                ? <AdminPanelSettingsIcon sx={{ color: "white !important" }} />
                : <VisibilityIcon sx={{ color: "white !important" }} />}
              label={role === "admin" ? "Admin" : "Viewer"}
              size="small"
              sx={{
                backgroundColor: role === "admin" ? "#2e7d32" : "#f57c00",
                color: "white",
                fontWeight: "bold",
                display: { xs: "none", sm: "flex" },
              }}
            />

            {/* Dark Mode Toggle */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LightModeIcon fontSize="small" />
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                size="small"
              />
              <DarkModeIcon fontSize="small" />
            </Box>

            {/* Role Switcher */}
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              size="small"
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 2,
                minWidth: { xs: 100, md: 120 },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="viewer">👁️ Viewer</MenuItem>
              <MenuItem value="admin">🛠️ Admin</MenuItem>
            </Select>

          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              backgroundColor: darkMode ? "#16213e" : "#f5f5f5",
            },
          }}
        >
          <Toolbar />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  selected={location.pathname === item.path}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "#1976d2" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}