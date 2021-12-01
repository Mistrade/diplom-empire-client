import { List, ListProps, styled } from '@mui/material'

export const colors = {
  primary: '#B983FF',
  secondary: '#94B3FD',
  info: '#B2B1B9',
}

export const FileList = styled( List )<ListProps>( ( { theme } ) => ( {
  '& .MuiListItem-root': {
    padding: 8,
    '& .MuiListItemAvatar-root': {
      width: 'fit-content',
      minWidth: 40,
      marginRight: 12,
      display: 'flex',
      justifyContent: 'center'
    },
    '& .MuiSvgIcon-colorPrimary': {
      color: colors.secondary
    },
    '& .MuiTypography-root': {
      lineHeight: 1.2
    }
  }
} ) )