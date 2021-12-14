import { Button, ButtonProps, styled } from '@mui/material'
import { colors } from '../Lists/FileList'

export const Press = styled( Button )<ButtonProps>( ( { theme } ) => ( {
  '&.MuiButton-root': {
    '&.MuiButton-containedPrimary': {
      color: 'white'
    },
    '&.MuiButton-containedSecondary': {
      color: '#FFF'
    },
    // '&.MuiButton-containedSecondary': {
    //   backgroundColor: colors.primary
    // },
    '&.MuiButton-outlined': {
      '&.MuiButton-outlinedInfo': {
        borderColor: colors.info,
        color: colors.info,
        '&:hover': {
          backgroundColor: 'rgba(245,245,245,.9)'
        }
      }
    }
  }
} ) )