import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { useAddNewSubjectMutation } from '../ProjectSettings/SubjectManagement/graphqlTypes/addNewSubject'
import { InputWithPlus } from '../ProjectSettings/TaskParameters/CreateTaskSection/SubjectsConfig'
import { useLoading } from '../../../hooks/useLoading'

interface AddSubjectModalProps {
  isOpen: boolean,
  onClose: Dispatch<SetStateAction<boolean>>,
  onComplete?: () => Promise<any> | any
}

export const AddSubjectModal: FC<AddSubjectModalProps> = ( { isOpen, onClose, onComplete } ) => {
  const [value, setValue] = useState( '' )
  const [addSubject, addSubjectOptions] = useAddNewSubjectMutation()
  const loading = useLoading()

  const submitHandler = async () => {
    await loading.withLoading( async () => {
      try {
        await addSubject( {
          variables: {
            data: {
              title: value
            }
          }
        } )

        if( onComplete ) await onComplete()

        await onClose( false )
      } catch (e) {
        console.log( e )
        return
      }
    } )
  }

  return (
    <Dialog open={isOpen} onClose={() => onClose( false )}>
      <DialogTitle>
        Добавьте новый предмет
      </DialogTitle>
      <DialogContentText>
        <InputWithPlus
          inputProps={{
            value,
            onChange: ( e ) => setValue( e.target.value ),
            label: 'Укажите название нового предмета...'
          }}
          onButtonClick={submitHandler}
          loading={loading.isLoad.status}
        />
      </DialogContentText>
      <DialogActions>
        <Button onClick={async () => onClose( false )}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}