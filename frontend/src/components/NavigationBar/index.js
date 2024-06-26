import React, { useState } from 'react';
import { useColorScheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import MenuIcon from '@mui/icons-material/Menu';

import DrawerList from '../DrawerList';
import { createAxios } from '../../createInstance';
import { logOut } from '../../redux/apiRequest/authApi';
import { logOutSuccess } from '../../redux/slice/userSlice';
import ModalAuth from '../ModalAuth';

export default function NavigationBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { mode, setMode } = useColorScheme();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const device = user?.device;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logOut(dispatch, id, device, navigate, accessToken, axiosJWT);
  };

  const handelNavigate = (path) => {
    navigate(path);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleCloseUserMenu();
  };
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#0000005c', color: '#ffffff' }}
      >
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
            >
              <DrawerList />
            </Box>
          </Drawer>
          <Typography
            variant="body1"
            fontWeight={700}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" underline="none" variant="inherit" color="#ffffff">
              Lofi For Study
            </Link>
          </Typography>
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, m: 1 }}>
              <Avatar
                src={user?.media?.url}
                alt={'Avatar of ' + user?.fullname}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '40px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user ? null : (
              <MenuItem onClick={handleOpenModal}>Signup or Login</MenuItem>
            )}
            <ModalAuth
              openModal={openModal}
              handleCloseModal={handleCloseModal}
            />
            <MenuItem onClick={() => handelNavigate('/profile')}>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              <Typography>Dark mode</Typography>
              <Switch
                sx={{ marginLeft: 2 }}
                size="small"
                checked={mode === 'light' ? false : true}
              />
            </MenuItem>
            {user ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : null}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
