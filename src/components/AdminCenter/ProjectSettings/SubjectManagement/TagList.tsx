import React, { useEffect, useState } from 'react'
import {
  SubSubjectsQuery,
  useSubSubjectsLazyQuery,
  useSubSubjectsQuery
} from './graphqlTypes/subsubject'
import {
  Box,
  Button,
  Chip,
  CircularProgress, Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { theme } from '../../../../index'
import { AddCircle, Check, Close, Delete, Edit, HourglassEmpty, Save } from '@mui/icons-material'
import { UnboxedArray } from '../../../TaskManager/CreateNewTask/CreateNewTask'
import { AcademicSubjectsListQuery } from './graphqlTypes/academicSubjects'
import { useAddNewSubSubjectMutation } from './graphqlTypes/addNewSubSubject'
import { useEditSubSubjectMutation } from './graphqlTypes/editSubSubject'
import { useDeleteSubSubjectMutation } from './graphqlTypes/deleteSubSubject'
import { useSnackbar } from 'notistack'
import { useLoading } from '../../../../hooks/useLoading'
import { Preloader } from '../../../Preloader/Preloader'

export const TagList: React.FC<{ selected: { id: string, title: string } }> = ( { selected } ) => {
  const { enqueueSnackbar } = useSnackbar()

  const { data, loading, refetch } = useSubSubjectsQuery( {
    variables: {
      parentID: selected.id
    }
  } )
  const [addItem, addItemQuery] = useAddNewSubSubjectMutation( {} )
  const subSubjectsQueryObject = useSubSubjectsQuery( {
    variables: {
      parentID: selected.id
    }
  } )
  const [editSubSubjects, editSubSubjectsQueryObject] = useEditSubSubjectMutation( {} )
  const [deleteSubSubject, deleteSubSubjectQueryObject] = useDeleteSubSubjectMutation()
  const { isLoad, withLoading } = useLoading( false )

  const [showAddItemInput, setShowAddItemInput] = useState<boolean>( false )
  const [textField, setTextField] = useState<string>( '' )
  const [candidateToRemoved, setCandidateToRemoved] = useState<UnboxedArray<SubSubjectsQuery['subSubjects']> | null>( null )
  const [editingTag, setEditingTag] = useState<typeof candidateToRemoved>( null )

  useEffect( () => {
    if( selected ) {
      withLoading( () => getTagsList() ).then()
    }
  }, [selected] )

  const methods = {
    async addSubItemHandler( selected: UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>, inputValue: string ) {
      if( textField && selected ) {

        try {

          await withLoading( async ( changeMessage ) => {
            await addItem( {
              variables: {
                data: {
                  title: inputValue,
                  parentID: selected.id
                }
              }
            } )

            await changeMessage( 'Обновляем список тегов...' )
            await subSubjectsQueryObject.refetch( {
              parentID: selected.id
            } )

          }, 'Создаем новый тег...' )

        } catch (e) {
          console.log( e )
        } finally {
          setTextField( '' )
        }
      }
    }
  }

  const editingSubSubjectHandler = async () => {
    if( editingTag ) {
      try {
        await withLoading( async ( changeMessage ) => {

          await editSubSubjects( {
            variables: {
              id: editingTag.id || '',
              data: { title: editingTag.title, parentID: editingTag.parentID || selected.id || '' }
            },
            onCompleted: async ( data ) => {
              enqueueSnackbar( data.editSubSubject?.message, { variant: data.editSubSubject?.status ? 'success' : 'error' } )
            }
          } )
          await setEditingTag( null )
          await changeMessage( 'Обновляем список тегов...' )
          await getTagsList()

        }, 'Изменяем тег...' )
      } catch (e) {

      }
    }
    return
  }

  const getTagsList = async () => {
    await subSubjectsQueryObject.refetch( { parentID: selected.id } )
  }

  const removeSubSubjectHandler = async () => {
    if( candidateToRemoved ) {
      try {
        await withLoading( async ( changeMessage ) => {
          await deleteSubSubject( {
            variables: {
              id: candidateToRemoved?.id || ''
            },
            onCompleted: async ( data ) => {
              if( data.deleteSubSubject?.message ) {
                enqueueSnackbar( data.deleteSubSubject.message, { variant: !data.deleteSubSubject.status ? 'error' : 'success' } )
              }
            }
          } )

          await setCandidateToRemoved( null )
          await changeMessage( 'Обновляем список тегов...' )
          await subSubjectsQueryObject.refetch( {
            parentID: selected?.id
          } )
        }, 'Обновление списка тегов...' )
      } catch (e) {
        console.log( e )
      }
    }
  }


  return (
    <>
      {isLoad.status ? (
        <Preloader message={isLoad.message} />
      ) : !subSubjectsQueryObject.error && selected ? (
        <>
          <List>
            <ListSubheader sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 75
            }}>
              <Box sx={{ flex: '1 0 70%', p: 1 }}>
                <Typography variant={'h6'} fontSize={18}>
                  Список тегов "{selected.title}",
                  найдено: {subSubjectsQueryObject.data?.subSubjects?.length || 0}
                </Typography>
              </Box>
              <Box
                sx={{ flex: '1 0 30%', p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant={'text'}
                  endIcon={showAddItemInput ? <Close color={'primary'}/> : <AddCircle
                    color={'primary'}/>}
                  onClick={() => setShowAddItemInput( prev => !prev )}
                >
                  {showAddItemInput ? 'Скрыть' : 'Добавить'}
                </Button>
              </Box>
            </ListSubheader>
            {showAddItemInput ? (
              <>
                <ListItem>
                  <ListItemText>
                    <Typography variant={'body1'} component={'h3'}>
                      Добавьте новый тег для "{selected.title}" прямо сейчас:
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ mb: 2, transition: 'all .3s ease-in' }}>
                  <ListItemText sx={{ pr: 2 }}>
                    <TextField
                      label={'Введите название тега'}
                      variant={'outlined'}
                      sx={{ width: '100%' }}
                      value={textField}
                      disabled={addItemQuery.loading}
                      onChange={( e ) => setTextField( e.target.value )}
                      onKeyDown={async ( e ) => {
                        if( e.code === 'Enter' ) {
                          await methods.addSubItemHandler( selected, textField )
                        }
                      }}
                    />
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={async () => await methods.addSubItemHandler( selected, textField )}
                    >
                      <Save color={!textField ? 'disabled' : 'success'}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
              </>
            ) : <></>}
            {subSubjectsQueryObject.data?.subSubjects?.length ? subSubjectsQueryObject.data.subSubjects.map( item => {
              return (
                <>
                  <>
                    <ListItem sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      '&:hover': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(240,240,240,.8)',
                        cursor: 'pointer'
                      }
                    }}>
                      {editingTag?.id === item.id ? (
                        <>
                          <ListItemText>
                            <Stack spacing={1} direction={'row'}
                                   sx={{ alignItems: 'center' }}>
                              <TextField
                                label={'Измените название тега'}
                                variant={'outlined'}
                                value={editingTag?.title || ''}
                                onChange={( e ) => setEditingTag( prev => ( {
                                  ...prev,
                                  title: e.target.value
                                } ) )}
                              />
                              <IconButton>
                                <Check color={'primary'} onClick={editingSubSubjectHandler}/>
                              </IconButton>
                              <IconButton>
                                <Close color={'error'} onClick={() => setEditingTag( null )}/>
                              </IconButton>
                            </Stack>
                          </ListItemText>
                        </>
                      ) : (
                        <>
                          <ListItemText>
                            <Chip
                              label={'#' + item.title}
                              sx={{ p: 1 }}
                            />
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <IconButton>
                              <Edit
                                color={'disabled'}
                                onClick={() => setEditingTag( item )}
                              />
                            </IconButton>
                            <IconButton>
                              <Delete
                                color={'error'}
                                onClick={() => setCandidateToRemoved( item )}
                              />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </>
                      )}
                    </ListItem>
                    <Divider/>
                  </>
                </>
              )
            } ) : (
              <ListItem>
                <ListItemAvatar>
                  <HourglassEmpty/>
                </ListItemAvatar>
                <ListItemText>
                  Здесь пока ничего нет...
                </ListItemText>
              </ListItem>
            )}

          </List>
        </>
      ) : (
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant={'h6'} sx={{ p: 2, display: 'block' }} component={'span'}>
            Выберите предмет для управления тегами
          </Typography>
        </Box>
      )}
      <Dialog
        open={!!candidateToRemoved}
        onClose={() => setCandidateToRemoved( null )}
      >
        <DialogTitle>
          Вы уверены, что хотите удалить следующие теги?
        </DialogTitle>
        <DialogContentText sx={{ p: 3 }}>
          <Chip label={'#' + candidateToRemoved?.title}/>
        </DialogContentText>
        <DialogActions>
          <Button
            variant={'contained'}
            sx={{ color: 'white' }}
            onClick={() => setCandidateToRemoved( null )}
          >
            Отмена
          </Button>
          <Button variant={'text'} onClick={removeSubSubjectHandler}>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}