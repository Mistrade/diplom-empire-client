import { Stepper, StepperProps, styled } from '@mui/material'
import { colors } from './FileList'

export const MyStepper = styled( Stepper )<StepperProps>( ( { theme } ) => ( {
  '&.MuiStepper-root': {
    '& .MuiSvgIcon-root': {
      '&.Mui-active': {
        color: colors.primary
      },
      '&.Mui-completed':{
        color: colors.secondary
      }
    }
  }
} ) )