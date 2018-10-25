
import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import chalk from "chalk";

import TestApp from "../default/App";

import {
  default as App,
  FileInput,
  SingleUploader,
  MultiUploader,
  Uploader,
} from "../../App";

class Renderer extends Component {

  static propTypes = {
  }

  render() {

    const {
      children,
      ...other
    } = this.props;

    return <div
      id="TestRendererContent"
      {...other}
    >
      {children}
    </div>

  }
}


describe('Uploader', () => {
  let node


  beforeEach(() => {
    node = document.createElement('root')
    node.id = "root";
    document.body.appendChild(node);
  })

  afterEach(() => {
    unmountComponentAtNode(node)
    document.body.removeChild(node);
  })


  it('SingleUploader', () => {


    render(<TestApp
      Renderer={Renderer}
    >
      <SingleUploader

      />
    </TestApp>, node, () => {

      // console.log(chalk.green("SingleUploader node"), node.innerHTML);


      const content = node.querySelector("#TestRendererContent");

      expect(content).toNotBe(null);

      const contentInnerHTML = content.innerHTML

      // console.log(chalk.green("content innerHTML"), contentInnerHTML);


      const input = content.querySelector("input");

      expect(input).toNotBe(null);

      const inputOuterHTML = input.outerHTML;

      // console.log(chalk.green("input outerHTML"), inputOuterHTML);
      // // console.log(chalk.green("input innerHTML"), input.innerHTML);

      expect(inputOuterHTML).toBe(contentInnerHTML);

      expect(input.multiple).toBe(false);


    })
  });


  it('MultiUploader', () => {


    render(<TestApp
      Renderer={Renderer}
    >
      <MultiUploader

      />
    </TestApp>, node, () => {

      // console.log(chalk.green("SingleUploader node"), node.innerHTML);


      const content = node.querySelector("#TestRendererContent");

      expect(content).toNotBe(null);

      const contentInnerHTML = content.innerHTML

      // console.log(chalk.green("content innerHTML"), contentInnerHTML);


      const input = content.querySelector("input");

      expect(input).toNotBe(null);

      const inputOuterHTML = input.outerHTML;

      // console.log(chalk.green("input outerHTML"), inputOuterHTML);
      // // console.log(chalk.green("input innerHTML"), input.innerHTML);

      expect(inputOuterHTML).toBe(contentInnerHTML);

      expect(input.multiple).toBe(true);

    })
  });

  it('App Custom', () => {


    render(<TestApp
      Renderer={Renderer}
    >
      <App
        id="uploader"
        multiple={true}
      >
        <div
          id="custom"
        >
          Custom
        </div>
      </App>
    </TestApp>, node, () => {

      // console.log(chalk.green("SingleUploader node"), node.innerHTML);


      const content = node.querySelector("#TestRendererContent");

      expect(content).toNotBe(null);

      const contentInnerHTML = content.innerHTML

      // console.log(chalk.green("content innerHTML"), contentInnerHTML);



      const uploader = content.querySelector("#uploader");

      expect(uploader).toNotBe(null);


      const uploaderOuterHTML = uploader.outerHTML;

      expect(uploaderOuterHTML).toBe(contentInnerHTML);



      const input = content.querySelector("input");

      expect(input).toNotBe(null);

      const inputOuterHTML = input.outerHTML;

      // console.log(chalk.green("input outerHTML"), inputOuterHTML);
      // // console.log(chalk.green("input innerHTML"), input.innerHTML);

      // expect(inputOuterHTML).toBe(contentInnerHTML);

      expect(input.multiple).toBe(true);


      const custom = content.querySelector("#custom");

      expect(custom).toNotBe(null);

      const customOuterHTML = custom.outerHTML;


      expect(uploader.innerHTML).toBe(inputOuterHTML + customOuterHTML);

    })
  });



})

