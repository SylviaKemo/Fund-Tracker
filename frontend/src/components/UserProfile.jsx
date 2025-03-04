// components/UserProfile.jsx
import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const UserProfile = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton onClick={handleClick} color="inherit">
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { padding: "10px", minWidth: "200px" } }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {user.name}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
          {user.email}
        </Typography>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
