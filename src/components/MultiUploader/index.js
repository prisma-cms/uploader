

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { SingleUploader } from '../SingleUploader';

export class MultipleUploader extends SingleUploader {

  static defaultProps = {
    ...SingleUploader.defaultProps,
    multiple: true,
  };

  upload(target) {

    const {
      mutate,
    } = this.props;

    return target.validity.valid && mutate({
      variables: { files: target.files },
    })

  }

}


export default graphql(gql`
  mutation($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`)(MultipleUploader)