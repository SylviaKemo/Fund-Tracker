import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = {
    name: localStorage.getItem("userName") ,
    email: localStorage.getItem("userEmail") 
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Dashboard
          </Button>
          
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <UserProfile user={user} /> {/* User Profile */}
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{ textTransform: "none", backgroundColor: "#456" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
