import React, { useState } from 'react';

function ImageUploader({ maxPhotos }) {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length + images.length <= maxPhotos) {
      setImages([...images, ...files]);
    } else {
      alert(`You can only upload up to ${maxPhotos} photos.`);
    }
  };

  return (
    <div className="image-uploader">
      <label>Upload up to {maxPhotos} photos</label>
      <input type="file" multiple onChange={handleImageUpload} />
      <div className="image-preview">
        {images.length > 0 &&
          Array.from(images).map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt="preview" />
          ))}
      </div>
    </div>
  );
}

export default ImageUploader;
