import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';



const Spinner = () => {
  return (
    <Box sx={{ width: '100%' }} className="mt-10">
      <LinearProgress />
    </Box>
    // <Box sx={{ display: 'flex' }} className="mt-10">
    //   <CircularProgress />
    // </Box>
    // <div className="inline-block w-[60px] h-[60px] rounded-full border-[5px] border-t-black/20 border-r-black/20 animate-spin"></div>
  );
};
export default Spinner;
