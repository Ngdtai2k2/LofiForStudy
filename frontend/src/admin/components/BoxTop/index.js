import React from 'react';
import Box from '@mui/material/Box';

function BoxTop(props) {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 9, marginX: 3 }} {...props}>
      {props.children}
    </Box>
  );
}

export default BoxTop;
