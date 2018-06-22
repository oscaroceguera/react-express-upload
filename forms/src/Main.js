import React, { Component } from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'

class Main extends Component {
  state = {
    imageURL: '',
    uploadStatus: false,
    error: null
  }

  handleUploadImage = (e) => {
    e.preventDefault()

    let data = new FormData()

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
  
  onDrop (acceptedFiles, rejectedFiles ){
    const data = new FormData()

    data.append('file', acceptedFiles[0])
    data.append('filename', acceptedFiles[0].name)

    this.uploadFile(data)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input ref={ref => { this.uploadInput = ref}} type='file' />
          </div>
          <div>
            <input ref={ref => { this.filename = ref }} type='text' placeholder='Enter the desired name of file' />
          </div>
          <div style={{ width: '100%' }}>
            <Dropzone
              style={{ background: 'gray', margin: '1em', width: '400px', border: '1px solid blue', padding: '1em', height: '100px' }}
              onDrop={files => this.onDrop(files)}
            >
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
          <br />
          <div>
            <button>Upload</button>
          </div>
        </form>
        <div style={{width: '100%', border: '1px solid black', textAlign: 'center'}}>
          <img width='500px' src={this.state.imageURL} alt="img" />
        </div>
      </div>
    )
  }
}

export default Main