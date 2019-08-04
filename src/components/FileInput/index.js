
import React, { Component } from 'react'

export default class FileInput extends Component{

  render(){
    
    console.log("FileInput this.props", { ...this.props });

    return <input
      type="file"
      {...this.props}
    />

  }

}
