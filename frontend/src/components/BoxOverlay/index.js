import React from 'react';
import Box from '@mui/material/Box';

export default function BoxOverlay(props) {
  return (
    <Box
      mb={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      borderRadius={2}
      p={1}
      marginX={0.5}
      sx={{ backgroundColor: '#1414146b', ...props.sx }}
      {...props.rest}
    >
      {props.children}
    </Box>
  );
}
