import { AutocompleteProps, styled, TextField, TextFieldProps } from '@mui/material'
import { colors } from '../Lists/FileList'
import { Autocomplete } from '@mui/material'

export const MyAutocomplete = styled(Autocomplete)<AutocompleteProps<any, any, any, any>>( ( { theme } ) => ( {
  // 'fieldset': {
  //   borderColor: colors.secondary
  // }
  // '&.MuiAutocomplete-root': {
  //   '& .Mui-focused': {
  //     '& fieldset': {
  //       borderColor: colors.secondary
  //     }
  //   },
  //   '& fieldset':{
  //     borderColor: colors.info
  //   }
  // }
} ) )