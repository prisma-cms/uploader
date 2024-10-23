import React, { useCallback } from 'react'
import { action } from '@storybook/addon-actions'

import {
  UploaderProps,
  UploadResponse,
  SingleUploaderVariables,
  MultipleUploaderVariables,
} from '../src'

import Context from '@prisma-cms/context'

type RendererProps = Partial<UploaderProps>

const Renderer: React.FC<RendererProps> = ({ children, multiple }) => {
  const mutate = useCallback(
    async (
      options: SingleUploaderVariables | MultipleUploaderVariables
    ): Promise<UploadResponse> => {
      action('mutate')(options)

      let response: UploadResponse | null = null

      if (multiple) {
        response = {
          loading: false,
          networkStatus: 7,
          data: {
            multipleUpload: [
              {
                id: 'test-id',
                mimetype: 'image/png',
                filename: 'image.png',
                path: 'uploads/image.png',
                size: 10000,
              },
              {
                id: 'test-id-2',
                mimetype: 'image/png',
                filename: 'image-2.png',
                path: 'uploads/image-2.png',
                size: 10000,
              },
              {
                id: 'test-id-3',
                mimetype: 'image/png',
                filename: 'image-3.png',
                path: 'uploads/image-3.png',
                size: 10000,
              },
            ],
          },
        }
      } else {
        response = {
          loading: false,
          networkStatus: 7,
          data: {
            singleUpload: {
              id: 'test-id',
              mimetype: 'image/png',
              filename: 'image.png',
              path: 'uploads/image.png',
              size: 10000,
            },
          },
        }
      }

      return response
    },
    [multiple]
  )

  return (
    <Context.Provider
      value={{
        client: {
          mutate,
        },
      }}
    >
      <p>Multiple: {multiple ? 'Yes' : 'No'}</p>
      {children}
    </Context.Provider>
  )
}

export default Renderer
