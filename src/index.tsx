import React from 'react'

// import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { DocumentNode } from 'graphql'

import PrismaCmsComponent from '@prisma-cms/component'

import FileInput from './FileInput'

import {
  UploaderProps,
  MultipleUploaderVariables,
  SingleUploaderVariables,
} from './interfaces'

export * from './interfaces'

export class Uploader extends PrismaCmsComponent<UploaderProps> {
  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    FileInput,
    multiple: false,
    directory: '',
  }

  handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const result = await this.upload(target)

    const { onUpload } = this.props

    if (onUpload) {
      onUpload(result)
    }

    return result
  }

  upload = async (target: HTMLInputElement) => {
    const { multiple } = this.props

    let mutation: DocumentNode | undefined

    if (multiple) {
      mutation = gql`
        mutation($files: [Upload!]!) {
          multipleUpload(files: $files) {
            id
            name
            filename
            encoding
            mimetype
            path
            size
          }
        }
      `
    } else {
      mutation = gql`
        mutation($file: Upload, $data: SingleUploadInput) {
          singleUpload(file: $file, data: $data) {
            id
            name
            filename
            encoding
            mimetype
            path
            size
          }
        }
      `
    }

    return (
      target.validity.valid &&
      this.mutate({
        // mutate,
        mutation,
        variables: this.getVariables(target),
      })
    )
  }

  getVariables(
    target: HTMLInputElement
  ): SingleUploaderVariables | MultipleUploaderVariables {
    const { directory, name, multiple } = this.props

    let variables:
      | SingleUploaderVariables
      | MultipleUploaderVariables
      | undefined

    if (multiple) {
      variables = { files: target.files }
    } else {
      const file = target.files ? target.files[0] : null

      variables = {
        data: {
          file,
          directory,
          name,
        },
      }
    }

    return variables
  }

  render() {
    // console.log("target this.props", { ...this.props });

    const {
      // eslint-disable-next-line
      onUpload,

      multiple,
      FileInput,
      ...other
    } = this.props

    const { loading } = this.state

    if (!FileInput) {
      return null
    }

    return (
      <>
        {super.render()}

        <FileInput
          {...other}
          loading={loading || false}
          multiple={multiple}
          onChange={this.handleChange}
        />
      </>
    )
  }
}

export default Uploader
