import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import MultiUploader from './components/MultiUploader';
import SingleUploader from './components/SingleUploader';

import UploadIcon from 'material-ui-icons/CloudUpload';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CircularProgress from "material-ui/Progress/CircularProgress";

const styles = theme => ({
  inputRoot: {
    minHeight: 54,
    maxWidth: 210,
    padding: "0 10px",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    border: "2px dotted #ddd",
    "&:hover": {
      borderColor: "#bbb",
      cursor: "pointer",
    },

  },
  dropable: {
    background: "rgba(255,255,0, 0.2)",
  },
  helperText: {
    marginLeft: 10,
  },
})

class FileInput extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    helperText: PropTypes.string,
    accept: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    helperText: `Для загрузки перетащите файлы сюда`,
  }

  constructor(props) {

    super(props);

    this.state = this.getInitialStore();

  }

  getInitialStore() {
    return {
      allowDrop: false,
    }
  }

  resetStore() {
    this.setState({
      ...this.getInitialStore(),
    });
  }

  getItems(event) {

    let items = [];

    if (event.dataTransfer && event.dataTransfer.items) {
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        items.push(item);
      }
    }

    return items;
  }


  onDrop(event) {

    event.preventDefault();
    event.stopPropagation();

    let valid = true;

    const {
      files,
    } = event.dataTransfer;

    this.onChange({
      target: {
        validity: {
          valid,
        },
        files,
      },
    });

    this.resetStore();
  }

  onChange(event) {

    const {
      onChange,
    } = this.props;

    onChange(event);
  }

  onDragOver(event) {
    event.preventDefault();

    const {
      allowDrop,
    } = this.state;

    if (!allowDrop) {
      this.setState({
        allowDrop: this.isAllowDrop(event),
      });
    }
  }


  isAllowDrop(event) {
    return true;
  }


  hasImages(event) {

    return this.getItems(event).findIndex(n => n.kind === "file" && /^image\//ui.test(n.type)) !== -1;
  }


  render() {

    const {
      onClick,
      onChange,
      multiple,
      classes,
      helperText,
      children,
      className,
      accept,
      loading,
      ...other
    } = this.props;

    const {
      allowDrop,
    } = this.state;

    let input = <input
      type="file"
      multiple={multiple}
      accept={accept}
      ref={input => {
        this.input = input;
      }}
      onChange={onChange}
      style={{
        display: "none",
      }}
    />

    return <div
      className={[className, classes.inputRoot, allowDrop ? classes.dropable : ""].join(" ")}

      onDragEnter={event => {
        event.preventDefault();
      }}

      onDragStart={event => {
        event.preventDefault();
      }}

      onDragOver={event => this.onDragOver(event)}

      onDragLeave={event => {
        event.preventDefault();
        this.resetStore();
      }}

      onDrop={(event) => this.onDrop(event)}

      onClick={event => {

        event.stopPropagation();

        this.input.click();

      }}

      {...other}
    >

      {input}

      {children || <Fragment>

        <IconButton>
          {loading ?
            <CircularProgress />
            :
            <UploadIcon
              className={classes.icon}
            />
          }
        </IconButton>

        {helperText ? <Typography
          component="span"
          className={classes.helperText}
        >{helperText}</Typography> : null}
      </Fragment>}

    </div>
  }
}

class Uploader extends Component {

  static propTypes = {
    multiple: PropTypes.bool.isRequired,
    FileInput: PropTypes.func.isRequired,
  }

  static defaultProps = {
    multiple: false,
    FileInput,
  }

  render() {

    const {
      FileInput,
      multiple,
      ...other
    } = this.props;

    const Component = multiple ? MultiUploader : SingleUploader;

    return (
      <Component
        FileInput={FileInput}
        multiple={multiple}
        {...other}
      />
    )
  }
}

export {
  styles,
  Uploader,
  MultiUploader,
  SingleUploader,
  FileInput,
}

export default withStyles(styles)(Uploader);