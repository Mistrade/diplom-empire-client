import React, { FC, ReactNode, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  TooltipProps,
  Typography
} from '@mui/material'
import { DeleteForeverOutlined } from '@mui/icons-material'


interface DeleteWithTooltipProps {

  title: string | ReactNode,
  actions?: () => ReactNode,
  onClick?: () => Promise<any> | any,
  onClose?: () => Promise<any> | any,
  placement?: TooltipProps['placement'],
  withArrow?: boolean
}

export const DeleteWithTooltip: FC<DeleteWithTooltipProps> = ( {
                                                                 title,
                                                                 actions,
                                                                 onClick,
                                                                 onClose,
                                                                 placement,
                                                                 withArrow
                                                               } ) => {
  const [state, setState] = useState( false )

  return (
    <Tooltip
      sx={{ bgcolor: '#FFF' }}
      placement={placement || 'top'}
      arrow={withArrow || true}
      onClose={() => {
        setState( false )
        onClose && onClose()
      }}
      disableHoverListener={true}
      disableTouchListener={true}
      disableFocusListener={false}
      open={state}
      title={(
        <>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}
          >

            {typeof title === 'string' ? (
              <Typography variant={'h6'} fontSize={16} mb={1}>
                {title}
              </Typography>
            ) : title}

            {actions && actions()}
          </Box>
        </>
      )}
    >
      <IconButton
        onClick={() => {
          setState( true )
          onClick && onClick()
        }}
      >
        {/*{loadOptions.isLoad.items.includes( `${item.id || item.title}-deletable` ) ? (*/}
        {/*  <CircularProgress size={25} color={'error'}/>*/}
        {/*) : (*/}
        <DeleteForeverOutlined color={'error'}/>
        {/*)}*/}
      </IconButton>
    </Tooltip>
  )
}