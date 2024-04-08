import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InfoIcon from '@mui/icons-material/Info';

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        <Link href="/" underline="none" variant="inherit">
          Lofi for Study
        </Link>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/')}
          onClick={() => handleLinkClick('/')}
        >
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/music')}
          onClick={() => handleLinkClick('/music')}
        >
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText primary={'Music'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          selected={setSelectedLink('/about')}
          onClick={() => handleLinkClick('/about')}
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
