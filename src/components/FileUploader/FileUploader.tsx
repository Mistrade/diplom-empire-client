import {
  Box, Divider,
  Fade,
  FormControl,
  List,
  ListItem,
  ListItemAvatar, ListItemText,
  Modal,
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

interface FileUploaderProps {
  fileList: Array<File>,
  setFileList: ( list: Array<File> ) => void,
  maxSizeOnFile?: number,
  maxFileCount?: number,
  minSizeOnFile?: number,
  acceptFileExtensions: Array<FileMetaInformation>,
}

interface ModalConfigProps {
  isOpen: boolean,
  imageContent: string
}

export const FileUploader: React.FC<FileUploaderProps> = ( {
                                                             fileList = [],
                                                             setFileList = Function.prototype,
                                                             maxFileCount = 8,
                                                             maxSizeOnFile = 5000000,
                                                             minSizeOnFile = 1,
                                                             acceptFileExtensions = fileAccessListCategory
                                                           } ) => {
  const ref = useRef<HTMLInputElement>( null )
  const [modal, setModal] = useState<ModalConfigProps>( {
    isOpen: false,
    imageContent: ''
  } )

  const { enqueueSnackbar } = useSnackbar()

  const filteredList = ( list: Array<File> ): Array<File> => {
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
          if( item.name === file.name && item.size === file.size ) {
            res = false
            enqueueSnackbar( `Файл ${item.name} - был удален, так как он уже содержится в списке загрузок`, { variant: 'error' } )
            return
          }
        } )

        return res
      } )
    }

    return [...fileList, ...newList]
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
          <FormControl sx={{ mt: 3 }}>
            <List>
              {fileList.map( ( file, index ) => {
                const fileInfo = getFileExt( file )
                return (
                  <React.Fragment key={file.name}>
                    <ListItem>
                      <ListItemAvatar
                        sx={{
                          position: 'relative',
                          maxWidth: 60,
                          maxHeight: 60,
                          overflow: 'hidden',
                          border: fileInfo.data?.category === 'image' ? `1px solid ${theme.palette.divider}` : '',
                          mr: 2,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {fileInfo.data?.category === 'image' ? (
                          <img
                            style={{ objectFit: 'contain', position: 'relative' }}
                            width={'60px'}
                            height={'60px'}
                            onClick={() => {
                              setModal( {
                                isOpen: true,
                                imageContent: URL.createObjectURL( file )
                              } )
                            }}
                            src={URL.createObjectURL( fileInfo.file )}
                          />
                        ) : (
                          <FileImageAvatar ext={fileInfo.data?.semanticExt}/>
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
                              {file.name}
                            </Typography>
                            <Typography fontSize={14}>
                              {moment( file.lastModified ).format( 'DD.MM.YYYY HH:mm:ss' ) || ''} / {toMegaByte( file.size ).toFixed( 2 )} МБайт
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 2 }}>
                            <RemoveCircle
                              sx={{ cursor: 'pointer' }}
                              color={'disabled'}
                              fontSize={'large'}
                              onClick={() => removeFileHandler( index )}
                            />
                          </Box>
                        </Box>
                      </ListItemText>
                    </ListItem>
                    <Divider sx={{ width: '100%' }}/>
                  </React.Fragment>
                )
              } )}
              {/*<img src={file}/>*/}
            </List>
          </FormControl>
        ) : <></>}
      </FormControl>
      <Modal
        open={modal.isOpen}
        onBackdropClick={() => setModal( { isOpen: false, imageContent: '' } )}
      >
        <Fade in={modal.isOpen}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '45vw',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            outline: 0
          }}>

            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={modal.imageContent}
                loading={'eager'}
                style={{
                  objectFit: 'contain',
                  width: 'inherit',
                  height: 'inherit',
                  position: 'relative'
                }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}