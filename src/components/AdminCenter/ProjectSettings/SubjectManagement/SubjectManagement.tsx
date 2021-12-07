import React, { useState } from 'react'
import {
  AcademicSubjectsListQuery,
  useAcademicSubjectsListQuery
} from './graphqlTypes/academicSubjects'
import { useHistory } from 'react-router-dom'
import { CreateSubject } from './CreateSubject'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { AddCircle, CheckCircle } from '@mui/icons-material'
import { theme } from '../../../../index'
import { UnboxedArray } from '../../../TaskManager/CreateNewTask/CreateNewTask'
import { TagList } from './TagList'

const SubjectManagement: React.FC = () => {
  //history hook
  const history = useHistory()

  //graphql query's
  const academicSubjectsList = useAcademicSubjectsListQuery()

  //component states
  const [creator, setCreator] = useState( false )
  const [selected, setSelected] = useState<UnboxedArray<AcademicSubjectsListQuery['academicSubjects']>>( null )
  const [filteredValue, setFilteredValue] = useState<string | null>( null )

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
                        onClick={() => setSelected( item )}
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
              {selected ? (
                <TagList selected={selected}/>
              ) : (
                <>

                </>
              )}
            </Box>
          </Stack>
        ) : ( <></> )}
      </>
    </Box>
  )
}

export default SubjectManagement