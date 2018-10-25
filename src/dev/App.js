import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'
import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import * as queryFragments from "@prisma-cms/front/lib/schema/generated/api.fragments";

import App, {
  SingleUploader,
  MultiUploader,
} from "../App";

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import { NavLink } from "react-router-dom";

class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
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
        component: App,
      },
      {
        exact: true,
        path: "/pure-single",
        component: SingleUploader,
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
    queryFragments: PropTypes.object.isRequired,
  }

  static defaultProps = {
    queryFragments,
    lang: "ru",
  }

  render() {

    const {
      queryFragments,
      ...other
    } = this.props;

    return <PrismaCmsApp
      queryFragments={queryFragments}
      Renderer={DevRenderer}
      // pure={true}
      {...other}
    />
  }
}

