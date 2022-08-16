//ES6
import React, { Component, useState } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import './hash.css';
import { WithContext as ReactTags } from 'react-tag-input';

//import images from local
import img1 from './images/kitten/200.jpg'
import img2 from './images/kitten/201.jpg'
import img3 from './images/kitten/202.jpg'
import img4 from './images/kitten/203.jpg'

const imageList = [img1, img2, img3, img4]

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function UpLoad(){
  const [tags, setTags] = React.useState([
    { id: 'Thailand', type: 'Thailand' },
    { id: 'India', type: 'India' },
    { id: 'Vietnam', type: 'Vietnam' },
    { id: 'Turkey', type: 'Turkey' },
    { id: '1', type: 'song', className: 'song' },
    { id: '2', type: 'artist', className: 'artist' },
  ]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };
  const [imgList, setImgList] = useState([img]); 
  const [pick, setPick] = useState([])
  const onPick = (img) => {
    setPick({img})
  }
  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };


    return (
      <div>
        <ImagePicker 
          images={imageList.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPick}
        />
        <button type="button" onClick={() => console.log(this.state.image)}>OK</button>
        <h1> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          labelField={'type'}
          inputFieldPosition="bottom"
          autocomplete
        />
      </div>
      </div>
    )
}

export default UpLoad