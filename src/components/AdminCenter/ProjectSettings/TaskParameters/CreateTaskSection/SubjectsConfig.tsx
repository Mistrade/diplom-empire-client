import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
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

export const SubjectsConfig: React.FC = () => {
  const [addSubject, addSubjectOptions] = useAddNewSubjectMutation()
  const subjectsList = useAcademicSubjectsListQuery()
  const [dialogOpen, setDialogOpen] = useState( false )
  const [textField, setTextField] = useState( '' )
  const [listIsOpen, setListIsOpen] = useState( true )

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
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'nowrap',
          mb: 2
        }}>

          <Typography variant={'h2'} fontSize={22} sx={{ m: 0, p: 0 }}>
            Управление предметами
          </Typography>
          <Button
            startIcon={<AddCircle color={'primary'}/>}
            onClick={() => {
              setDialogOpen( true )
            }}
          >
            Добавить
          </Button>
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
                      <IconButton>
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
        ) : <></>
        }
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
    </>
  )
}