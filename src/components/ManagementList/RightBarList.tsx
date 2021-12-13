import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Preloader } from '../Preloader/Preloader'
import {
  Box,
  Button, Chip, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, IconButton,
  List,
  ListItem, ListItemAvatar, ListItemSecondaryAction,
  ListItemText,
  ListSubheader, Stack,
  TextField,
  Typography
} from '@mui/material'
import { theme } from '../../index'
import { AddCircle, Check, Close, Delete, Edit, HourglassEmpty, Save } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import {
  PreloaderProps,
  SetLoadingMessage,
  useLoading,
  WithLoadingType
} from '../../hooks/useLoading'
import { LeftBarListItem } from './ManagementList'

export interface RightBarActions {
  addItemHandler?: ( selected: LeftBarListItem, inputValue: string, setLoadingMessage: SetLoadingMessage ) => Promise<any>,
  editingHandler?: ( item: LeftBarListItem | null, setLoadingMessage: SetLoadingMessage ) => any,
  listItemVisible?: ( item: LeftBarListItem ) => ReactNode,
  removeHandler?: ( item: LeftBarListItem, selectedItem: LeftBarListItem, setList: Dispatch<SetStateAction<Array<LeftBarListItem>>>, setLoadingMessage: SetLoadingMessage ) => Promise<any>,
  onChangeSelected: ( selected: LeftBarListItem, setList: React.Dispatch<React.SetStateAction<Array<LeftBarListItem>>> ) => Promise<any>,
  onChangeSelectedLoadingMessage?: string,
  addItemComponent?: ( withLoad: WithLoadingType, selected: LeftBarListItem, setList: React.Dispatch<React.SetStateAction<Array<LeftBarListItem>>> ) => ReactNode
}

interface RightBarListProps extends RightBarActions {
  selected: LeftBarListItem,
  loadState?: PreloaderProps
}

export const RightBarList: React.FC<RightBarListProps> = ( {
                                                             selected,
                                                             addItemHandler,
                                                             editingHandler,
                                                             listItemVisible,
                                                             removeHandler,
                                                             loadState,
                                                             onChangeSelected,
                                                             onChangeSelectedLoadingMessage,
                                                             addItemComponent
                                                           } ) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isLoad, withLoading, setLoading } = useLoading( false, 'Загрузка данных...' )

  const [showAddItemInput, setShowAddItemInput] = useState<boolean>( false )
  const [textField, setTextField] = useState<string>( '' )
  const [candidateToRemoved, setCandidateToRemoved] = useState<LeftBarListItem | null>( null )
  const [editingTag, setEditingTag] = useState<LeftBarListItem | null>( null )
  const [list, setList] = useState<Array<LeftBarListItem>>( [] )

  useEffect( () => {
    getList().then()
    console.log( selected )
  }, [selected] )

  const getList = async () => {
    await withLoading( async () => {
      await onChangeSelected( selected, setList )
    }, onChangeSelectedLoadingMessage || 'Загрузка списка...' )
  }

  const onRemove = async ( item: LeftBarListItem ) => {
    console.log( 'onRemove Item: ', item )
    console.log( removeHandler )
    if( !removeHandler ) {
      return
    }


    await withLoading( async ( changeMessage ) => {
      try {
        await removeHandler( item, selected, setList, changeMessage )
        await setCandidateToRemoved( null )
        await enqueueSnackbar( 'Успешно удалено!', { variant: 'success' } )
      } catch (e) {
        console.log( e )
        await enqueueSnackbar( 'При удалении произошла непредвиденная ошибка!', { variant: 'error' } )
        return null
      }
    } )
  }

  const onEditingItem = async ( item: LeftBarListItem ) => {
    if( !editingHandler ) {
      return
    }

    await withLoading( async ( changeMessage ) => {
      await editingHandler( item, changeMessage )
    } )
  }

  const onAddItem = async ( selected: LeftBarListItem, inputValue: string ) => {
    if( !addItemHandler ) {
      return
    }

    await withLoading( async ( changeMessage ) => {
      await addItemHandler( selected, inputValue, changeMessage )
    } )
  }


  return (
    <>
      {isLoad.status ? (
        <Preloader message={isLoad.message}/>
      ) : selected ? (
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
                  найдено: {list.length || 0}
                </Typography>
              </Box>
              {addItemHandler || addItemComponent ? (
                <Box
                  sx={{ flex: '1 0 30%', p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant={'text'}
                    endIcon={showAddItemInput
                      ? <Close color={'primary'}/>
                      : <AddCircle color={'primary'}/>
                    }
                    onClick={() => setShowAddItemInput( prev => !prev )}
                  >
                    {showAddItemInput ? 'Скрыть' : 'Добавить'}
                  </Button>
                </Box>
              ) : <></>}
            </ListSubheader>
            {showAddItemInput && onAddItem && !addItemComponent ? (
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
                      disabled={isLoad.status}
                      onChange={( e ) => setTextField( e.target.value )}
                      onKeyDown={async ( e ) => {
                        if( e.code === 'Enter' ) {
                          await onAddItem( selected, textField )
                        }
                      }}
                    />
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={async () => await onAddItem( selected, textField )}
                    >
                      <Save color={!textField ? 'disabled' : 'success'}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
              </>
            ) : showAddItemInput && addItemComponent ? (
              <>
                <ListItem>
                  {addItemComponent( withLoading, selected, setList )}
                </ListItem>
                <Divider/>
              </>
            ) : <></>}
            {list.length ? list.map( item => {
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
                            <Stack
                              spacing={1}
                              direction={'row'}
                              sx={{ alignItems: 'center' }}
                            >
                              <TextField
                                label={'Измените название тега'}
                                variant={'outlined'}
                                value={editingTag?.title || ''}
                                onChange={( e ) => setEditingTag( prev => {
                                  if( prev ) {
                                    return {
                                      ...prev,
                                      title: e.target.value
                                    }
                                  } else {
                                    return null
                                  }
                                } )}
                              />
                              <IconButton>
                                <Check
                                  color={'primary'}
                                  onClick={() => onEditingItem( editingTag )}
                                />
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
                            {listItemVisible ? listItemVisible( item ) : (
                              <Chip
                                label={'#' + item.title}
                                sx={{ p: 1 }}
                              />
                            )}
                          </ListItemText>
                          {editingHandler || removeHandler ? (
                            <ListItemSecondaryAction>
                              {editingHandler ? (
                                <IconButton>
                                  <Edit
                                    color={'disabled'}
                                    onClick={() => setEditingTag( item )}
                                  />
                                </IconButton>
                              ) : <></>}
                              {removeHandler ? (
                                <IconButton>
                                  <Delete
                                    color={'error'}
                                    onClick={() => setCandidateToRemoved( item )}
                                  />
                                </IconButton>
                              ) : <></>}
                            </ListItemSecondaryAction>
                          ) : <></>}
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
      {removeHandler && candidateToRemoved ? (
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
            <Button variant={'text'} onClick={() => onRemove( candidateToRemoved )}>
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>
      ) : <></>}
    </>
  )
}

//
// export const TagList: React.FC<{ selected: { id: string, title: string } }> = ( { selected } ) => {
//   const { enqueueSnackbar } = useSnackbar()
//
//   const { data, loading, refetch } = useSubSubjectsQuery( {
//     variables: {
//       parentID: selected.id
//     }
//   } )
//   const [addItem, addItemQuery] = useAddNewSubSubjectMutation( {} )
//   const subSubjectsQueryObject = useSubSubjectsQuery( {
//     variables: {
//       parentID: selected.id
//     }
//   } )
//   const [editSubSubjects, editSubSubjectsQueryObject] = useEditSubSubjectMutation( {} )
//   const [deleteSubSubject, deleteSubSubjectQueryObject] = useDeleteSubSubjectMutation()
//   const { isLoad, withLoading } = useLoading( false )
//

//
//   useEffect( () => {
//     if( selected ) {
//       withLoading( () => getTagsList() ).then()
//     }
//   }, [selected] )
//
//   const methods = {
//     async addSubItemHandler( selected: UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>, inputValue: string ) {
//       if( textField && selected ) {
//
//         try {
//
//           await withLoading( async ( changeMessage ) => {
//             await addItem( {
//               variables: {
//                 data: {
//                   title: inputValue,
//                   parentID: selected.id
//                 }
//               }
//             } )
//
//             await changeMessage( 'Обновляем список тегов...' )
//             await subSubjectsQueryObject.refetch( {
//               parentID: selected.id
//             } )
//
//           }, 'Создаем новый тег...' )
//
//         } catch (e) {
//           console.log( e )
//         } finally {
//           setTextField( '' )
//         }
//       }
//     }
//   }
//
//   const editingSubSubjectHandler = async () => {
//     if( editingTag ) {
//       try {
//         await withLoading( async ( changeMessage ) => {
//
//           await editSubSubjects( {
//             variables: {
//               id: editingTag.id || '',
//               data: { title: editingTag.title, parentID: editingTag.parentID || selected.id || '' }
//             },
//             onCompleted: async ( data ) => {
//               enqueueSnackbar( data.editSubSubject?.message, { variant: data.editSubSubject?.status ? 'success' : 'error' } )
//             }
//           } )
//           await setEditingTag( null )
//           await changeMessage( 'Обновляем список тегов...' )
//           await getTagsList()
//
//         }, 'Изменяем тег...' )
//       } catch (e) {
//
//       }
//     }
//     return
//   }
//
//   const getTagsList = async () => {
//     await subSubjectsQueryObject.refetch( { parentID: selected.id } )
//   }
//
//   const removeSubSubjectHandler = async () => {
//     if( candidateToRemoved ) {
//       try {
//         await withLoading( async ( changeMessage ) => {
//           await deleteSubSubject( {
//             variables: {
//               id: candidateToRemoved?.id || ''
//             },
//             onCompleted: async ( data ) => {
//               if( data.deleteSubSubject?.message ) {
//                 enqueueSnackbar( data.deleteSubSubject.message, { variant: !data.deleteSubSubject.status ? 'error' : 'success' } )
//               }
//             }
//           } )
//
//           await setCandidateToRemoved( null )
//           await changeMessage( 'Обновляем список тегов...' )
//           await subSubjectsQueryObject.refetch( {
//             parentID: selected?.id
//           } )
//         }, 'Обновление списка тегов...' )
//       } catch (e) {
//         console.log( e )
//       }
//     }
//   }
//
//
//
// }