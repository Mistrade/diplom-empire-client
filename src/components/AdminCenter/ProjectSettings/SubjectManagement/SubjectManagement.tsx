import React, { useEffect, useState } from 'react'
import {
  AcademicSubjectsListQuery,
  useAcademicSubjectsListQuery
} from './graphqlTypes/academicSubjects'
import { useHistory } from 'react-router-dom'
import { CreateSubject } from './CreateSubject'
import {
  Accordion, AccordionDetails,
  AccordionSummary, Box, Button, Chip, CircularProgress,
  Divider, FormControl, Grid, IconButton,
  List,
  ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction,
  ListItemText,
  ListSubheader, Stack, TextField, Typography
} from '@mui/material'
import {
  AddCircle,
  CheckCircle,
  Close,
  Delete,
  Edit,
  ExpandMore, HourglassEmpty,
  ListAlt, Save,
  Send
} from '@mui/icons-material'
import { useSubSubjectsLazyQuery, useSubSubjectsQuery } from './graphqlTypes/subsubject'
import { useAddNewSubSubjectMutation } from './graphqlTypes/addNewSubSubject'
import { theme } from '../../../../index'
import { UnboxedArray } from '../../../TaskManager/CreateNewTask/CreateNewTask'

const SubjectManagement: React.FC = () => {
  const history = useHistory()
  const { data, loading, error, refetch: refetchAcademicSubjects } = useAcademicSubjectsListQuery()
  const [creator, setCreator] = useState( false )
  const [getAlreadyExists, subQueryItem] = useSubSubjectsLazyQuery()
  const [addItem, addItemQuery] = useAddNewSubSubjectMutation()
  const [textField, setTextField] = useState( '' )
  const [selected, setSelected] = useState<UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>>( null )
  const [showAddItemInput, setShowAddItemInput] = useState<boolean>( false )
  const [filteredValue, setFilteredValue] = useState<string | null>( null )

  const getTagsList = async ( item: UnboxedArray<AcademicSubjectsListQuery['academicSubjects']> ) => {
    if( item ) {
      await setSelected( item )
      await getAlreadyExists( {
        variables: {
          parentID: item?.id
        }
      } )

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

        await subQueryItem.refetch( {
          parentID: selected.id
        } )
      } catch (e) {
        console.log( e )
      } finally {
        setTextField( '' )
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            await refetchAcademicSubjects()
          }}/>
        </>
      ) : <></>}

      <>
        {error ? (
          <Typography variant={'h2'} fontSize={30}>
            Что-то пошло не так...
          </Typography>
        ) : data?.academicSubjects ? (
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
                      Список предметов, найдено: {data.academicSubjects.length}
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
                {data.academicSubjects
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
              {subQueryItem.loading ? (
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
              ) : !subQueryItem.error && selected ? (
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
                        найдено: {subQueryItem.data?.subSubjects?.length}
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
                  {subQueryItem.data?.subSubjects?.length ? subQueryItem.data?.subSubjects?.map( item => {
                    return (
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
                            <Chip
                              label={'#' + item.title}
                              sx={{ p: 1 }}
                            />
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <IconButton>
                              <Edit color={'disabled'}/>
                            </IconButton>
                            <IconButton>
                              <Delete color={'error'}/>
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
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
    </Box>
  )
}

export default SubjectManagement