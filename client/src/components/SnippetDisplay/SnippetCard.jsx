import React, { useState } from 'react';
import styles from './SnippetCard.module.scss';
import { Card } from 'react-bootstrap';
import DarkModeToggler from '../DarkModeToggler/DarkModeToggler';
import FooterButtons from './FooterButtons';
import Snippet from './Snippet';

const SnippetCard = ({ selectedSnippet, getSnippet }) => {
  // indSnippet = this.props
  // create delete method using fetch request
  let snippetTitle = selectedSnippet.title ? selectedSnippet.title : '';
  let snippetLanguage = selectedSnippet.language
    ? selectedSnippet.language
    : '';
  let snippetComments = selectedSnippet.comments
    ? selectedSnippet.comments
    : '';
  let snippetStoredCode = selectedSnippet.storedCode
    ? selectedSnippet.storedCode
    : '';
  let snippetTagList = selectedSnippet.tags ? selectedSnippet.tags : [];

  // create a state variable for each passed down state and the its setState function
  // const [title, setTitle] = useState(snippetTitle);
  // const [language, setLanguage] = useState(snippetLanguage);
  // const [comments, setComments] = useState(snippetComments);
  // const [storedCode, setStoredCode] = useState(snippetStoredCode);
  // const [tagList, setTags] = useState(snippetTagList);
  const [editButtonState, setEditButtonState] = useState(false);

  const deleteSnippet = (id) => {
    fetch(`http://localhost:3000/snippets?id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          getSnippet();
        }
      })
      .catch((err) => {
        return {
          log: `SnippetDisiplay.deleteSnippet: Error: ${err}`,
          status: err.status || 500,
          message: 'There was an error deleting snippet.',
        };
      });
  };

  const editSnippet = (id) => {
    // const [oldState, setOldState] = React.useState([]);
    // create an object (eventually will hold the updated state)
    const updatedSnippet = {
      id: id,
      title: snippetTitle,
      comments: snippetComments,
      storedCode: snippetStoredCode,
      tags: snippetTagList,
      language: snippetLanguage,
    };
    // within fetch request (post)
    // body: JSON.stringify(created object)
    fetch(`/snippets?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedSnippet),
    })
      .then((response) => {
        response.json();
        getSnippet();
      })
      .catch((err) => {
        return {
          log: `SnippetDisplay.editSnippet: Error: ${err}`,
          status: err.status || 500,
          message: 'There was an error editing code snippet.',
        };
      });
  };
  // copy code state
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Card className={styles.card}>
        <DarkModeToggler />
        <Snippet
          editSnippet={editSnippet}
          setEditButtonState={setEditButtonState}
          editButtonState={editButtonState}
          snippetComments={snippetComments}
          snippetTitle={snippetTitle}
          snippetLanguage={snippetLanguage}
          snippetTagList={snippetTagList}
          selectedSnippet={selectedSnippet}
          snippetStoredCode={snippetStoredCode}
          setCopied={setCopied}
        />
        <FooterButtons
          deleteSnippet={deleteSnippet}
          setEditButtonState={setEditButtonState}
          selectedSnippet={selectedSnippet}
        />
      </Card>
    </>
  );
};

export default SnippetCard;
