import React from 'react';
import TagInput from '../../components/ui/TagInput/TagInput';

const SnippetInfo = ({
  editButtonState,
  snippetComments,
  snippetTitle,
  snippetLanguage,
  snippetTagList,
}) => {
  return (
    <div className='displayContainer'>
      <p className='title'>
        <span className='title'> Title: </span>
        {!editButtonState && snippetTitle}
        {editButtonState && (
          <input
            defaultValue={snippetTitle}
            className='titleEdit'
            onChange={(e) => {
              snippetTitle = e.target.value;
            }}
          ></input>
        )}
      </p>
      <p className='language'>
        <span> Language: </span>
        {!editButtonState && snippetLanguage}
        {editButtonState && (
          <input
            defaultValue={snippetLanguage}
            className='languageEdit'
            onChange={(e) => {
              snippetLanguage = e.target.value;
            }}
          ></input>
        )}
      </p>
      <p className='comments'>
        <span> Comments: </span>
        {!editButtonState && snippetComments}
        {editButtonState && (
          <input
            defaultValue={snippetLanguage}
            className='languageEdit'
            onChange={(e) => {
              snippetLanguage = e.target.value;
            }}
          ></input>
        )}
      </p>
      <TagInput className='tags' tags={snippetTagList} />
      {/* <div className="tagContainer">{renderTags()}</div> */}
    </div>
  );
};

export default SnippetInfo;
