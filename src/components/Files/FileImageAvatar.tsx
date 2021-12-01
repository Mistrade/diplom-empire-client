import React from 'react'
import { FileProps } from '../TaskManager/TaskPage/TaskPage'
import ImageIcon from '@mui/icons-material/Image'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import { FileMetaInformation } from '../../common/uploadFileHandler'

export const FileImageAvatar: React.FC<{ ext?: FileMetaInformation['semanticExt'] }> = ( { ext } ) => {
  switch (ext) {
    case 'jpg':
      return (
        <>
          <ImageIcon color={'secondary'} fontSize={'large'}/>
        </>
      )
    case 'png':
      return (
        <>
          <ImageIcon color={'secondary'} fontSize={'large'}/>
        </>
      )
    case 'pdf':
      return (
        <>
          <PictureAsPdfIcon color={'secondary'} fontSize={'large'}/>
        </>
      )
    default:
      return (
        <>
          <ArticleIcon color={'secondary'} fontSize={'large'}/>
        </>
      )
  }
}