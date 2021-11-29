import React from 'react'
import { FileProps } from '../TaskManager/TaskPage/TaskPage'
import ImageIcon from '@mui/icons-material/Image'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article';

export const FileImageAvatar: React.FC<{ ext: FileProps['ext'] }> = ( { ext } ) => {
  switch (ext) {
    case 'jpg':
      return (
        <>
          <ImageIcon color={'primary'} fontSize={'large'}/>
        </>
      )
    case 'png':
      return (
        <>
          <ImageIcon color={'primary'} fontSize={'large'}/>
        </>
      )
    case 'pdf':
      return (
        <>
          <PictureAsPdfIcon color={'primary'} fontSize={'large'}/>
        </>
      )
    default:
      return (
        <>
          <ArticleIcon color={'primary'} fontSize={'large'} />
        </>
      )
  }
}