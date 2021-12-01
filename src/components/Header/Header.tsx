import React from 'react'
import styles from './style.module.sass'
import {
  alpha,
  AppBar, Avatar,
  Box,
  Grid,
  InputBase,
  Stack,
  styled,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { AccountCircle } from '@mui/icons-material'

const Search = styled( 'div' )( ( { theme } ) => ( {
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha( theme.palette.common.white, 0.15 ),
  '&:hover': {
    backgroundColor: alpha( theme.palette.common.white, 0.25 )
  },
  marginLeft: 0,
  width: '100%',
  [ theme.breakpoints.up( 'sm' ) ]: {
    marginLeft: theme.spacing( 1 ),
    width: 'auto'
  }
} ) )

const SearchIconWrapper = styled( 'div' )( ( { theme } ) => ( {
  padding: theme.spacing( 0, 2 ),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
} ) )

const StyledInputBase = styled( InputBase )( ( { theme } ) => ( {
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing( 1, 1, 1, 0 ),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing( 4 )})`,
    transition: theme.transitions.create( 'width' ),
    width: '100%',
    [ theme.breakpoints.up( 'sm' ) ]: {
      width: '20ch',
      '&:focus': {
        width: '24ch'
      }
    }
  }
} ) )

export const Header: React.FC = () => {

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <Box sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}>
          <Box sx={{
            justifyContent: 'flex-start',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant={'h6'} component={'span'} color={'white'}>
                Дипломная империя
              </Typography>
            </Box>
            <Box sx={{ ml: 3 }}>
              <Search sx={{ color: 'white' }}>
                <SearchIconWrapper>
                  <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Поиск по сайту…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>
          </Box>

          <Box>
            <AccountCircle sx={{ color: 'white' }} fontSize={'large'}/>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}