import {
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Box,
  useMediaQuery, useTheme
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InsightsIcon from "@mui/icons-material/Insights";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const DRAWER_WIDTH = 220;

const navItems = [
  { label: "Dashboard",    icon: <DashboardIcon />,   path: "/" },
  { label: "Transactions", icon: <ReceiptLongIcon />, path: "/transactions" },
  { label: "Insights",     icon: <InsightsIcon />,    path: "/insights" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) return null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          background: "transparent",
          borderRight: "none",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", mt: 1 }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
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
                  "&:hover": {
                    backgroundColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(25,118,210,0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: location.pathname === item.path
                      ? "white"
                      : darkMode ? "#90caf9" : "#1976d2",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}