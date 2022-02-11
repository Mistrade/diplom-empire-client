import React, { FC, useState } from 'react'
import {
  ConfigListItem,
  ConfigListItemActions,
  ConfigListItemContent, EmptyListMessageContainer,
  MyConfigList
} from '../../../../Lists/MyConfigList'
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle, Divider,
  IconButton, TextField,
  Typography
} from '@mui/material'
import { GetWorkTypesQuery, useGetWorkTypesQuery } from '../graphQL/graphqlTypes/getWorkTypes'
import {
  AddCircle,
  Check,
  Delete,
  Edit,
  Cancel
} from '@mui/icons-material'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material'
import { UnboxedArray } from '../../../../TaskManager/CreateNewTask/CreateNewTask'
import { PreloaderProps, useLoading } from '../../../../../hooks/useLoading'
import { useChangeTaskDeliveriesForWorkTypesMutation } from '../graphQL/graphqlTypes/changeTaskDeliveriesForWorkTypes'
import {
  GetTaskDeliveryObjectsQuery,
  useGetTaskDeliveryObjectsQuery
} from '../graphQL/graphqlTypes/getTaskDeliveryObjects'
import { Autocomplete } from '@mui/lab'

export const ModalBody = styled.div`
  width: 100%;

`

export const StyledConfigModalWindow = muiStyled( Dialog )<DialogProps>( ( {} ) => ( {} ) )

export const ConfigModal: FC<DialogProps> = ( props ) => {
  return (
    <StyledConfigModalWindow {...props} maxWidth={'md'}/>
  )
}

interface WorkTypesConfigDialogBodyProps {
  workType: UnboxedArray<GetWorkTypesQuery['workTypes']>
}

export const WorkTypeConfigBody: FC<WorkTypesConfigDialogBodyProps> = ( { workType } ) => {
  const {
    data,
    refetch,
    error,
    loading
  } = useGetTaskDeliveryObjectsQuery( { variables: { parent: workType?.id || '' } } )
  const [createDeliveryTaskIsOpen, setCreateDeliveryTaskIsOpen] = useState( false )


  function addHandler() {

  }

  return (
    <>
      <MyConfigList
        subHeaderOptions={{
          mainAction: addHandler,
          title: 'Способы доставки работы'
        }}
        loadProps={{
          status: loading,
          message: 'Загрузка способов доставки работы',
          items: []
        }}
        dataList={data?.taskDeliveryObjects || []}
        renderListItemTitle={( item, list ) => (
          <WorkTypeConfigListItem
            item={item}
            parentId={workType?.id || ''}
            afterDeleteFn={async () => {
              await refetch()
            }}
          />
        )}
        emptyListMessage={() => (
          <EmptyListMessageContainer>
            <IconButton
              sx={{ mb: 4 }}
            >
              <AddCircle
                color={'primary'}
                sx={{
                  fontSize: 72
                }}
              />
            </IconButton>
            <Typography>
              Добавьте первый способ доставки работы
            </Typography>
            <AddTaskDeliveriesForWorkTypeInput
              isLoad={{ items: [], status: false, message: '' }}
              onOk={async () => {
              }}
              onDelete={async () => {
              }}
            />
          </EmptyListMessageContainer>
        )}
      />
    </>
  )
}

export type TaskDeliveryType = UnboxedArray<GetTaskDeliveryObjectsQuery['taskDeliveryObjects']>

export const AddTaskDeliveriesForWorkTypeInput: FC<{ isLoad: PreloaderProps, onOk: ( value: string ) => Promise<any>, onDelete: () => Promise<any> }> = ( {
                                                                                                                                                            isLoad,
                                                                                                                                                            onDelete,
                                                                                                                                                            onOk
                                                                                                                                                          } ) => {
  const [textFieldValue, setTextFieldValue] = useState( '' )
  const { data, loading, refetch, error } = useGetTaskDeliveryObjectsQuery( {} )

  return (
    <ConfigListItem>
      <ConfigListItemContent>
        <Autocomplete
          fullWidth={true}
          renderInput={( params ) =>
            <TextField
              label={'Выберите типы доставки работы'}
              {...params}
            />
          }
          getOptionLabel={( data ) => data ? data.name : ''}
          multiple={true}
          options={data ? data.taskDeliveryObjects || [] : []}
        />
      </ConfigListItemContent>
      <ConfigListItemActions direction={'row'} divider={<Divider/>} sx={{ height: '100%' }}>
        {isLoad.status ? (
          <>
            <CircularProgress color={'primary'} size={25}/>
          </>
        ) : (
          <>
            <IconButton
              onClick={async () => {
                try {
                  await onOk( textFieldValue )
                  await setTextFieldValue( '' )
                } catch (e) {
                  console.log( e )
                }
              }}
            >
              <Check color={'primary'}/>
            </IconButton>
            <IconButton onClick={onDelete}>
              <Cancel color={'disabled'}/>
            </IconButton>
          </>
        )}
      </ConfigListItemActions>
    </ConfigListItem>
  )
}


export function WorkTypeConfigListItem( {
                                          item,
                                          parentId,
                                          afterDeleteFn
                                        }: { item: TaskDeliveryType | null | undefined, parentId: string, afterDeleteFn: () => Promise<any> } ) {
  const [isEdit, setIsEdit] = useState<boolean>( false )
  const [textFieldValue, setTextFieldValue] = useState( item?.name || '' )
  const { isLoad, withLoading } = useLoading()
  const [changeMutation, changeMutationOptions] = useChangeTaskDeliveriesForWorkTypesMutation()

  if( !item ) {
    return <></>
  }

  async function onDelete() {
    await withLoading( async () => {
      try {
        await changeMutation( {
          variables: {
            parent: parentId,
            data: [item?.id || ''],
            isDelete: true
          }
        } )
        await afterDeleteFn()
      } catch (e) {
        console.log( e )
      }
    } )
  }

  async function onOk( value: string ) {
    await withLoading( async () => {
      try {
        await changeMutation( {
          variables: {
            parent: parentId,
            data: [item?.id || ''],
            isDelete: false
          }
        } )
        await afterDeleteFn()
      } catch (e) {
        console.log( e )
      }
    } )
  }

  return (
    <>
      {!isEdit ? (
        <>
          <ConfigListItemContent>
            <Typography>
              {item.name}
            </Typography>
          </ConfigListItemContent>
          <ConfigListItemActions direction={'row'} divider={<Divider/>} sx={{ height: '100%' }}>
            <IconButton onClick={() => setIsEdit( true )}>
              <Edit color={'primary'}/>
            </IconButton>
            <IconButton onClick={onDelete}>
              <Delete color={'error'}/>
            </IconButton>
          </ConfigListItemActions>
        </>
      ) : (
        <AddTaskDeliveriesForWorkTypeInput isLoad={isLoad} onDelete={onDelete} onOk={onOk}/>
      )}
    </>
  )
}


export const WorkTypesConfig: FC = () => {

  const workTypesQueryOptions = useGetWorkTypesQuery()
  const [selectItem, setSelectItem] = useState<UnboxedArray<GetWorkTypesQuery['workTypes']> | null>( null )

  return (
    <>
      <MyConfigList
        isOpenHeight={'100%'}
        isClosedHeight={50}
        initialIsOpenState={true}
        loadProps={{
          status: workTypesQueryOptions.loading,
          message: 'Загрузка типов работ...',
          items: []
        }}
        subHeaderOptions={{
          title: ( isOpen ) => (
            <Typography>
              {isOpen ? 'Список развернут с высотой 400' : 'Список закрыт'}
            </Typography>
          )
        }}
        dataList={workTypesQueryOptions.data?.workTypes || []}
        renderListItemTitle={( item, list, index, isOpen ) => (
          <>
            <ConfigListItemContent>
              <Typography variant={'h6'} fontSize={14}>
                {item?.name || ''}
              </Typography>
            </ConfigListItemContent>
            <ConfigListItemActions direction={'row'} divider={<Divider/>} spacing={1}>
              <IconButton>
                <AddCircle color={'primary'}/>
              </IconButton>
              <IconButton onClick={() => setSelectItem( item )}>
                <Edit color={'primary'}/>
              </IconButton>
              <IconButton>
                <Delete color={'error'}/>
              </IconButton>
            </ConfigListItemActions>
          </>
        )}
      />
      <ConfigModal
        onClose={() => setSelectItem( null )}
        open={!!selectItem}
        fullWidth={true}
      >
        {selectItem && (
          <>
            <DialogTitle>
              Настройки "{selectItem.name}"
            </DialogTitle>
            <DialogContent>
              <WorkTypeConfigBody
                workType={selectItem}
              />
            </DialogContent>
          </>
        )}
      </ConfigModal>
    </>
  )
}