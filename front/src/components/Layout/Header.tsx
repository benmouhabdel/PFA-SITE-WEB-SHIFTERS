import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, blue 70%, #FF8E53 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const LogoTypography = styled(Typography)({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
});

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, textDecoration: 'none', color: 'yellow' }} component={Link} to="/">
          <LogoTypography variant="h6">
            Shifters
          </LogoTypography>
        </Box>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user ? (
                <>
                  <MenuItem key="profile" component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                  {user.role === 'admin' && <MenuItem key="admin" component={Link} to="/admin" onClick={handleClose}>Admin</MenuItem>}
                  <MenuItem key="tasks" component={Link} to="/tasks" onClick={handleClose}>Mission</MenuItem>
                  <MenuItem key="comments" component={Link} to="/comments" onClick={handleClose}>Comments</MenuItem>
                  <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem key="login" component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                  <MenuItem key="register" component={Link} to="/register" onClick={handleClose}>Register</MenuItem>
                  <MenuItem key="about" component={Link} to="/about" onClick={handleClose}>About</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/profile">
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  Profile
                </Button>
                {user.role === 'admin' && (
                  <Button color="inherit" component={Link} to="/admin">
                    Admin
                  </Button>
                )}
                <Button color="inherit" component={Link} to="/tasks">
                  Mission
                </Button>
                <Button color="inherit" component={Link} to="/comments">
                  Comments
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout  
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
