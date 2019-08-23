
import React from 'react'
import PropTypes from 'prop-types'

// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PrismaCmsComponent from "@prisma-cms/component";


import FileInput from '../FileInput';

export class SingleUploader extends PrismaCmsComponent {

  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...PrismaCmsComponent.propTypes,
    mutate: PropTypes.func,
    mutation: PropTypes.object,
    FileInput: PropTypes.func.isRequired,
    multiple: PropTypes.bool.isRequired,
    onUpload: PropTypes.func,
  };


  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    FileInput,
    multiple: false,
    mutation: gql`
      mutation(
        $file: Upload
        $data: SingleUploadInput
      ) {
        singleUpload(
          file: $file
          data: $data
        ) {
          id
          name
          filename
          encoding
          mimetype
          path
          size
        }
      }
    `,
  };


  async handleChange({ target }) {

    const result = await this.upload(target);

    const {
      onUpload,
    } = this.props;

    if (onUpload) {
      onUpload(result);
    }

    return result;

  }


  upload(target) {

    const {
      mutate,
      mutation,
      directory,
      name,
    } = this.props;

    // console.log("target this.props", { ...this.props });

    return target.validity.valid && this.mutate({
      mutate,
      mutation,
      variables: {
        data: {
          file: target.files[0],
          directory,
          name,
        },
      },
    });
  }


  render() {

    // console.log("target this.props", { ...this.props });

    const {
      mutate,
      multiple,
      onUpload,
      FileInput,
      ...other
    } = this.props;

    const {
      loading,
    } = this.state;

    return super.render(<FileInput
      loading={loading || false}
      multiple={multiple}
      onChange={event => this.handleChange(event)}
      {...other}
    />)

  }

}

export default SingleUploader;


// export default graphql(gql`
//   mutation(
//     $file: Upload
//     $data: SingleUploadInput
//   ) {
//     singleUpload(
//       file: $file
//       data: $data
//     ) {
//       id
//       name
//       filename
//       encoding
//       mimetype
//       path
//     }
//   }
// `)(SingleUploader);