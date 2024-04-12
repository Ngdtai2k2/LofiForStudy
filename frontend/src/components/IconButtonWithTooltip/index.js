import React from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function IconButtonWithTooltip({ icon, title, ...props }) {
  return (
    <Tooltip title={title ? title : ''}>
      <IconButton {...props} aria-label={title}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
