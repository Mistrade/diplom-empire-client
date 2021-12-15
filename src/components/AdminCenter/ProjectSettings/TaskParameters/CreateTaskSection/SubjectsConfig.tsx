import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react'
import {
  Box,
  Button, ButtonGroup, Chip, CircularProgress, ClickAwayListener,
  Dialog,
  DialogActions, DialogContent,
  DialogContentText,
  DialogTitle,
  Divider, FormControl, Grid, Icon,
  IconButton, IconProps,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader, SvgIconProps,
  TextField, TextFieldProps, Tooltip,
  Typography
} from '@mui/material'
import {
  AddCircle,
  ArrowBack,
  ArrowCircleDown,
  BuildCircle,
  CheckCircle,
  Close,
  DeleteForeverOutlined,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowDownOutlined,
  ListAlt,
  ListAltOutlined,
  SettingsApplicationsOutlined,
  SettingsPhoneOutlined, SvgIconComponent
} from '@mui/icons-material'
import { useAddNewSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/addNewSubSubject'
import { useAcademicSubjectsListQuery } from '../../SubjectManagement/graphqlTypes/academicSubjects'
import { useAddNewSubjectMutation } from '../../SubjectManagement/graphqlTypes/addNewSubject'
import { theme } from '../../../../../index'
import { useSubSubjectsQuery } from '../../SubjectManagement/graphqlTypes/subsubject'
import { PreloaderProps, useLoading } from '../../../../../hooks/useLoading'
import { useEditSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/editSubSubject'
import { useDeleteSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/deleteSubSubject'
import { MyBox } from '../../../../MyBox'
import { useChangeSubjectInfoMutation } from '../graphQL/graphqlTypes/changeSubjectInfo'
import { useSnackbar } from 'notistack'

interface SubjectItem {
  id: string,
  title: string,
  description: string
}

interface ShowAddItemType {
  show: boolean,
  title: string,
}

interface InputWithPlusProps {
  inputProps: TextFieldProps,
  icon?: ( props: SvgIconProps ) => ReactNode,
  onButtonClick: () => Promise<any>,
  loading?: boolean
}

const InputWithPlus: FC<InputWithPlusProps> = ( props ) => {
  const [showButton, setShowButton] = useState( !!props.inputProps.value )

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '100%',
      mb: 2
    }}>
      <TextField
        {...props.inputProps}
        fullWidth={true}
        disabled={props.loading}
        sx={{ maxWidth: '100%', transition: 'all .3s ease-in' }}
        onFocus={() => setShowButton( true )}
      />
      {showButton ? (
        <Box sx={{ mr: 2, ml: 2 }}>
          {props.loading ? (
            <CircularProgress color={'primary'} size={25}/>
          ) : (
            <IconButton onClick={async () => {
              await props.onButtonClick()
            }}>
              {props.icon ? (
                <>
                  {props.icon( {
                    color: 'primary',
                    sx: {
                      fontSize: 30
                    }
                  } )}
                </>
              ) : (
                <AddCircle color={'primary'} sx={{fontSize: 30}}/>
              )}
            </IconButton>
          )}
        </Box>
      ) : <></>}
    </Box>
  )
}

const EditingSubjectDialog: FC<{ data: SubjectItem, setState: Dispatch<SetStateAction<null | SubjectItem>> }> = ( {
                                                                                                                    data,
                                                                                                                    setState
                                                                                                                  } ) => {
  const [value, setValue] = useState( data.title )
  const subSubjectsQueryOptions = useSubSubjectsQuery( {
    variables: {
      parentID: data.id
    }
  } )
  const initialAddSubItemState: ShowAddItemType = {
    show: false,
    title: ''
  }
  const [subSubjectItem, setSubSubjectItem] = useState<ShowAddItemType>( initialAddSubItemState )
  const [newSubSubjectQuery, newSubSubjectHookOptions] = useAddNewSubSubjectMutation()
  const loadOptions = useLoading()
  const [tagsListOpen, setTagListOpen] = useState<boolean>( false )
  const initialTagEditingState = {
    id: '',
    title: ''
  }
  const [tagEditing, setTagEditing] = useState<{ id: string, title: string }>( initialTagEditingState )
  const [tagTooltip, setTagTooltip] = useState<string | null>( null )
  const [editTagMutation, editTagMutationOptions] = useEditSubSubjectMutation()
  const [deleteTagMutation, deleteTagMutationOptions] = useDeleteSubSubjectMutation()
  const [changeSubjectMutation, changeSubjectMutationOptions] = useChangeSubjectInfoMutation()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Dialog
      open={true}
      onClose={( event, reason ) => reason !== 'backdropClick' && setState( null )}
      maxWidth={'sm'}
      fullWidth={true}
    >
      <Box sx={{ padding: 2 }}>
        <DialogTitle sx={{ p: 0 }}>
          {value ? (
            <>
              Настройки для "{value}"
            </>
          )  : (
            <>
              Создание нового предмета
            </>
          )}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ mt: 1, width: '100%' }}>
            <InputWithPlus
              loading={loadOptions.isLoad.items.includes( 'subject-info' )}
              inputProps={{
                label: 'Название предмета',
                placeholder: 'Укажите название предмета',
                error: !value.length,
                helperText: !value.length ? 'Укажите корректное название предмета!' : '',
                value,
                onChange: ( e ) => setValue( e.target.value )
              }}
              icon={( params ) => <CheckCircle {...params} />}
              onButtonClick={async () => {
                if( value.length ) {
                  await loadOptions.withLoading( async () => {
                    try {

                      const res = await changeSubjectMutation( {
                        variables: {
                          id: data.id,
                          title: value
                        }
                      } )

                      if( res.data?.changeSubject?.id === data.id || !res.errors ) {
                        await enqueueSnackbar( 'Название предмета успешно изменено', { variant: 'success' } )
                      }
                    } catch (e) {
                      return enqueueSnackbar( 'При изменении названия произошла ошибка', { variant: 'error' } )
                    }
                  }, 'Сохранение названия предмета...', 'subject-info' )
                }
              }}
            />

            <InputWithPlus
              loading={loadOptions.isLoad.items.includes( 'addNewTag' )}
              inputProps={{
                label: 'Добавление нового тега',
                placeholder: 'Укажите название тега',
                value: subSubjectItem.title,
                onChange: ( e ) => setSubSubjectItem( prev => ( {
                  ...prev,
                  title: e.target.value
                } ) )
              }}
              onButtonClick={async () => {
                if( subSubjectItem.title.length ) {
                  await loadOptions.withLoading( async () => {
                    try {

                      await newSubSubjectQuery( {
                        variables: {
                          data: {
                            parentID: data.id,
                            title: subSubjectItem.title
                          }
                        }
                      } )

                      await subSubjectsQueryOptions.refetch()
                      await setSubSubjectItem( initialAddSubItemState )
                    } catch (e) {
                      return
                    }
                  }, 'Сохранение нового тега...', 'addNewTag' )
                }
              }}
            />
            <Box sx={{
              overflow: 'hidden',
              p: 1,
              borderRadius: 2,
              border: `2px solid ${theme.palette.divider}`
            }}>
              <List
                sx={{
                  overflow: 'scroll',
                  overscrollBehavior: 'contain',
                  maxHeight: !tagsListOpen ? 50 : 300,
                  p: 0,
                  transition: 'all .3s ease-in'
                }}
              >
                <ListSubheader
                  sx={{
                    borderBottom: !tagsListOpen ? '' : `1px solid ${theme.palette.divider}`,
                    m: 0,
                    pb: 1,
                    pt: 1,
                    pr: 1,
                    mb: 1
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'nowrap'
                  }}>
                    <Typography
                      variant={'h6'}
                      component={'div'}
                      fontSize={16}
                      sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}
                    >
                      {subSubjectsQueryOptions.loading
                        ? (
                          <>
                            Загрузка тегов
                            <CircularProgress size={25} sx={{ ml: 2 }}/>
                          </>
                        )
                        : tagsListOpen
                          ? `Список тегов для "${value}"`
                          : subSubjectsQueryOptions.data?.subSubjects?.length
                            ? `Просмотреть теги: ${subSubjectsQueryOptions.data.subSubjects.length}`
                            : 'Тегов не найдено'
                      }
                    </Typography>
                    <IconButton onClick={() => setTagListOpen( prev => !prev )}>
                      <ArrowCircleDown
                        color={'primary'}
                        sx={{
                          transform: `${tagsListOpen ? 'rotate(180deg)' : ''}`,
                          transition: 'all .3s ease-in'
                        }}
                      />
                    </IconButton>
                  </Box>
                </ListSubheader>
                {subSubjectsQueryOptions.data?.subSubjects?.length &&
                subSubjectsQueryOptions.data.subSubjects.map( item => (
                  <ListItem sx={{ p: 0.5, pl: 1 }}>
                    {tagEditing?.id !== item.id ? (
                      <>
                        <ListItemText sx={{ maxWidth: 400 }}>
                          <Chip sx={{ fontSize: 16 }} label={'#' + item.title}/>
                        </ListItemText>
                        <ListItemSecondaryAction sx={{ p: 0 }}>
                          {!loadOptions.isLoad.items.includes( `${item.id || item.title}-deletable` )
                            ? (
                              <IconButton
                                onClick={() => setTagEditing( {
                                  id: item.id || '',
                                  title: item.title
                                } )}
                              >
                                <Edit color={'primary'}/>
                              </IconButton>
                            ) : <></>}
                          <Tooltip
                            sx={{ bgcolor: '#FFF' }}
                            placement={'top'}
                            arrow={true}
                            onClose={() => setTagTooltip( null )}
                            disableHoverListener={true}
                            disableTouchListener={true}
                            disableFocusListener={true}
                            open={tagTooltip === item.id}
                            title={(
                              <>
                                <Box
                                  sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}
                                >
                                  <Typography variant={'h6'} fontSize={16} mb={1}>
                                    Вы уверены, что хотите удалить этот тег?
                                  </Typography>
                                  <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'nowrap'
                                  }}>
                                    <Button
                                      variant={'contained'}
                                      color={'primary'}
                                      onClick={async () => {
                                        setTagTooltip( null )
                                        await loadOptions.withLoading( async () => {
                                          await deleteTagMutation( {
                                            variables: {
                                              id: item.id || ''
                                            }
                                          } )

                                          await subSubjectsQueryOptions.refetch()
                                        }, `Удаление тега - ${item.title}`, `${item.id || item.title}-deletable` )
                                      }}
                                    >
                                      Да
                                    </Button>
                                    <Button
                                      variant={'contained'}
                                      color={'warning'}
                                      onClick={() => setTagTooltip( null )}
                                    >
                                      Нет
                                    </Button>
                                  </Box>
                                </Box>
                              </>
                            )}
                          >

                            <IconButton onClick={() => setTagTooltip( item.id || '' )}>
                              {loadOptions.isLoad.items.includes( `${item.id || item.title}-deletable` ) ? (
                                <CircularProgress size={25} color={'error'}/>
                              ) : (
                                <DeleteForeverOutlined color={'error'}/>
                              )}
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </>
                    ) : tagEditing && tagEditing.id === item.id && (
                      <>
                        <ListItemText sx={{}}>

                          <Divider sx={{ mb: 2 }}/>
                          <TextField
                            fullWidth={true}
                            value={tagEditing.title}
                            onChange={( e ) => {
                              setTagEditing( prev => ( { ...prev, title: e.target.value } ) )
                            }}
                            disabled={loadOptions.isLoad.items.includes( tagEditing.id )}
                            variant={'outlined'}
                            label={'Название тега'}
                            sx={{ maxWidth: 400 }}
                          />
                          <Divider sx={{ mt: 2 }}/>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {loadOptions.isLoad.items.includes( tagEditing.id ) ? (
                            <>
                              <CircularProgress color={'primary'} size={25}/>
                            </>
                          ) : (
                            <>
                              <IconButton sx={{ mr: 0 }} onClick={async () => {
                                await loadOptions.withLoading( async () => {
                                  try {
                                    await editTagMutation( {
                                      variables: {
                                        id: tagEditing.id,
                                        data: {
                                          title: tagEditing.title,
                                          parentID: data.id
                                        }
                                      }
                                    } )

                                    await subSubjectsQueryOptions.refetch()
                                    await setTagEditing( initialTagEditingState )
                                  } catch (e) {
                                    console.log( e )
                                    return
                                  }
                                }, 'Сохранение изменений...', tagEditing.id )
                              }}>
                                <CheckCircle color={'primary'}/>
                              </IconButton>
                              <IconButton onClick={() => setTagEditing( initialTagEditingState )}>
                                <Close color={'error'}/>
                              </IconButton>
                            </>
                          )}
                        </ListItemSecondaryAction>
                      </>

                    )}
                  </ListItem>
                ) ) || (
                  <ListItem>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant={'subtitle1'}>
                        Тегов не найдено!
                      </Typography>
                    </Box>
                  </ListItem>
                )}
              </List>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 2 }}>
          <Button variant={'outlined'} onClick={() => setState( null )}>
            Закрыть
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

interface SectionItemType {
  title: string,
  key: string,
  icon: ( IconProps: SvgIconProps ) => ReactNode
}

export const SubjectsConfig: React.FC = () => {
  const [addSubject, addSubjectOptions] = useAddNewSubjectMutation()
  const subjectsList = useAcademicSubjectsListQuery()
  const [dialogOpen, setDialogOpen] = useState( false )
  const [textField, setTextField] = useState( '' )
  const [listIsOpen, setListIsOpen] = useState( true )
  const [editorState, setEditorState] = useState<null | SubjectItem>( null )
  const [openingSection, setOpeningSection] = useState<SectionItemType | null>( null )

  const sectionList: Array<SectionItemType> = [
    {
      title: 'Список предметов',
      key: 'subject-list',
      icon: ( IconProps ) => <ListAltOutlined {...IconProps}/>
    },
    {
      title: 'Параметры предметов и тегов',
      key: 'params',
      icon: ( IconProps ) => <SettingsApplicationsOutlined {...IconProps}/>
    }
  ]
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'nowrap',
          mb: 2
        }}>
          {openingSection ? (
            <IconButton onClick={() => setOpeningSection( null )}>
              <ArrowBack color={'primary'}/>
            </IconButton>
          ) : <></>}


          <Typography variant={'h2'} fontSize={22} sx={{ m: 0, p: 0, mr: 2, pl: 2 }}>
            {openingSection?.title || 'Управление предметами'}
          </Typography>
          <IconButton
            onClick={() => {
              setDialogOpen( true )
            }}
          >
            <AddCircle color={'primary'}/>
          </IconButton>
        </Box>
        {!openingSection ? (
          <Grid container columnSpacing={2} alignItems={'stretch'}>
            {sectionList.map( item => (
              <Grid item xs={4} md={4} lg={2}>
                <MyBox
                  onClick={() => setOpeningSection( item )}
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    border: `2px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: 'all .3s ease-in',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: `0px 2px 12px 3px ${theme.palette.info.main}`
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {item.icon( {
                      sx: {
                        fontSize: 100
                      },
                      color: 'primary'
                    } )}
                  </Box>
                  <Typography variant={'h6'} fontSize={16} textAlign={'center'}>
                    {item.title}
                  </Typography>
                </MyBox>
              </Grid>
            ) )}
          </Grid>
        ) : (
          <>
            {openingSection.key === 'subject-list' && subjectsList.data?.academicSubjects ? (
              <Box
              >
                <List sx={{
                  maxWidth: '50%',
                  overflow: 'scroll',
                  padding: listIsOpen ? `0px 12px 12px 12px` : `0px 12px`,
                  maxHeight: listIsOpen ? 400 : 50,
                  transition: 'all .3s ease-in',
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: `0px 3px 12px 3px ${theme.palette.divider}`
                }}>
                  <ListSubheader sx={{ p: 0, pt: 1, pb: 1, height: 50 }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'nowrap',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <Typography variant={'subtitle1'} sx={{ m: 0, p: 0 }}>
                        Список созданных предметов
                      </Typography>
                      {!listIsOpen ? (
                        <>
                          <KeyboardArrowDown sx={{ cursor: 'pointer' }} color={'disabled'}
                                             onClick={() => setListIsOpen( true )}/>
                        </>
                      ) : (
                        <>
                          <Close sx={{ cursor: 'pointer' }} color={'disabled'}
                                 onClick={() => setListIsOpen( false )}/>
                        </>
                      )}
                    </Box>
                  </ListSubheader>
                  {listIsOpen && subjectsList.data.academicSubjects.map( item => (
                    <>
                      <ListItem sx={{ pl: 0, pr: 0 }}>
                        <ListItemText>
                          {item.title}
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => setEditorState( {
                            id: item.id,
                            title: item.title,
                            description: item.description || ''
                          } )}>
                            <Edit color={'primary'}/>
                          </IconButton>
                          <IconButton>
                            <DeleteForeverOutlined color={'error'}/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider/>
                    </>
                  ) )}
                </List>
              </Box>
            ) : <></>}
          </>
        )}


      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen( false )}>
        <DialogTitle>
          Добавьте новый предмет
        </DialogTitle>
        <DialogContentText>
          <TextField
            label={'Укажите название предмета'}
            value={textField}
            onChange={( e ) => setTextField( e.target.value )}
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={async () => {
            try {
              await addSubject( {
                variables: {
                  data: {
                    title: textField
                  }
                }
              } )
              await subjectsList.refetch()

              setDialogOpen( false )
            } catch (e) {
              console.log( e )
              return
            }
          }}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      {editorState && <EditingSubjectDialog data={editorState} setState={setEditorState}/>}
    </>
  )
}