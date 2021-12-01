import React, { useState } from 'react'
import { NavItem } from './types'
import { navBarData } from './data'
import { NavLink, useHistory } from 'react-router-dom'
import style from './style.module.sass'
import { colors } from '../Lists/FileList'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'

export const NavBar: React.FC = () => {
  const [navPoints, setNavPoints] = useState<Array<NavItem>>( navBarData )
  const [state, setState] = useState<boolean>( false )
  const history = useHistory()


  return (
    <nav className={`${style.navbar} ${state ? style.open : ''}`} style={{}}>
      <List>
        <ListItem sx={{ padding: 0, mb: 1, cursor: 'pointer' }}>
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
            <Menu
              fontSize={'large'}
              // color={'primary'}
              onClick={() => setState( prev => !prev )}
            />
          </ListItemAvatar>
        </ListItem>
      </List>

      {navPoints.map( ( navSection ) => (
        <>
          <List className={style.navList}>
            {state && 'title' in navSection ? (
              <ListItem>
                <ListItemText>
                  <Typography
                    variant={'body1'}
                    component={'h3'}
                    whiteSpace={'nowrap'}
                    sx={{mb: 1}}
                  >
                    {navSection.title}
                  </Typography>
                </ListItemText>
              </ListItem>
            ) : <></>}
            {navSection.items.map( ( item ) => (
                <ListItem sx={{ padding: 0, mb: 2, cursor: 'pointer' }} onClick={() => history.push(item.href)}>
                  <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
                    {'icon' in item ? (
                      <>
                        {item.icon}
                      </>
                    ) : ''}
                  </ListItemAvatar>

                  {state ? (
                    <ListItemText>
                      <Typography variant={'subtitle2'}
                                  whiteSpace={'nowrap'}>{item.title}</Typography>
                    </ListItemText>
                  ) : <></>}
                </ListItem>
              )
            )}
          </List>
          <Box sx={{ width: '100%' }}>
            <Divider/>
          </Box>
        </>
      ) )}
    </nav>
  )
}