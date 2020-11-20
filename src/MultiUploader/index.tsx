import Uploader from '..'

/**
 * @deprecated
 */
export class MultipleUploader extends Uploader {
  static defaultProps = {
    ...Uploader.defaultProps,
    multiple: true,
  }
}

export default MultipleUploader
