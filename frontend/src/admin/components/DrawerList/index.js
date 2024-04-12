import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import InfoIcon from '@mui/icons-material/Info';

function DrawerList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  const setSelectedLink = (link) => {
    return link === activeLink ? true : false;
  };
  return (
    <List>
      <ListItem>
        <Link href="/admin" underline="none" variant="inherit">
          Lofi for Study (Admin)
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/admin')}
          onClick={() => handleLinkClick('/admin')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/admin/users')}
          onClick={() => handleLinkClick('/admin/users')}
        >
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary={'Users'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/admin/songs')}
          onClick={() => handleLinkClick('/admin/songs')}
        >
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary={'Songs'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/admin/backgrounds')}
          onClick={() => handleLinkClick('/admin/backgrounds')}
        >
          <ListItemIcon>
            <WallpaperIcon />
          </ListItemIcon>
          <ListItemText primary={'Backgrounds'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/admin/about')}
          onClick={() => handleLinkClick('/admin/about')}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default DrawerList;
