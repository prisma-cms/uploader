import React from 'react'
import { action } from '@storybook/addon-actions'

import { Meta } from '@storybook/react'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'

import Uploader from '../src'

import { UploaderProps, UploadResponse } from '../src'

import Renderer from './Renderer'

const title = '@prisma-cms/uploader/MultipleUploader'

export const MultipleUploader: React.FC<UploaderProps> = ({
  multiple = true,
  ...other
}) => {
  return (
    <Renderer multiple={multiple} {...other}>
      <Uploader multiple={multiple} {...other} />
    </Renderer>
  )
}

const args: UploaderProps = {
  name: 'test_file',
  onUpload: (result: UploadResponse) => {
    const files = result.data.multipleUpload
    action('onUpload files')(files)
  },
  accept: 'image/*',
  // mutate: (data) => {
  //   action("mutate")(data);
  // },
}

export default {
  title,
  component: MultipleUploader,
  argTypes: {},
  args,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>{title}</Title>
          <Subtitle></Subtitle>
          <Description></Description>
          <Primary></Primary>
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta
