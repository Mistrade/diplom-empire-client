import React, { useState } from 'react'
import { useAcademicSubjectsListQuery } from './graphqlTypes/academicSubjects'
import { useHistory } from 'react-router-dom'
import { CreateSubject } from './CreateSubject'
import {
  Accordion, AccordionDetails,
  AccordionSummary, Box, Button,
  Divider, FormControl,
  List,
  ListItem,
  ListItemText,
  ListSubheader, TextField, Typography
} from '@mui/material'
import { ExpandMore, Send } from '@mui/icons-material'
import { useSubSubjectsLazyQuery, useSubSubjectsQuery } from './graphqlTypes/subsubject'
import { useAddNewSubSubjectMutation } from './graphqlTypes/addNewSubSubject'

const SubjectManagement: React.FC = () => {
  const history = useHistory()
  const { data, loading, error, refetch: refetchAcademicSubjects } = useAcademicSubjectsListQuery()
  const [creator, setCreator] = useState( false )
  const [expanded, setExpanded] = useState<string>( '' )
  const [getAlreadyExists, subQueryItem] = useSubSubjectsLazyQuery()
  const [addItem, addItemQuery] = useAddNewSubSubjectMutation()
  const [textField, setTextField] = useState( '' )

  const expandedHandler = ( item: string ) => async ( event: React.SyntheticEvent, isExpanded: boolean ) => {
    setExpanded( isExpanded ? item : '' )
    setTextField( '' )
    if( isExpanded ) {
      await getAlreadyExists( {
        variables: {
          parentID: item
        }
      } )
    }


  }

  return (
    <>
      <h2>Управление предметами</h2>

      <h3>
        Список созданных предметов
      </h3>
      <button onClick={() => setCreator( prev => !prev )}>
        Создать новый предмет
      </button>

      {creator ? (
        <>
          <CreateSubject onComplete={async () => {
            await refetchAcademicSubjects()
          }}/>
        </>
      ) : <></>}

      {data?.academicSubjects ? (
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
          {data.academicSubjects.map( ( item, index ) => {
            return (
              <Accordion
                expanded={expanded === item.id}
                onChange={expandedHandler( item.id )}
              >
                <AccordionSummary
                  style={{ background: 'rgba(230,230,230,.7)' }}
                  expandIcon={<ExpandMore/>}
                  aria-controls={item.title + '-content'}
                  id={item.title}
                >
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.description ? (
                    <Typography>Описание: {item.description}</Typography>
                  ) : <></>}

                  {expanded === item.id ? (
                    <>
                      {subQueryItem.data?.subSubjects?.length ? (
                        <>
                          <Typography variant={'h6'}>Список тегов:</Typography>
                          <List title={'Список тегов:'}>
                            {subQueryItem.data.subSubjects.map( subItem => (
                              <ListItem>
                                {subItem.title}
                              </ListItem>
                            ) )}
                          </List>
                        </>
                      ) : (
                        <>
                          <Typography variant={'h6'}>
                            У этого предмета нет ни одного тега, хотите их добавить?
                          </Typography>
                        </>
                      )}
                      <form onSubmit={async ( e ) => {
                        try {
                          e.preventDefault()
                          await addItem( {
                            variables: {
                              data: {
                                title: textField,
                                parentID: item.id
                              }
                            }
                          } )

                          await subQueryItem.refetch( {
                            parentID: item.id
                          } )


                          setTextField( '' )

                        } catch (e) {
                          console.log( e )
                          return e
                        }
                      }}>

                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          width: 400
                        }}>

                          <FormControl sx={{ m: 1, width: 400 }}>
                            <TextField value={textField}
                                       onChange={( e ) => setTextField( e.target.value )}
                                       variant={'outlined'} fullWidth={true}
                                       label={'Название тега'}/>
                          </FormControl>
                          <FormControl sx={{ m: 1, width: 400 }}>

                            <Button disabled={subQueryItem.loading} type={'submit'} variant={'contained'} fullWidth={true}
                                    endIcon={<Send/>}>
                              Добавить тег
                            </Button>
                          </FormControl>
                        </Box>
                      </form>
                    </>
                  ) : <></>}
                </AccordionDetails>
              </Accordion>
            )
          } )
          }
        </Box>
      ) : <></>}
    </>
  )
}

export default SubjectManagement