import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {uploadImage, saveImage, deleteImage} from '../actions';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveImage = this.handleSaveImage.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleImageDrop = this.onImageDrop.bind(this);
  }

  handleUploadImage(file) {
    this.props.uploadImage(file.name, file);
  }


  onImageDrop(files) {
    this.handleUploadImage(files[0]);
  }

  handleSaveImage() {
    const scope = document.getElementById('newFeed-scope').value;
    this.props.saveImage(scope);
  }

  handleDeleteImage() {
    this.props.deleteImage();
  }
  /*handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }*/

  render() {
    return (
    <div>
      <div>
        {this.props.imageUrl === null ?
        <div clasName="FileUpload">
          <Dropzone
            multiple={false}
            accept='image/*'
            onDrop={this.handleImageDrop}>
            <p> Drop an image </p>
          </Dropzone>
        </div>  :
        <div>
         <p>{this.props.imageName}</p>
          <img src={this.props.imageUrl} />
          <div className="line">
            <button id="upload-image" className="changeButtons" onClick={this.handleSaveImage}>Upload</button>
            <button id="delete-image" className="changeButtons" onClick={this.handleDeleteImage}>Delete</button>
          </div>
        </div>}
      </div>
    </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    imageUrl: state.image.url,
    imageName: state.image.name
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (name, file) => dispatch(uploadImage(name, file)),
    saveImage: (scope) => dispatch(saveImage(scope)),
    deleteImage: () => dispatch(deleteImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
