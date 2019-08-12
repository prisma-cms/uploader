

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { SingleUploader } from '../SingleUploader';

export class MultipleUploader extends SingleUploader {

  static defaultProps = {
    ...SingleUploader.defaultProps,
    multiple: true,
    mutation: gql`
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
    `,
  };

  upload(target) {

    const {
      mutate,
      mutation,
    } = this.props;

    return target.validity.valid && this.mutate({
      mutate,
      mutation,
      variables: { files: target.files },
    })

  }

}

export default MultipleUploader;

// export default graphql(gql`
//   mutation($files: [Upload!]!) {
//     multipleUpload(files: $files) {
//       id
//       filename
//       encoding
//       mimetype
//       path
//     }
//   }
// `)(MultipleUploader)