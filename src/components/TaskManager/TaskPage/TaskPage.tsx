import React, { useEffect, useState } from 'react'
import {
  CreateTaskSteps,
  CurrentStepCreateTask,
  FileDataProps,
  FormState, ModalConfigProps
} from '../CreateNewTask/CreateNewTask'
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
import { FileMetaInformation, getFileExt } from '../../../common/uploadFileHandler'
import { theme } from '../../../index'
import { FileItemRender } from '../../FileUploader/FileUploader'

interface TaskPageProps {
  mode: 'preview' | 'view',
  data: FormState,
  userInfo: UserInfo,
  previewOptions?: {
    current: CurrentStepCreateTask,
    useHighlighter: boolean
  },
  modal?: ModalConfigProps,
  setModal?: React.Dispatch<React.SetStateAction<ModalConfigProps>>
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
                                                     modal, setModal,
                                                     mode,
                                                     data,
                                                     userInfo = initialUser,
                                                     previewOptions
                                                   } ) => {
  const [state, setState] = useState<null | CreateTaskSteps>( null )

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

  const FileItem: React.FC<{ item: FileDataProps }> = ( { item } ) => {
    return (
      <ListItem>
        <Tooltip title={item.file.name} placement={'top'} arrow={true}>
          <ListItemAvatar
            sx={{
              position: 'relative',
              maxWidth: 60,
              maxHeight: 60,
              overflow: 'hidden',
              border: item.data?.category === 'image' ? `1px solid ${theme.palette.divider}` : '',
              mr: 2,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {item.data?.category === 'image' ? (
              <Tooltip
                sx={{ fontSize: 20 }}
                arrow={true}
                placement={'top'}
                title={'Нажмите для просмотра изображения'}
              >
                <img
                  style={{ objectFit: 'contain', position: 'relative' }}
                  width={'60px'}
                  height={'60px'}
                  onClick={() => {
                    // setModal( {
                    //   isOpen: true,
                    //   imageContent: URL.createObjectURL( item )
                    // } )
                  }}
                  src={URL.createObjectURL( item.file )}
                />
              </Tooltip>
            ) : (
              <FileImageAvatar ext={item.data?.semanticExt}/>
            )}
          </ListItemAvatar>
        </Tooltip>
        <ListItemText>
          <Typography variant={'subtitle1'}>
            {item.file.name.length > 24 ? item.file.name.substring( 0, 24 ) + '...' : item.file.name}
          </Typography>
          <Typography variant={'subtitle2'}>
            {toMegaByte( item.file.size ).toFixed( 2 ) + ' МБайт'}
          </Typography>
        </ListItemText>
      </ListItem>
    )
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
                border: `1px solid ${theme.palette.divider}`,
                padding: 8,
                borderRadius: 8,
                height: 'fit-content'
              }}
            >
              <Typography variant={'h6'} fontSize={16} textAlign={'center'}>
                Прикрепленные файлы
              </Typography>
              <List>
                {data.files?.length ? (
                  <>
                    {data.files.map( ( item, index ) => (
                      <FileItemRender
                        data={item}
                        setModal={setModal}
                        mode={'view'}
                        disableRenderDivider={index === ( data.files?.length || 0 ) - 1}
                      />
                    ) )}
                  </>
                ) : (
                  <>
                    <Typography variant={'body1'} textAlign={'center'}>
                      Здесь будут расположены файлы.
                    </Typography>
                  </>
                )}
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