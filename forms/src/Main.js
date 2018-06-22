import React, { Component } from 'react'
import axios from 'axios'

class Main extends Component {
  state = {
    imageURL: '',
    uploadStatus: false,
    error: null
  }

  handleUploadImage = (e) => {
    e.preventDefault()

    let data = new FormData()

    // console.log('this.uploadInput', this.uploadInput.files[0])
    // console.log('this.filename', this.filename.value)
    data.append('file', this.uploadInput.files[0])
    data.append('filename', this.filename.value)

    this.uploadFile(data)
  }

  async uploadFile(data) {
    const host = 'http://localhost:8000'
    try {
      const response = await axios.post(`${host}/upload`, data)
      this.setState({
        imageURL: `${host}/${response.data.file}`,
        uploadStatus: true
      })
    } catch (error) {
      this.setState({
        error: error.message
      })
    } 
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={ref => { this.uploadInput = ref}} type='file' />
        </div>
        <div>
          <input ref={ref => { this.filename = ref }} type='text' placeholder='Enter the desired name of file' />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    )
  }
}

export default Main