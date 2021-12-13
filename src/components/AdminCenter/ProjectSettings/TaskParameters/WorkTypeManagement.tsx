import React, { FormEvent, KeyboardEventHandler, useEffect, useState } from 'react'
import { useGetWorkTypesQuery } from './graphQL/graphqlTypes/getWorkTypes'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider, FormControl,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Stack, TextField,
  Typography
} from '@mui/material'
import { AddCircle, Check, Close, Delete, HourglassEmpty } from '@mui/icons-material'
import { useSaveWorkTypeMutation } from './graphQL/graphqlTypes/saveWorkType'
import { useLoading, WithLoadingType } from '../../../../hooks/useLoading'
import { Preloader } from '../../../Preloader/Preloader'
import { LeftBarListItem, ManagementList } from '../../../ManagementList/ManagementList'
import { useGetTaskDeliveryObjectsQuery } from './graphQL/graphqlTypes/getTaskDeliveryObjects'
import {
  GetAvailableTaskDeliveryMethodsQueryResult,
  useGetAvailableTaskDeliveryMethodsLazyQuery,
  useGetAvailableTaskDeliveryMethodsQuery
} from './graphQL/graphqlTypes/getAvailableTaskDeliveryMethods'
import { useChangeTaskDeliveriesForWorkTypesMutation } from './graphQL/graphqlTypes/changeTaskDeliveriesForWorkTypes'
import { theme } from '../../../../index'
import { useSnackbar } from 'notistack'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import { useSaveTaskDeliveryObjectMutation } from './graphQL/graphqlTypes/addNewTaskDeliveryObject'
import { CreateTaskConfig } from './CreateTaskSection/CreateTaskConfig'

export type WorkTypeManagementModalProps = 'work-type' | 'task-delivery'

const WorkTypeManagementRightList: React.FC<{ selected: LeftBarListItem, refetch: boolean, setRefetchStatus: React.Dispatch<React.SetStateAction<any>> }> = ( {
                                                                                                                                                                selected,
                                                                                                                                                                refetch,
                                                                                                                                                                setRefetchStatus
                                                                                                                                                              } ) => {
  const queryOptions = useGetAvailableTaskDeliveryMethodsQuery( {
    variables: {
      parent: selected.id
    }
  } )
  const [mutation, mutationOptions] = useChangeTaskDeliveriesForWorkTypesMutation()
  const { withLoading, isLoad, setLoading } = useLoading()
  const [showAddItem, setShowAddItem] = useState( false )
  const [candidateToRemoved, setCandidateToRemoved] = useState<LeftBarListItem | null>( null )
  const { enqueueSnackbar } = useSnackbar()


  useEffect( () => {
    fetchData().then()
  }, [selected] )

  useEffect( () => {
    if( selected && refetch ) {
      fetchData().then()
      setRefetchStatus( null )
    }
  }, [selected, refetch] )

  const fetchData = async () => {
    withLoading( async () => {
      await queryOptions.refetch( {
        parent: selected.id
      } ).then()
    }, 'Обновление списка...' ).then()
  }

  const onRemove = async ( item: LeftBarListItem ) => {
    await withLoading( async () => {
      try {
        await setCandidateToRemoved( null )

        await mutation( {
          variables: {
            parent: selected.id,
            data: [item.id],
            isDelete: true
          }
        } )

        await queryOptions.refetch( {
          parent: selected.id
        } )

        await enqueueSnackbar( `${item.title} - успешно удален`, { variant: 'success' } )

        return
      } catch (e) {
        await enqueueSnackbar( `При удалении ${item.title} произошла ошибка!`, { variant: 'error' } )
        console.log( e )
        return
      }
    }, `Удаляем ${item.title}...` )
  }

  const addItem = async ( item: LeftBarListItem ) => {
    await withLoading( async () => {
      try {
        await mutation( {
          variables: {
            parent: selected.id,
            data: [item.id],
            isDelete: false
          }
        } )

        await queryOptions.refetch( {
          parent: selected.id
        } )

        await enqueueSnackbar( `${item.title} успешно добавлен к "${selected.title}"`, { variant: 'success' } )
      } catch (e) {
        await enqueueSnackbar( `При добавлении ${item.title} к типу работы "${selected.title}" - произошла ошибка!`, { variant: 'error' } )
      }
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
                  Способы доставки работы для типа: "{selected.title}"
                </Typography>
              </Box>
              <Box
                sx={{ flex: '1 0 30%', p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant={'text'}
                  endIcon={showAddItem
                    ? <Close color={'primary'}/>
                    : <AddCircle color={'primary'}/>
                  }
                  onClick={() => setShowAddItem( prev => !prev )}
                >
                  {showAddItem ? 'Скрыть' : 'Добавить'}
                </Button>
              </Box>
            </ListSubheader>
            {showAddItem ? (
              <>
                {isLoad.status ? (
                  <Box sx={{ width: '100%', p: 3 }}>
                    <Preloader message={isLoad.message}/>
                  </Box>
                ) : (
                  <Box sx={{ width: '100%' }}>
                    {queryOptions.data?.availableTaskDeliveryMethods.available.length ? (
                      <>
                        <Typography variant={'h6'} m={2} textAlign={'center'}>
                          Доcтупные для добавления элементы
                        </Typography>
                        <List>
                          {queryOptions.data?.availableTaskDeliveryMethods.available.map( item => (
                            <>
                              <ListItem>
                                <ListItemText>
                                  {item.name}
                                </ListItemText>
                                <ListItemSecondaryAction>
                                  <IconButton onClick={async () => {
                                    await addItem( { id: item.id, title: item.name, data: item } )
                                  }}>
                                    <AddCircle color={'primary'} sx={{ fontSize: 24 }}/>
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                              <Divider sx={{ width: '100%' }}/>
                            </>
                          ) )}
                        </List>
                      </>
                    ) : (
                      <Stack direction={'row'} m={3} p={2} alignItems={'center'}
                             justifyContent={'center'}
                             sx={{ backgroundColor: 'rgba(240,240,240,.9)', borderRadius: 8 }}>
                        <Box>
                          <Check sx={{ fontSize: 50 }} color={'primary'}/>
                        </Box>
                        <Box>
                          <Typography variant={'h6'} m={1} textAlign={'center'}>
                            Для "{selected.title}" добавлены все варианты доставки
                          </Typography>
                        </Box>
                      </Stack>
                    )}
                  </Box>
                )
                }
              </>
            ) : <></>}
            <Typography variant={'h6'} m={2} textAlign={'center'}>
              Добавлено к {selected.title}
            </Typography>
            {queryOptions.data?.availableTaskDeliveryMethods.alreadyExists.length ?
              queryOptions.data.availableTaskDeliveryMethods.alreadyExists.map( item => {
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
                        <ListItemText>
                          <Stack
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                              alignItems: 'center',
                              flexWrap: 'nowrap'
                            }}
                            direction={'row'}
                          >
                            <Box>
                              <Typography variant={'subtitle1'}>
                                {item.name}
                              </Typography>
                            </Box>
                            <Box>
                              <IconButton>
                                <Delete
                                  color={'error'}
                                  onClick={() => setCandidateToRemoved( {
                                    id: item.id,
                                    title: item.name,
                                    data: item
                                  } )}
                                />
                              </IconButton>
                            </Box>
                          </Stack>
                        </ListItemText>
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
      {candidateToRemoved ? (
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

interface WorkTypeManagementModalComponentProps {
  state: WorkTypeManagementModalProps | null,
  closeHandler: () => any,
  onComplete?: ( state: WorkTypeManagementModalProps ) => Promise<any>
}

const WorkTypeManagementModal: React.FC<WorkTypeManagementModalComponentProps> = ( props ) => {

  if( !props.state ) return <></>

  return (
    <>
      {props.state === 'work-type' ? (
        <AddWorkTypeForm {...props} />
      ) : props.state === 'task-delivery' ? (
        <AddTaskDeliveryObjectForm {...props} />
      ) : <></>}
    </>
  )
}

const AddTaskDeliveryObjectForm: React.FC<WorkTypeManagementModalComponentProps> = ( {
                                                                                       state,
                                                                                       closeHandler,
                                                                                       onComplete
                                                                                     } ) => {
  const [addTaskDeliveryObject, addWorkTypeOptions] = useSaveTaskDeliveryObjectMutation()
  const [value, setValue] = useState<string>( '' )
  const [disable, setDisable] = useState<boolean>( false )
  const addItemHandler = async ( e?: FormEvent<HTMLFormElement> ) => {
    if( e ) {
      e.preventDefault()
    }

    try {
      setDisable( true )
      await addTaskDeliveryObject( {
        variables: {
          name: value
        }
      } )
      await closeHandler()
      if( onComplete ) {
        await onComplete( 'task-delivery' )
      }
    } finally {
      setDisable( false )
    }
  }

  const keyDownHandler = async ( e: React.KeyboardEvent<HTMLFormElement> ) => {
    if( e.code === 'Enter' ) {
      e.preventDefault()
      await addItemHandler()
    }
  }

  return (
    <Dialog
      disableAutoFocus={true}
      open={state === 'task-delivery'}
      onClose={closeHandler}
      fullWidth={true}
      BackdropProps={{
        sx: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
      maxWidth={'sm'}
    >
      <form onSubmit={addItemHandler} onKeyDown={keyDownHandler}>
        <Box sx={{ pl: 4, pr: 4 }}>
          <DialogTitle sx={{ p: 0, mt: 2, mb: 2 }}>
            Добавьте новый вариант доставки задания
          </DialogTitle>
          <DialogContentText sx={{ mb: 2 }}>
            <FormControl fullWidth={true}>
              <TextField
                disabled={disable}
                value={value}
                onChange={( e ) => setValue( e.target.value )}
                required
                label={'Укажите название варианта доставки задания...'}
              />
            </FormControl>
          </DialogContentText>
          <DialogActions>
            <Button variant={'text'} onClick={() => closeHandler()}>
              Закрыть
            </Button>
            <Button
              variant={'contained'}
              disabled={disable} color={'primary'}
              sx={{ color: 'white' }}
              type={'submit'}
            >
              Создать
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  )
}

const AddWorkTypeForm: React.FC<WorkTypeManagementModalComponentProps> = ( {
                                                                             state,
                                                                             closeHandler,
                                                                             onComplete
                                                                           } ) => {

  const [addWorkType, addWorkTypeOptions] = useSaveWorkTypeMutation()
  const [value, setValue] = useState<string>( '' )
  const [disable, setDisable] = useState<boolean>( false )
  const addItemHandler = async ( e?: FormEvent<HTMLFormElement> ) => {
    if( e ) {
      e.preventDefault()
    }

    try {
      setDisable( true )
      await addWorkType( {
        variables: {
          name: value
        }
      } )
      await closeHandler()
      if( onComplete ) {
        await onComplete( 'work-type' )
      }
    } finally {
      setDisable( false )
    }
  }

  const keyDownHandler = async ( e: React.KeyboardEvent<HTMLFormElement> ) => {
    if( e.code === 'Enter' ) {
      e.preventDefault()
      await addItemHandler()
    }
  }

  return (
    <Dialog
      disableAutoFocus={true}
      open={state === 'work-type'}
      onClose={closeHandler}
      fullWidth={true}
      BackdropProps={{
        sx: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
      maxWidth={'sm'}
    >
      <form onSubmit={addItemHandler} onKeyDown={keyDownHandler}>
        <Box sx={{ pl: 4, pr: 4 }}>
          <DialogTitle sx={{ p: 0, mt: 2, mb: 2 }}>
            Добавьте новый тип работы
          </DialogTitle>
          <DialogContentText sx={{ mb: 2 }}>
            <FormControl fullWidth={true}>
              <TextField
                disabled={disable}
                value={value}
                onChange={( e ) => setValue( e.target.value )}
                required
                label={'Укажите название типа работы...'}
              />
            </FormControl>
          </DialogContentText>
          <DialogActions>
            <Button variant={'text'} onClick={() => closeHandler()}>
              Закрыть
            </Button>
            <Button
              variant={'contained'}
              disabled={disable} color={'primary'}
              sx={{ color: 'white' }}
              type={'submit'}
            >
              Создать
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  )
}

export const WorkTypeManagement: React.FC = () => {
  const workTypesList = useGetWorkTypesQuery()
  const [modal, setModal] = useState<WorkTypeManagementModalProps | null>( null )
  const [refetchStatus, setRefetchStatus] = useState<WorkTypeManagementModalProps | null>( null )
  return (
    <>
      <CreateTaskConfig/>
      {/*<Stack*/}
      {/*  sx={{ mt: 2, mb: 2 }}*/}
      {/*  direction={'row'}*/}
      {/*  divider={<Divider*/}
      {/*    orientation={'vertical'}*/}
      {/*    sx={{ ml: 1, mr: 1, width: 2, height: '100%' }}*/}
      {/*  />}*/}
      {/*>*/}
      {/*  <Button color={'primary'} variant={'outlined'} onClick={() => setModal( 'work-type' )}>*/}
      {/*    Создать тип работы*/}
      {/*  </Button>*/}
      {/*  <Button color={'primary'} variant={'outlined'} onClick={() => setModal( 'task-delivery' )}>*/}
      {/*    Создать тип доставки работы*/}
      {/*  </Button>*/}
      {/*</Stack>*/}
      {/*<ManagementList*/}
      {/*  leftBarConfig={{*/}
      {/*    title: 'Типы выполняемых работ'*/}
      {/*  }}*/}
      {/*  leftBarList={workTypesList.data?.workTypes*/}
      {/*    .map( item => ( {*/}
      {/*      id: item?.id || '',*/}
      {/*      title: item?.name || '',*/}
      {/*      data: item*/}
      {/*    } ) )*/}
      {/*    .sort( ( a, b ) => {*/}
      {/*      return ( a.data?.created || 0 ) > ( b.data?.created || 0 ) ? -1 : 1*/}
      {/*    } ) || []*/}
      {/*  }*/}
      {/*  filterInputConfig={{*/}
      {/*    label: 'Фильтр по типам работ',*/}
      {/*    placeholder: 'Укажите тип работы',*/}
      {/*    onChange: ( value, setList, list ) => {*/}
      {/*      return setList( list.filter( item => item.title.toLowerCase().includes( value.toLowerCase() ) ) )*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  fullComponentIsLoad={{*/}
      {/*    status: workTypesList.loading,*/}
      {/*    message: 'Загрузка типов работ...'*/}
      {/*  }}*/}
      {/*  rightList={( selected ) => (*/}
      {/*    <>*/}
      {/*      {selected ? (*/}
      {/*        <WorkTypeManagementRightList*/}
      {/*          selected={selected}*/}
      {/*          refetch={refetchStatus === 'task-delivery'}*/}
      {/*          setRefetchStatus={setRefetchStatus}*/}
      {/*        />*/}
      {/*      ) : (*/}
      {/*        <Box*/}
      {/*          sx={{*/}
      {/*            width: '100%',*/}
      {/*            height: '100%',*/}
      {/*            display: 'flex',*/}
      {/*            justifyContent: 'center',*/}
      {/*            alignItems: 'center'*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <Box sx={{*/}
      {/*            m: 3,*/}
      {/*            p: 3,*/}
      {/*            display: 'flex',*/}
      {/*            justifyContent: 'center',*/}
      {/*            alignItems: 'center',*/}
      {/*            flexWrap: 'wrap'*/}
      {/*          }}>*/}

      {/*            <SpellcheckIcon sx={{ fontSize: 50, mb: 3 }} color={'primary'}/>*/}
      {/*            <Box sx={{ width: '100%' }}>*/}
      {/*              <Typography variant={'h3'} component={'h3'} fontSize={24} textAlign={'center'}>*/}
      {/*                Выберите тип работы для управления вариантами доставки готовой работы*/}
      {/*              </Typography>*/}
      {/*            </Box>*/}
      {/*          </Box>*/}
      {/*        </Box>*/}
      {/*      )}*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*/>*/}
      {modal ? (
        <WorkTypeManagementModal
          state={modal}
          closeHandler={() => setModal( null )}
          onComplete={async ( state ) => {
            if( state === 'work-type' ) {
              await workTypesList.refetch()
            } else if( state === 'task-delivery' ) (
              setRefetchStatus( 'task-delivery' )
            )
          }}
        />
      ) : <></>}
    </>
  )
}