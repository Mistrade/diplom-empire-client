import {
  Box, Divider,
  Fade,
  FormControl, IconButton,
  List,
  ListItem,
  ListItemAvatar, ListItemText,
  Modal, Tooltip,
  Typography
} from '@mui/material'
import style from '../TaskManager/CreateNewTask/style.module.sass'
import { CheckCircle, Delete, FileUploadOutlined, RemoveCircle } from '@mui/icons-material'
import {
  fileAccessListCategory,
  FileMetaInformation,
  getFileExt
} from '../../common/uploadFileHandler'
import { FileImageAvatar } from '../Files/FileImageAvatar'
import React, { useRef, useState } from 'react'
import { useSnackbar } from 'notistack'
import { toMegaByte } from '../TaskManager/TaskPage/TaskPage'
import { theme } from '../../index'
import moment from 'moment'
import { FileDataProps, ModalConfigProps } from '../TaskManager/CreateNewTask/CreateNewTask'

interface FileUploaderProps {
  fileList: Array<FileDataProps>,
  setFileList: ( list: Array<FileDataProps> ) => void,
  maxSizeOnFile?: number,
  maxFileCount?: number,
  minSizeOnFile?: number,
  acceptFileExtensions: Array<FileMetaInformation>,
  modal?: ModalConfigProps,
  setModal?: React.Dispatch<React.SetStateAction<ModalConfigProps>>
}

interface FileITemRenderProps {
  data: FileDataProps,
  mode: 'view' | 'preview',
  setModal?: React.Dispatch<React.SetStateAction<{ isOpen: boolean, src: string }>>,
  removeHandler?: () => any
  disableRenderDivider?: boolean
}


export const FileItemRender: React.FC<FileITemRenderProps> = ( {
                                                                 data,
                                                                 mode,
                                                                 setModal,
                                                                 removeHandler,
                                                                 disableRenderDivider
                                                               } ) => {

  return (
    <>
      <ListItem sx={{ mb: 1, mt: 1 }}>
        <ListItemAvatar
          sx={{
            position: 'relative',
            maxWidth: 60,
            maxHeight: 60,
            overflow: 'hidden',
            border: data.data?.category === 'image' ? `1px solid ${theme.palette.divider}` : '',
            mr: 2,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {data.data?.category === 'image' && !!data.preview.src ? (
            <Tooltip
              sx={{ fontSize: 20 }}
              arrow={true}
              placement={'top'}
              title={`Нажмите для просмотра ${data.file.name}`}
            >
              <img
                style={{ objectFit: 'contain', position: 'relative' }}
                width={'60px'}
                height={'60px'}
                onClick={() => {
                  setModal && setModal( {
                    isOpen: true,
                    src: data.preview.src || ''
                  } )
                }}
                src={data.preview.src}
              />
            </Tooltip>
          ) : (
            <FileImageAvatar ext={data.data?.semanticExt}/>
          )}
        </ListItemAvatar>
        <ListItemText>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'nowrap'
          }}>

            <Box>
              <Typography variant={'h6'} component={'span'} fontSize={16}>
                {data.file.name.length > 24 ? data.file.name.substring( 0, 24 ) + '...' : data.file.name}
              </Typography>
              <Typography fontSize={14}>
                {moment( data.file.lastModified ).format( 'DD.MM.YYYY HH:mm:ss' ) || ''} / {toMegaByte( data.file.size ).toFixed( 2 )} МБайт
              </Typography>
            </Box>
            {mode === 'preview' ? (
              <Box sx={{ ml: 2 }}>
                <IconButton>
                  <RemoveCircle
                    sx={{ cursor: 'pointer' }}
                    color={'disabled'}
                    fontSize={'large'}
                    onClick={() => removeHandler && removeHandler()}
                  />
                </IconButton>
              </Box>
            ) : <></>}
          </Box>
        </ListItemText>
      </ListItem>
      {!disableRenderDivider ? (
        <Divider sx={{ width: '100%' }}/>
      ) : <></>}
    </>
  )
}

export const FileUploader: React.FC<FileUploaderProps> = ( {
                                                             modal,
                                                             setModal,
                                                             fileList = [],
                                                             setFileList = Function.prototype,
                                                             maxFileCount = 8,
                                                             maxSizeOnFile = 5000000,
                                                             minSizeOnFile = 1,
                                                             acceptFileExtensions = fileAccessListCategory
                                                           } ) => {
  const ref = useRef<HTMLInputElement>( null )

  const { enqueueSnackbar } = useSnackbar()

  const filteredList = ( list: Array<File> ): Array<FileDataProps> => {
    const htmlExtensions = acceptFileExtensions?.map( item => item.type )
    let result: Array<File> = list.slice( 0, maxFileCount - fileList.length )

    let newList: Array<File> = result.filter( item => {
      if( !htmlExtensions.includes( item.type ) ) {
        enqueueSnackbar( item.name + ' - файл был удален, так как расширение этого файла запрещено для загрузки', {
          variant: 'error'
        } )
        return false
      }

      if( item.size > maxSizeOnFile ) {
        enqueueSnackbar( `${item.name} - файл был удален так как размер файла превышает максимально допустимый размер: ${toMegaByte( maxSizeOnFile )} МБайт.`, {
          variant: 'error'
        } )
        return false
      }

      if( item.size < minSizeOnFile ) {
        enqueueSnackbar( `${item.name} - файл был удален так как размер файла меньше, чем минимально разрешенный размер: ${toMegaByte( minSizeOnFile )} МБайт.`, {
          variant: 'error'
        } )
        return false
      }

      return true
    } )

    if( fileList.length ) {
      newList = newList.filter( file => {
        let res = true
        fileList.forEach( item => {
          if( item.file.name === file.name && item.file.size === file.size ) {
            res = false
            enqueueSnackbar( `Файл ${item.file.name} - был удален, так как он уже содержится в списке загрузок`, { variant: 'error' } )
            return
          }
        } )

        return res
      } )
    }

    const resultList: Array<FileDataProps> = newList.map( item => {
      const data = getFileExt( item )
      return {
        ...data,
        preview: {
          src: data.data.category === 'image' ? URL.createObjectURL( data.file ) : null
        }
      }
    } )

    return [...resultList, ...fileList]
  }

  const removeFileHandler = ( index: number ) => {
    const removedItem = fileList.splice( index, 1 )

    if( removedItem.length ) {
      enqueueSnackbar( 'Файл был успешно удален', { variant: 'success' } )
    }

    setFileList( fileList )
  }


  return (
    <>
      <FormControl sx={{ mb: 2, width: '100%' }}>
        <input
          type={'file'}
          id={'file-uploader'}
          multiple={true}
          disabled={fileList.length >= maxFileCount}
          accept={acceptFileExtensions.map( item => item.type ).join( ', ' )}
          onChange={( e ) => {
            const { files } = e.target
            if( files ) {
              const arr = Array.from( files )
              const resultValidation = filteredList( arr )

              console.log( resultValidation )
              setFileList( resultValidation )
            }
          }}
          ref={ref}
          style={{ display: 'none' }}
        />
        <label htmlFor={'file-uploader'}>
          <Box className={style.fileUploader} sx={{
            border: fileList.length < maxFileCount ? '2px dashed rgba(70,70,70,.3)' : `2px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
            padding: 3,
            width: '100%',
            minHeight: 70,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            cursor: 'pointer'
          }}>
            {fileList.length < maxFileCount ? (
              <>
                <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
                  <FileUploadOutlined color={'primary'}/>
                </Box>
                <Typography textAlign={'center'}>
                  Нажмите сюда, чтобы загрузить файлы<br/>
                  Максимум - 8 файлов по 5 МБайт
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle color={'primary'} sx={{ fontSize: 40 }}/>
                </Box>
                <Typography variant={'subtitle1'} component={'span'} textAlign={'center'}>
                  Вы загрузили максимальное количество файлов<br/>
                  Чтобы редактировать список файлов воспользуйтесь панелью ниже
                </Typography>
              </>
            )}
          </Box>
        </label>
        {fileList.length ? (
          <FormControl sx={{ mt: 3, overflow: 'hidden', maxHeight: '35vh', transition: 'all .3s ease-in' }}>
            <Typography variant={'subtitle1'}>
              Файлы, для закрепления к заданию: {fileList.length}
            </Typography>
            <List sx={{ overflow: 'scroll', overscrollBehavior: 'contain' }}>
              {fileList.map( ( file, index ) => {
                return (
                  <FileItemRender
                    data={file}
                    mode={'preview'}
                    setModal={setModal}
                    removeHandler={() => removeFileHandler( index )}
                    disableRenderDivider={index === fileList.length - 1}
                  />
                )
              } )}
              {/*<img src={file}/>*/}
            </List>
          </FormControl>
        ) : <></>}
      </FormControl>
    </>
  )
}