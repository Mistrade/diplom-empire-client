import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubjectItem } from './SubjectsList'
import { useSubSubjectsQuery } from '../ProjectSettings/SubjectManagement/graphqlTypes/subsubject'
import { useAddNewSubSubjectMutation } from '../ProjectSettings/SubjectManagement/graphqlTypes/addNewSubSubject'
import { useLoading } from '../../../hooks/useLoading'
import { useEditSubSubjectMutation } from '../ProjectSettings/SubjectManagement/graphqlTypes/editSubSubject'
import { useDeleteSubSubjectMutation } from '../ProjectSettings/SubjectManagement/graphqlTypes/deleteSubSubject'
import { useChangeSubjectInfoMutation } from '../ProjectSettings/TaskParameters/graphQL/graphqlTypes/changeSubjectInfo'
import { useSnackbar } from 'notistack'
import {
  Box, Button, Chip, CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle, Divider, IconButton,
  List, ListItem, ListItemSecondaryAction, ListItemText,
  ListSubheader, Stack, TextField, Tooltip,
  Typography
} from '@mui/material'
import {
  ArrowCircleDown,
  CheckCircle,
  Close,
  DeleteForeverOutlined,
  Edit
} from '@mui/icons-material'
import { theme } from '../../../index'
import { InputWithPlus } from '../ProjectSettings/TaskParameters/CreateTaskSection/SubjectsConfig'

interface ShowAddItemType {
  show: boolean,
  title: string,
}

export const SubjectOptionsModal: FC<{ data: SubjectItem, setState: Dispatch<SetStateAction<null | SubjectItem>> }> = ( {
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
          ) : (
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
              mb: 2,
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
            {subSubjectsQueryOptions.data?.subSubjects?.length && (
              <Box sx={{ mb: 2, width: '100%' }}>
                <Stack direction={'row'} spacing={2}>
                  <TextField
                    fullWidth={true}
                    label={'Максимум тегов к предмету'}
                    placeholder={'Укажите максимальное количество прикрепляемых тегов'}
                  />
                  <TextField
                    fullWidth={true}
                    label={''}
                  />
                </Stack>
              </Box>
            )}
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