import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { theme } from '../../index'

export const Preloader: React.FC<{ message: string }> = ( { message } ) => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <CircularProgress sx={{ mb: 2 }}/>
        </Box>
        <Typography variant={'body1'} color={theme.palette.primary.main}>
          {message}
        </Typography>
      </Box>
    </Box>
  )
}