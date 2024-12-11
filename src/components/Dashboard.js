import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Dashboard({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // setAnchorEl(null);
    // console.log('User logged out'); // Add logout logic here
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          CCM Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'primary.contrastText',
            }}
          >
            Welcome {user?.firstName} {user?.lastName}
          </Typography>
          <Tooltip title="Account Menu">
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src="/path-to-avatar.jpg" // Replace with actual avatar URL
                alt={`${user?.firstName} ${user?.lastName}`}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: 3,
                borderRadius: 2,
                minWidth: 200,
              },
            }}
          >
            <MenuItem>
              <Avatar
                src="/path-to-avatar.jpg"
                alt={`${user?.firstName} ${user?.lastName}`}
                sx={{ width: 32, height: 32, mr: 2 }}
              />
              Profile
            </MenuItem>
            <MenuItem>
              <AccountCircleIcon sx={{ fontSize: 20, mr: 2 }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Body */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, row on larger screens
        }}
      >
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            bgcolor: 'text.secondary',
            color: 'secondary.contrastText',
            width: { xs: '100%', sm: '250px' }, // Full width on mobile, fixed width on larger screens
            p: 2,
          }}
        >
          {/* <Typography variant="h6" sx={{ mb: 2 }}>
            Navigation
          </Typography> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#transactions">
                <ListItemText primary="View Top 10 Transactions" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#credit-cards">
                <ListItemText primary="View List of Credit Cards" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#add-credit-card">
                <ListItemText primary="Add Credit Card" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/viewexpenses">
                <ListItemText primary="View Expenses" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 2,
            textAlign: 'center',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="body1">
            Select an option from the menu to proceed.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
