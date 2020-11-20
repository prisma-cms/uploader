import Uploader from '..'

/**
 * @deprecated
 */
export class SingleUploader extends Uploader {
  static defaultProps = {
    ...Uploader.defaultProps,
    multiple: false,
  }
}

export default SingleUploader
