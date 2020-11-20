import { InputHTMLAttributes } from 'react'
import { PrismaCmsComponentProps } from '@prisma-cms/component/dist'
import { ApolloQueryResult } from '@apollo/client'
import FileInput from './FileInput'

export interface UploaderProps
  extends PrismaCmsComponentProps,
    InputHTMLAttributes<HTMLInputElement> {
  multiple?: boolean

  FileInput?: typeof FileInput

  onUpload: (result: UploadResponse) => void

  directory?: string

  name?: string

  helperText?: string
}

export interface SingleUploaderVariables {
  data: {
    file: File | null
    directory: string | undefined
    name: string
  }
}

export interface MultipleUploaderVariables {
  files: FileList | null
}

// export type UploadResponse = SingleUploadResponse | MultipleUploadResponse
// export type UploadResponse = SingleUploadResponse
export type UploadResponse = ApolloQueryResult<{
  singleUpload?: FileNode | null
  multipleUpload?: FileNode[] | null
}>

export interface FileNode extends Record<string, any> {
  id: string
  path: string
  mimetype: string
  size: number
  name?: string | null
  filename?: string | null
}
