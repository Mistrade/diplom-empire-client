import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import {
  Box, Button,
  Divider,
  List,
  ListItem,
  ListItemIcon, ListItemText,
  ListSubheader, Stack,
  TextField,
  Typography
} from '@mui/material'
import { theme } from '../../index'
import { CheckCircle } from '@mui/icons-material'
import { TagList } from '../AdminCenter/ProjectSettings/SubjectManagement/TagList'
import { Preloader } from '../Preloader/Preloader'
import { PreloaderProps, useLoading } from '../../hooks/useLoading'
import { RightBarActions, RightBarList } from './RightBarList'

export interface ManagementListProps<T = any> {
  leftBarConfig: LeftBarConfig,
  filterInputConfig?: InputFilterLeftBarProps,
  leftBarList: Array<LeftBarListItem<T>>,
  fullComponentIsLoad?: PreloaderProps,
  rightList: ( selected: LeftBarListItem | null ) => ReactNode
}

export interface LeftBarListItem<T = any> {
  id: string,
  title: string,
  data: T
}

export interface LeftBarConfig {
  title: string | ReactNode
}

export interface InputFilterLeftBarProps {
  onChange: ( value: string, setList: React.Dispatch<React.SetStateAction<Array<LeftBarListItem>>>, list: Array<LeftBarListItem> ) => any
  label: string,
  placeholder: string
}

const InputFilterLeftBar: React.FC<InputFilterLeftBarProps & { setLeftList: React.Dispatch<React.SetStateAction<Array<LeftBarListItem>>>, list: Array<LeftBarListItem> }> = ( {
                                                                                                                                                                                setLeftList,
                                                                                                                                                                                onChange,
                                                                                                                                                                                label,
                                                                                                                                                                                placeholder,
                                                                                                                                                                                list
                                                                                                                                                                              } ) => {
  const [filteredValue, setFilteredValue] = useState<string>( '' )

  const changeHandler = ( e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
    setFilteredValue( e.target.value )
    onChange( e.target.value, setLeftList, list )
  }

  return (
    <Box sx={{ flex: '1 0 50%', p: 1 }}>
      <TextField
        label={label}
        variant={'outlined'}
        fullWidth={true}
        value={filteredValue}
        placeholder={placeholder}
        onChange={changeHandler}
      />
    </Box>
  )
}

export const ManagementList: React.FC<ManagementListProps> = ( props ) => {
  const [selected, setSelected] = useState<LeftBarListItem | null>( null )
  const [leftList, setLeftList] = useState<Array<LeftBarListItem>>( props.leftBarList )

  useEffect( () => {
    setLeftList( props.leftBarList )
  }, [props.leftBarList] )

  const selectHandler = async ( item: LeftBarListItem ) => {
    await setSelected( item )
  }

  const RenderTitle: React.FC = () => {
    return (
      <>
        {typeof props.leftBarConfig.title === 'string' ? (
          <Typography variant={'h6'} fontSize={18}>
            {props.leftBarConfig.title}
          </Typography>
        ) : props.leftBarConfig.title}
      </>
    )
  }

  return (
    <Box
      sx={{ height: '55vh', width: '100%' }}
    >
      {props.fullComponentIsLoad?.status ? (
        <Preloader message={props.fullComponentIsLoad.message}/>
      ) : (
        <Stack
          divider={<Divider orientation={'vertical'}/>}
          border={`1px solid ${theme.palette.divider}`}
          borderRadius={2}
          direction={'row'}
          mt={2}
          p={1}
          sx={{ height: '55vh' }}
        >
          <Box sx={{ flex: '1 0 50%', overflow: 'scroll' }}>
            <List>
              <ListSubheader sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 75
              }}>
                <Box sx={{ flex: '1 0 50%', p: 1 }}>
                  <RenderTitle/>
                </Box>
                {props.filterInputConfig ? (
                  <InputFilterLeftBar
                    {...props.filterInputConfig}
                    setLeftList={setLeftList}
                    list={props.leftBarList}
                  />
                ) : <></>}
              </ListSubheader>
              {leftList
                .map( item => {
                  return (
                    <ListItem
                      key={item.id}
                      onClick={() => selectHandler( item )}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { borderRadius: 2, backgroundColor: 'rgba(240,240,240,.8)' }
                      }}
                    >
                      {selected?.id === item.id ? (
                        <ListItemIcon>
                          <CheckCircle color={'primary'}/>
                        </ListItemIcon>
                      ) : <></>}
                      <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                  )
                } )}
            </List>
          </Box>
          <Box sx={{ flex: '1 0 50%', overflow: 'scroll' }}>
            {props.rightList( selected )}
          </Box>
        </Stack>
      )}
    </Box>
  )
}