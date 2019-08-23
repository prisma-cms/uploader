import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'
import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

// import * as queryFragments from "@prisma-cms/front/lib/schema/generated/api.fragments";

import App, {
  SingleUploader,
  MultiUploader,
} from "../App";

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import { NavLink } from "react-router-dom";

class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  renderMenu() {

    let customMenu = <Grid
      container
      spacing={16}
    >

      <Grid
        item
      >
        <NavLink
          to="/"
        >
          Style Uploader
      </NavLink>
      </Grid>

      <Grid
        item
      >
        <NavLink
          to="/pure-single"
        >
          Pure SingleUploader
      </NavLink>
      </Grid>

      <Grid
        item
      >
        <NavLink
          to="/pure-multi"
        >
          Pure MultiUploader
      </NavLink>

      </Grid>




    </Grid>

    return <Fragment>

      {super.renderMenu()}

      <div
        style={{
          margin: 20,
        }}
      >
        {customMenu}
      </div>

    </Fragment>

  }


  getRoutes() {

    return [
      {
        exact: true,
        path: "/",
        // component: App,
        render: props => {

          return <App
            directory="test2/inner/test/"
            name="Test"
            multiple
          // accept="audio/mp3"
          />
        }
      },
      {
        exact: true,
        path: "/pure-single",
        // component: SingleUploader,
        render: props => {

          return <SingleUploader
            directory="test3/inner/test/"
            name="Test3"
          // accept="audio/mp3"
          />
        }
      },
      {
        exact: true,
        path: "/pure-multi",
        component: MultiUploader,
      },
      {
        path: "*",
        render: props => this.renderOtherPages(props),
      },
    ];

  }

  renderWrapper() {

    return <Fragment>

      {this.renderMenu()}
      {super.renderWrapper()}

    </Fragment>;

  }


  render() {

    const {
      pure,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> : super.render();

  }

}

export default class DevApp extends Component {

  static propTypes = {
  }

  static defaultProps = {
    lang: "ru",
  }

  render() {

    const {
      ...other
    } = this.props;

    return <PrismaCmsApp
      Renderer={DevRenderer}
      // pure={true}
      {...other}
    />
  }
}

