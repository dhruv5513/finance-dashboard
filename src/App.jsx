import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Toolbar, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider, useApp } from "./context/AppContext";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

const DRAWER_WIDTH = 220;

function AppContent() {
  const { darkMode } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const appTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      background: {
        default: darkMode ? "#0f0f1a" : "#f0f4f8",
        paper: darkMode ? "#1e1e2e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />

      <div className="animated-bg">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
        <div className="blob blob4" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <Navbar />
          {!isMobile && <Sidebar />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
              width: isMobile ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`,
              background: "transparent",
              minHeight: "100vh",
              overflowX: "hidden",
            }}
          >
            <Toolbar />
            <Box sx={{
              width: "100%",
              maxWidth: "1400px",
              mx: "auto",
              px: { xs: 1.5, sm: 2, md: 4 },
              py: { xs: 2, md: 3 },
              boxSizing: "border-box",
            }}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/insights" element={<InsightsPage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}