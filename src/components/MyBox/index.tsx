import { Box, BoxProps, styled } from '@mui/material'

export const MyBox = styled( Box )<BoxProps>( ( { theme } ) => ( {
  '&': {
    backgroundColor: theme.palette.background.default
  }
} ) )