import React from 'react'
import UploadIcon from 'material-ui-icons/CloudUpload'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/Progress/CircularProgress'

import { FileInputProps, FileInputState } from './interfaces'
import { FileInputStyled } from './styles'

export * from './interfaces'

class FileInput extends React.PureComponent<FileInputProps, FileInputState> {
  // static propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   helperText: PropTypes.string,
  //   accept: PropTypes.string,
  //   loading: PropTypes.bool.isRequired,
  // };

  static defaultProps = {
    loading: false,
  }

  input: HTMLInputElement | null = null

  constructor(props: FileInputProps) {
    super(props)

    this.state = this.getInitialStore()
  }

  getInitialStore() {
    return {
      allowDrop: false,
    }
  }

  resetStore() {
    this.setState({
      ...this.getInitialStore(),
    })
  }

  getItems(event: React.DragEvent) {
    const items = []

    if (event.dataTransfer && event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i]
        items.push(item)
      }
    }

    return items
  }

  onDrop(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    const valid = true

    const { files } = event.dataTransfer

    this.onChange({
      target: {
        validity: {
          valid,
        },
        files,
      },
    })

    this.resetStore()
  }

  onDragOver = (event: React.DragEvent) => {
    event.preventDefault()

    const { allowDrop } = this.state

    if (!allowDrop) {
      this.setState({
        allowDrop: this.isAllowDrop(event),
      })
    }
  }

  onDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    this.resetStore()
  }

  isAllowDrop(_event?: React.DragEvent) {
    return true
  }

  onChange(event: any) {
    const { onChange } = this.props

    onChange(event)
  }

  hasImages(event: React.DragEvent) {
    return (
      this.getItems(event).findIndex(
        (n) => n.kind === 'file' && /^image\//iu.test(n.type)
      ) !== -1
    )
  }

  inputRef = (input: HTMLInputElement) => {
    this.input = input
  }

  preventDefault = (event: React.DragEvent) => {
    event.preventDefault()
  }

  onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    this.input?.click()
  }

  render() {
    const {
      // onClick,
      onChange,
      multiple,
      helperText,
      children,
      className,
      accept,
      loading,
      ...other
    } = this.props

    const { allowDrop } = this.state

    const input = (
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        ref={this.inputRef}
        onChange={onChange}
        style={{
          display: 'none',
        }}
      />
    )

    return (
      <FileInputStyled
        {...other}
        className={[className, 'inputRoot', allowDrop ? 'dropable' : ''].join(
          ' '
        )}
        onDragEnter={this.preventDefault}
        onDragStart={this.preventDefault}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.onClick}
      >
        {input}

        {children || (
          <>
            <IconButton>
              {loading ? (
                <CircularProgress />
              ) : (
                <UploadIcon className={'icon'} />
              )}
            </IconButton>

            {helperText ? (
              <Typography component="span" className={'helperText'}>
                {helperText}
              </Typography>
            ) : null}
          </>
        )}
      </FileInputStyled>
    )
  }
}

export default FileInput
