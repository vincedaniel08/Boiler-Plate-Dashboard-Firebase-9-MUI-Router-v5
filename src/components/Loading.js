import React from 'react'
// import CircularProgress from '@mui/material/CircularProgress';
import {Box, } from '@mui/material';
// import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function Loading() {
  const classes ={
    mainBox:{
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: 'transparent',
    },
    loop:{
      color:"#45943A",
      animation: "spin 2s linear infinite",
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
    },
   
  }
    return (
      <Box sx={classes.mainBox}>
      <Box position="relative" display="inline-flex">
        {/* <CircularProgress sx={{color:"#45943A"}} /> */}
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
           {/* <Typography variant="captions" sx={{color:"#ad230e", fontWeight:700,  fontFamily: 'poppins', }}>
             DC
             </Typography> */}
            <LocalHospitalIcon style={classes.loop}/>
            
        </Box>
        </Box>
        </Box>
    )
}
