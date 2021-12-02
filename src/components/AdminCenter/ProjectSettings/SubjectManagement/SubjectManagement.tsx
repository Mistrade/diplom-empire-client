import React, { useEffect, useState } from 'react'
import {
  AcademicSubjectsListQuery,
  useAcademicSubjectsListQuery
} from './graphqlTypes/academicSubjects'
import { useHistory } from 'react-router-dom'
import { CreateSubject } from './CreateSubject'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {
  AddCircle,
  Check,
  CheckCircle,
  Close,
  Delete,
  Edit,
  HourglassEmpty,
  Save
} from '@mui/icons-material'
import { SubSubjectsQuery, useSubSubjectsLazyQuery } from './graphqlTypes/subsubject'
import { useAddNewSubSubjectMutation } from './graphqlTypes/addNewSubSubject'
import { theme } from '../../../../index'
import { UnboxedArray } from '../../../TaskManager/CreateNewTask/CreateNewTask'
import { useEditSubSubjectMutation } from './graphqlTypes/editSubSubject'
import { useDeleteSubSubjectMutation } from './graphqlTypes/deleteSubSubject'
import { useSnackbar } from 'notistack'
import { TagList } from './TagList'

const SubjectManagement: React.FC = () => {
  //history hook
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  //graphql query's
  const academicSubjectsList = useAcademicSubjectsListQuery()

  //graphql lazy query's
  const [getSubSubjects, subSubjectsQueryObject] = useSubSubjectsLazyQuery( {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only'
  } )

  //graphql mutations
  const [addItem, addItemQuery] = useAddNewSubSubjectMutation( {} )
  const [editSubSubjects, editSubSubjectsQueryObject] = useEditSubSubjectMutation( {} )
  const [deleteSubSubject, deleteSubSubjectQueryObject] = useDeleteSubSubjectMutation()

  //component states
  const [creator, setCreator] = useState( false )
  const [textField, setTextField] = useState( '' )
  const [selected, setSelected] = useState<UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>>( null )
  const [showAddItemInput, setShowAddItemInput] = useState<boolean>( false )
  const [filteredValue, setFilteredValue] = useState<string | null>( null )
  const [candidateToRemoved, setCandidateToRemoved] = useState<UnboxedArray<SubSubjectsQuery['subSubjects']> | null>( null )
  const [editingTag, setEditingTag] = useState<typeof candidateToRemoved>( null )

  // useEffect( () => {
  //   console.log( subSubjectsQueryObject.loading )
  // }, [subSubjectsQueryObject.loading] )


  //actions handlers
  const getTagsList = async ( item: UnboxedArray<AcademicSubjectsListQuery['academicSubjects']> ) => {
    if( item ) {
      await setSelected( item )
      await subSubjectsQueryObject.refetch( { parentID: item?.id } )
    }
  }

  const addSubItemHandler = async ( selected: UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>, inputValue: string ) => {
    if( textField && selected ) {
      try {
        await addItem( {
          variables: {
            data: {
              title: inputValue,
              parentID: selected.id
            }
          }
        } )

        await subSubjectsQueryObject.refetch( {
          parentID: selected.id
        } )
      } catch (e) {
        console.log( e )
      } finally {
        setTextField( '' )
      }
    }
  }

  const removeSubSubjectHandler = async () => {
    if( candidateToRemoved ) {
      try {
        const res = await deleteSubSubject( {
          variables: {
            id: candidateToRemoved?.id || ''
          }
        } )

        if( res.data?.deleteSubSubject?.message ) {
          enqueueSnackbar( res.data.deleteSubSubject.message, { variant: !res.data?.deleteSubSubject?.status ? 'error' : 'success' } )
        }

        await setCandidateToRemoved( null )

        await subSubjectsQueryObject.refetch( {
          parentID: selected?.id
        } )

      } catch (e) {
        console.log( e )
      }
    }
  }

  const editingSubSubjectHandler = async () => {
    if( editingTag ) {
      try {
        const res = await editSubSubjects( {
          variables: {
            id: editingTag.id || '',
            data: { title: editingTag.title, parentID: editingTag.parentID || selected?.id || '' }
          },
          onCompleted: async ( data ) => {
            enqueueSnackbar( data.editSubSubject?.message, { variant: data.editSubSubject?.status ? 'success' : 'error' } )
            await setEditingTag( null )
            return await subSubjectsQueryObject.refetch( { parentID: `${selected?.id}` || '' } )
          }
        } )
      } catch (e) {

      }
    }
    return
  }

  // console.log( 'getList: ', subSubjectsQueryObject.loading, 'editing: ', editSubSubjectsQueryObject.loading, 'delete: ', deleteSubSubjectQueryObject.loading, 'add: ', addItemQuery.loading )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {selected ? (
        <TagList selected={selected.id}/>
      ) : <></>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, flexGrow: 3 }}>
        <Typography
          variant={'h1'}
          fontSize={30}
        >
          Управление предметами
        </Typography>

        <Button
          variant={'text'}
          endIcon={<AddCircle color={'primary'}/>}
          onClick={() => setCreator( prev => !prev )}
        >
          Создать новый предмет
        </Button>
      </Box>

      {creator ? (
        <>
          <CreateSubject onComplete={async () => {
            await academicSubjectsList.refetch()
          }}/>
        </>
      ) : <></>}

      <>
        {academicSubjectsList.error ? (
          <Typography variant={'h2'} fontSize={30}>
            Что-то пошло не так...
          </Typography>
        ) : academicSubjectsList.data?.academicSubjects ? (
          <Stack
            divider={<Divider orientation={'vertical'}/>}
            border={`1px solid ${theme.palette.divider}`}
            borderRadius={2}
            direction={'row'}
            mt={2}
            p={1}
            sx={{ height: '75vh' }}
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
                    <Typography variant={'h6'} fontSize={18}>
                      Список предметов,
                      найдено: {academicSubjectsList.data?.academicSubjects.length}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: '1 0 50%', p: 1 }}>
                    <TextField
                      label={'Фильтр по предметам'}
                      variant={'outlined'}
                      fullWidth={true}
                      value={filteredValue}
                      placeholder={'Укажите название предмета'}
                      onChange={( e ) => setFilteredValue( e.target.value )}
                    />
                  </Box>
                </ListSubheader>
                {academicSubjectsList.data?.academicSubjects
                  .filter( item => item.title.toLowerCase().includes( filteredValue?.toLowerCase() || '' ) )
                  .map( item => {
                    return (
                      <ListItem
                        key={item.id}
                        onClick={() => getTagsList( item )}
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
              {subSubjectsQueryObject.loading || editSubSubjectsQueryObject.loading || deleteSubSubjectQueryObject.loading || addItemQuery.loading ? (
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <CircularProgress sx={{ mb: 2 }}/>
                    </Box>
                    <Typography variant={'body1'} color={theme.palette.primary.main}>
                      Загрузка данных...
                    </Typography>
                  </Box>
                </Box>
              ) : !subSubjectsQueryObject.error && selected ? (
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
                        Список тегов "{selected?.title}",
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
                                await addSubItemHandler( selected, textField )
                              }
                            }}
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => addSubItemHandler( selected, textField )}>
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
            </Box>
          </Stack>
        ) : ( <></> )}
      </>
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
    </Box>
  )
}

export default SubjectManagement