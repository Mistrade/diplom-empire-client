import React, { useEffect, useState } from 'react'
import { useGetWorkTypesQuery } from './graphQL/graphqlTypes/getWorkTypes'
import {
  Button,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import { SaveAs } from '@mui/icons-material'
import { useSaveWorkTypeMutation } from './graphQL/graphqlTypes/saveWorkType'
import { useLoading } from '../../../../hooks/useLoading'
import { Preloader } from '../../../Preloader/Preloader'

export const WorkTypeManagement: React.FC = () => {
  const workTypesList = useGetWorkTypesQuery()
  const [saveItem, saveItemResult] = useSaveWorkTypeMutation()

  const { isLoad, withLoading } = useLoading( false, 'Загрузка данных...' )
  const [value, setValue] = useState( '' )

  const submitHandler = async ( e: React.FormEvent ) => {
    e.preventDefault()
    await withLoading( async ( changeMessage ) => {
      await saveItem( {
        variables: {
          name: value
        }
      } )

      await workTypesList.refetch()
      await setValue( '' )
    }, 'Сохраняем тип работ...' )
  }

  useEffect( () => {
    console.log( workTypesList.data )
  }, [workTypesList.data] )

  return (
    <>
      {workTypesList.loading || isLoad.status ? (
        <Preloader message={isLoad.message || 'Загрузка данных...'}/>
      ) : (
        <>
          <Typography variant={'h3'}>
            Создайте первый тип работы
          </Typography>

          <form onSubmit={( e ) => submitHandler( e )}>
            <FormControl sx={{ width: 400 }}>

              <TextField
                variant={'outlined'}
                value={value}
                fullWidth
                label={'Укажите название типа работы'}
                onChange={( e ) => setValue( e.target.value )}
              />
            </FormControl>
            <FormControl>
              <Button
                type={'submit'}
                variant={'contained'}
                sx={{ color: 'white' }}
                endIcon={<SaveAs/>}
              >
                Сохранить
              </Button>
            </FormControl>
          </form>
          {workTypesList.data?.workTypes.length ? (
            <List>
              {workTypesList.data.workTypes.map( item => {
                return (
                  <ListItem>
                    <ListItemText>
                      {item?.name}
                    </ListItemText>
                  </ListItem>
                )
              } )}
            </List>
          ) : <></>}
        </>
      )}
    </>
  )
}