import React, { useEffect, useState } from 'react'
import { CreateTaskSteps, CurrentStepCreateTask, FormState } from '../CreateNewTask/CreateNewTask'
import {
  Accordion, AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip,
  Typography
} from '@mui/material'
import { Container } from '../../Container/Container'
import { User } from '../../../graphqlTypes/graphql'
import { deepPurple } from '@mui/material/colors'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { Add, Close, Download, PictureAsPdf } from '@mui/icons-material'
import { FileImageAvatar } from '../../Files/FileImageAvatar'
import { FileList } from '../../Lists/FileList'

interface TaskPageProps {
  mode: 'preview' | 'view',
  data: FormState,
  userInfo: UserInfo,
  previewOptions?: {
    current: CurrentStepCreateTask,
    useHighlighter: boolean
  }
}

interface UserInfo {
  name: string,
  surname: string,
  avatar: string | null,
  rating: number
}

export interface FileProps {
  ext: 'jpg' | 'png' | 'pdf',
  title: string,
  size: number,
  url: string,
}

export const toMegaByte = ( size: number ) => {
  return size / ( 1000 * 1000 )
}

export const initialUser: UserInfo = {
  name: 'Андрей',
  surname: 'Черников',
  avatar: 'https://sun9-43.userapi.com/impg/_D87bqGa2MLpwDBIQsvR59fCMT2QquBLCp2F_g/uce5K8nhzoY.jpg?size=1439x1564&quality=96&sign=20f34f2e59ebcf6efd81a508df316830&type=album',
  rating: 4.5
}


export const TaskPage: React.FC<TaskPageProps> = ( {
                                                     mode,
                                                     data,
                                                     userInfo = initialUser,
                                                     previewOptions
                                                   } ) => {
  const [state, setState] = useState<null | CreateTaskSteps>( null )
  const [hintStatus, setHintStatus] = useState<boolean>( true )
  const titles = {
    preview: 'Предпросмотр задания',
    view: 'Задание \'' + data.taskName + '\''
  }

  useEffect( () => {
    console.log( state )
  }, [state] )

  const files: Array<FileProps> = [
    {
      ext: 'jpg',
      title: 'Изображение от 12.02.2021 321321321',
      url: '',
      size: 21352102
    },
    {
      ext: 'pdf',
      title: 'Требования к оформлению задач',
      url: '',
      size: 18900000
    },
    {
      ext: 'png',
      title: 'Скриншот экрана',
      url: '',
      size: 5789400
    }
  ]

  useEffect( () => {
    if( previewOptions && previewOptions.useHighlighter ) {
      setState( previewOptions.current.name )
    }
  }, [previewOptions] )

  const defaultStyle = {
    padding: 8,
    transition: 'all .3s ease-in',
    width: '100%'
  }

  const hoverStyle = {
    borderRadius: 12,
    background: 'rgba(220,220,220,.17)',
    ...defaultStyle
  }

  return (
    <>
      <Container variant={'section'}>
        <Box sx={{ mb: 2 }} style={state === 'task-header' ? hoverStyle : defaultStyle}>
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
            {userInfo.avatar ? (
              <Avatar
                alt={userInfo.name + ' ' + userInfo.surname}
                src={userInfo.avatar || ''}
                sx={{ width: 70, height: 70 }}
              />
            ) : (
              <Avatar
                sx={{ bgcolor: deepPurple[ 500 ], width: 70, height: 70 }}
              >
                {userInfo.name.substring( 0, 1 ).toUpperCase() + userInfo.surname.substring( 0, 1 ).toUpperCase()}
              </Avatar>
            )}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              width: '100%',
              ml: 2
            }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '100%'
                }}
                style={{ width: '100%' }}
              >
                <Typography variant={'h2'} fontSize={24} minWidth={'100%'} fontWeight={450}>
                  {data.taskName || 'Название задания'}
                </Typography>
                <Typography variant={'h6'} width={'100%'}>
                  {data.academicSubject?.title || 'Выбранный вами предмет по заданию'}
                </Typography>
                {data.subSubjects?.length ? (
                  <>
                    <Box width={'100%'} sx={{ mt: 1, mb: 1 }}>
                      <Divider flexItem={true}/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      {data.subSubjects?.length ? (
                        <>
                          {data.subSubjects?.map( item => (
                            <Box sx={{ mr: 1, mb: 1 }}>
                              <Chip label={'#' + item.title}/>
                            </Box>
                          ) )}
                        </>
                      ) : (
                        <Typography variant={'subtitle2'}>Здесь будут теги по заданию</Typography>
                      )}
                    </Box>
                    <Box width={'100%'} sx={{ mt: 1, mb: 1 }}>
                      <Divider/>
                    </Box>
                  </>
                ) : <></>}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                <EventNoteIcon sx={{ mr: 1 }} color={'secondary'}/>
                <Typography variant={'subtitle2'} fontSize={16}>
                  {data.toDate?.format || 'Срок сдачи работы'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box style={state === 'task-body' ? hoverStyle : defaultStyle}>
          <Grid container>
            <Grid item xs={7} style={{ paddingRight: 16 }}>
              <Typography variant={'h6'} fontSize={20} mb={1}>
                Детали задания
              </Typography>
              {data.details ? (
                <>
                  <Divider style={{ marginBottom: 16 }}/>
                  <Typography variant={'subtitle2'} whiteSpace={'pre-wrap'}>
                    {data.details}
                  </Typography>
                </>
              ) : <></>}
            </Grid>
            <Grid
              item xs={5}
              style={{
                border: '1px solid rgba(190,190,190,.2)',
                padding: 8,
                borderRadius: 8,
                height: 'fit-content'
              }}
            >
              <Typography variant={'h6'} fontSize={16} textAlign={'center'}>
                Прикрепленные файлы
              </Typography>
              <List>
                {files.map( item => (
                  <ListItem>
                    <Tooltip title={item.title} placement={'top'} arrow={true}>
                      <ListItemAvatar>
                        <FileImageAvatar ext={item.ext}/>
                      </ListItemAvatar>
                    </Tooltip>
                    <ListItemText>
                      <Typography variant={'subtitle1'}>
                        {item.title.length > 24 ? item.title.substring( 0, 24 ) + '...' : item.title}
                      </Typography>
                      <Typography variant={'subtitle2'}>
                        {toMegaByte( item.size ).toFixed( 2 ) + ' МБайт'}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ) )}
              </List>
            </Grid>
          </Grid>
        </Box>
        <Box style={state === 'task-additional' ? hoverStyle : defaultStyle}>
          Дополнительная информация
        </Box>
      </Container>
    </>
  )
}