import React, { useState } from 'react';
import { render } from 'react-dom';
import './hash.css';
import { WithContext as ReactTags } from 'react-tag-input';


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Hash = () => {
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

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div className="app">
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
  );
};

export default Hash;
