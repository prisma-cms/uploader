import { InputHTMLAttributes } from 'react'

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // classes: PropTypes.object.isRequired,
  helperText?: string

  loading?: boolean

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FileInputState {
  allowDrop: boolean
}
