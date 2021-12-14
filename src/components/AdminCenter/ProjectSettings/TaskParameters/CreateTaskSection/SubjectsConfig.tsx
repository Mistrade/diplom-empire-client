import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  Box,
  Button, CircularProgress,
  Dialog,
  DialogActions, DialogContent,
  DialogContentText,
  DialogTitle,
  Divider, FormControl,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField, TextFieldProps,
  Typography
} from '@mui/material'
import {
  AddCircle, Close,
  DeleteForeverOutlined,
  Edit, KeyboardArrowDown,
  KeyboardArrowDownOutlined
} from '@mui/icons-material'
import { useAddNewSubSubjectMutation } from '../../SubjectManagement/graphqlTypes/addNewSubSubject'
import { useAcademicSubjectsListQuery } from '../../SubjectManagement/graphqlTypes/academicSubjects'
import { useAddNewSubjectMutation } from '../../SubjectManagement/graphqlTypes/addNewSubject'
import { theme } from '../../../../../index'
import { useSubSubjectsQuery } from '../../SubjectManagement/graphqlTypes/subsubject'
import { useLoading } from '../../../../../hooks/useLoading'

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
  onButtonClick: () => any,
  loading?: boolean
}

const InputWithPlus: FC<InputWithPlusProps> = ( props ) => {
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
        label={'Название нового тега'}
        placeholder={'Укажите название тега'}
        sx={{ width: '100%', mr: 2 }}
      />
      {props.loading ? (
        <CircularProgress color={'primary'} size={30}/>
      ) : (
        <IconButton onClick={() => props.onButtonClick()}>
          <AddCircle color={'primary'}/>
        </IconButton>
      )}
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
  return (
    <Dialog
      open={true}
      onClose={( event, reason ) => reason !== 'backdropClick' && setState( null )}
      maxWidth={'sm'}
      fullWidth={true}
    >
      <Box sx={{ padding: 2 }}>
        <DialogTitle sx={{ p: 0 }}>
          Настройки для "{value}"
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ mt: 1, width: '100%' }}>
            <TextField
              fullWidth={true}
              label={'Название предмета'}
              placeholder={'Укажите название предмета'}
              value={value}
              variant={'outlined'}
              color={'primary'}
              onChange={( e ) => setValue( e.target.value )}
              sx={{ mb: 2, mt: 1, width: '100%' }}
            />
            <InputWithPlus
              loading={loadOptions.isLoad.status}
              inputProps={{
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
                  } )
                }
              }}
            />
            <Box sx={{
              maxHeight: 300,
              overflow: 'hidden',
              p: 1,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <List sx={{ overflow: 'scroll', overscrollBehavior: 'contain', maxHeight: 300 }}>
                <ListSubheader sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'nowrap'
                  }}>
                    <Typography variant={'h6'} component={'p'} fontSize={16}>
                      Список тегов для "{value}"
                    </Typography>

                  </Box>
                </ListSubheader>
                {subSubjectsQueryOptions.data?.subSubjects?.length ?
                  subSubjectsQueryOptions.data.subSubjects.map( item => (
                    <ListItem>
                      <ListItemText>{item.title}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton>
                          <Edit color={'primary'}/>
                        </IconButton>
                        <IconButton>
                          <DeleteForeverOutlined color={'error'}/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ) ) : (
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
        <DialogActions>
          <Button variant={'contained'}>
            Сохранить
          </Button>
          <Button variant={'text'} onClick={() => setState( null )}>
            Закрыть
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export const SubjectsConfig: React.FC = () => {
  const [addSubject, addSubjectOptions] = useAddNewSubjectMutation()
  const subjectsList = useAcademicSubjectsListQuery()
  const [dialogOpen, setDialogOpen] = useState( false )
  const [textField, setTextField] = useState( '' )
  const [listIsOpen, setListIsOpen] = useState( true )
  const [editorState, setEditorState] = useState<null | SubjectItem>( null )

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

          <Typography variant={'h2'} fontSize={22} sx={{ m: 0, p: 0, mr: 2, pl: 2}}>
            Управление предметами
          </Typography>
          <IconButton
            onClick={() => {
              setDialogOpen( true )
            }}
          >
            <AddCircle color={'primary'}/>
          </IconButton>
        </Box>
        {subjectsList.data?.academicSubjects ? (
          <Box>
            <List sx={{
              maxWidth: '50%',
              overflow: 'scroll',
              padding: listIsOpen ? `0px 12px 12px 12px` : `0px 12px`,
              maxHeight: listIsOpen ? 400 : 50,
              transition: 'all .3s ease-in',
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`
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