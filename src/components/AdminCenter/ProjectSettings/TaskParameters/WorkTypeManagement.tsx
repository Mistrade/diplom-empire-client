import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useGetWorkTypesQuery } from './graphQL/graphqlTypes/getWorkTypes'
import {
  Box,
  Button, Chip, Divider,
  FormControl, IconButton,
  List,
  ListItem, ListItemAvatar, ListItemSecondaryAction,
  ListItemText, ListSubheader,
  TextField,
  Typography
} from '@mui/material'
import { AddCircle, SaveAs } from '@mui/icons-material'
import { useSaveWorkTypeMutation } from './graphQL/graphqlTypes/saveWorkType'
import { useLoading, WithLoadingType } from '../../../../hooks/useLoading'
import { Preloader } from '../../../Preloader/Preloader'
import { LeftBarListItem, ManagementList } from '../../../ManagementList/ManagementList'
import { TagList } from '../SubjectManagement/TagList'
import { RightBarList } from '../../../ManagementList/RightBarList'
import {
  useGetTaskDeliveryObjectsLazyQuery,
  useGetTaskDeliveryObjectsQuery
} from './graphQL/graphqlTypes/getTaskDeliveryObjects'
import { Autocomplete } from '@mui/lab'
import {
  GetAvailableTaskDeliveryMethodsQueryResult,
  useGetAvailableTaskDeliveryMethodsQuery
} from './graphQL/graphqlTypes/getAvailableTaskDeliveryMethods'
import { useChangeTaskDeliveriesForWorkTypesMutation } from './graphQL/graphqlTypes/changeTaskDeliveriesForWorkTypes'
import { Simulate } from 'react-dom/test-utils'

type MutationFnTaskDelivery = ( value: string, apolloObject: GetAvailableTaskDeliveryMethodsQueryResult ) => Promise<any>

interface AddTaskDeliveryProps {
  withLoading: WithLoadingType,
  parent: LeftBarListItem | null,
  setList: React.Dispatch<React.SetStateAction<Array<LeftBarListItem>>>
  mutation: MutationFnTaskDelivery
}

const AddTaskDeliveryInput: React.FC<AddTaskDeliveryProps> = ( {
                                                                 withLoading,
                                                                 parent,
                                                                 setList,
                                                                 mutation
                                                               } ) => {
  const list = useGetAvailableTaskDeliveryMethodsQuery( {
    variables: { parent: parent?.id || '' }
  } )
  const { withLoading: inputWithLoading, isLoad, setLoading } = useLoading()

  useEffect( () => {
    setLoading( { status: list.loading, message: 'Загрузка списка доступных вариантов' } )
  }, [list.loading] )

  const saveChangeValue = async ( newValue: string ) => {

    await withLoading( async ( changeMessage ) => {
      try {

        await changeMessage( 'Сохранение изменений' )

        await mutation( newValue, list )

        return
      } catch (e) {
        console.log( e )

        return setList( [] )
      }
    } )
  }

  return (
    <>
      {isLoad.status ? (
        <Box sx={{ width: '100%', p: 3 }}>
          <Preloader message={isLoad.message}/>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          {list.data?.availableTaskDeliveryMethods.available.length ? (
            <>
              <Typography variant={'h6'} mb={2} textAlign={'center'}>
                Добавьте один или несколько вариантов:
              </Typography>
              <List>
                {/*<></>*/}
                {list.data?.availableTaskDeliveryMethods.available.map( item => (
                  <>
                    <ListItem sx={{ pl: 0, pr: 0, ml: 0, mr: 0 }}>
                      <ListItemText>
                        {item.name}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={async () => {
                          await saveChangeValue( item.id )
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
            <Typography variant={'h6'} m={1} textAlign={'center'}>
              Вы добавили все доступные варианты {parent?.title ? `для ${parent.title}!` : '!'}
            </Typography>
          )}
        </Box>
      )
      }
    </>
  )
}

export const WorkTypeManagement: React.FC = () => {
  const workTypesList = useGetWorkTypesQuery()
  const taskDeliveryObjectsQuery = useGetTaskDeliveryObjectsQuery( {
    variables: {
      parent: ''
    }
  } )
  const [saveItem, saveItemResult] = useSaveWorkTypeMutation()
  const [mutationTaskDeliveries, taskDeliveriesObjectMutation] = useChangeTaskDeliveriesForWorkTypesMutation()

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

  const refetchList = async ( selected: LeftBarListItem, setList: React.Dispatch<React.SetStateAction<Array<LeftBarListItem>>> ) => {
    try {

      const response = await taskDeliveryObjectsQuery.refetch( {
        parent: selected.id
      } )

      if( response.data.taskDeliveryObjects.length ) {
        const result: Array<LeftBarListItem> = response.data.taskDeliveryObjects.map( item => {
          if( !item ) {
            return null
          }

          return {
            id: item.id,
            title: item.name,
            data: item
          }
        } ).filter( item => !!item ) as Array<LeftBarListItem>

        await setList( result )

      } else {
        await setList( [] )
      }

    } catch (e) {
      await setList( [] )
      console.log( e )
      return e
    }
  }

  const mutationTaskDeliveriesHandler = async ( value: string, selected: LeftBarListItem, isDelete: boolean ) => {
    await mutationTaskDeliveries( {
      variables: {
        parent: selected.id,
        isDelete: isDelete || false,
        data: [value]
      }
    } )
  }


  return (
    <>
      <ManagementList
        leftBarConfig={{
          title: 'Список типов работ'
        }}
        leftBarList={workTypesList.data?.workTypes
          .map( item => ( {
            id: item?.id || '',
            title: item?.name || '',
            data: item
          } ) )
          .sort( ( a, b ) => {
            return ( a.data?.created || 0 ) > ( b.data?.created || 0 ) ? -1 : 1
          } ) || []
        }
        filterInputConfig={{
          label: 'Фильтр по типам работ',
          placeholder: 'Укажите тип работы',
          onChange: ( value, setList, list ) => {
            return setList( list.filter( item => item.title.toLowerCase().includes( value.toLowerCase() ) ) )
          }
        }}
        rightBarListConfig={{
          removeHandler: async ( item, selectedItem, setList, setLoadingMessage ) => {

            console.log( 'remove Handler has been started' )
            await mutationTaskDeliveriesHandler( item.id, selectedItem, true )
            await refetchList( selectedItem, setList )
          },
          async onChangeSelected( selected, setList ) {
            await refetchList( selected, setList )
          },
          onChangeSelectedLoadingMessage: 'Загрузка форматов сдачи работы...',
          addItemComponent( withLoad, selected, setList ) {

            return (
              <AddTaskDeliveryInput
                withLoading={withLoad}
                parent={selected}
                setList={setList}
                mutation={async ( value, apolloObject ) => {
                  await mutationTaskDeliveriesHandler( value, selected, false )
                  const res = ( await apolloObject.refetch( {
                    parent: selected.id
                  } ) ).data.availableTaskDeliveryMethods.available

                  if( res ) {
                    setList( res.map( item => ( { id: item.id, title: item.name, data: item } ) ) )
                  }

                }}
              />
            )
          }
        }}
        fullComponentIsLoad={{
          status: workTypesList.loading,
          message: 'Загрузка типов работ...'
        }}
      />
    </>
  )
}