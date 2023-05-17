import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { langs } from '@uiw/codemirror-extensions-langs';
import styles from './AddSnippet.module.scss';
import React, { useState } from 'react';
import SaveModal from '../../components/AddSnippet/SaveModal.jsx';
import TagInput from '../../components/ui/TagInput/TagInput';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LANGUAGES } from '../../data/data.js';

const AddSnippet = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [comments, setComments] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const [tagList, setTags] = useState('');
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (title === '') {
      setError(true);
      return;
    } else {
      setOpenModal(true);
      setError(false);
    }

    fetch('/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        language: language,
        comments: comments,
        tags: tagList,
        storedCode: storedCode,
      }),
    })
      .then((data) => data.json())
      .catch((err) => {
        console.log(err);
        console.log('failed saving snippet');
      });

    // setTitle('');
    // setLanguage('');
    // setComments('');
    // setStoredCode('');
  }

  // wrapper function for setTags to send to TagInput
  function setTagsWrapper(tags) {
    setTags(tags);
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer modal show'>
        <Modal
          className={styles.modal}
          show={true}
          onHide={() => closeModal(false)}
          size='xl'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header className={styles.header}>
            <Modal.Title className='col-12 text-center'>
              Add a snippet
            </Modal.Title>
          </Modal.Header>
          <br />

          <div className={styles.codeSnippet}>
            <label>Title: </label>
            <input
              className={styles.title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            {error && <span className='error'>Title is required!</span>}
            <br />
            <br />

            <label>Language: </label>
            <select
              className={styles.language}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label>Comments: </label>
            <input
              className={styles.comments}
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
              }}
            ></input>
            <br />
            <br />

            <label>Tags: </label>
            <TagInput className={styles.tags} onChange={setTagsWrapper} />
            <hr />

            <h5 className='px-2'>Enter code:</h5>
            <CodeMirror
              className={styles.editor}
              height='500px'
              id='storedCode'
              // value={storedCode}
              extensions={[langs.tsx()]}
              placeholder={
                "const sayHi = () => {\n  console.log('Hello World!)\n}"
              }
              onChange={(e) => setStoredCode(e)}
            ></CodeMirror>
            {/* <input
              id='storedCode'
              value={storedCode}
              onChange={(e) => {
                setStoredCode(e.target.value);
              }}
            ></input> */}
          </div>

          <Modal.Footer>
            {openModal && <SaveModal closeModal={setOpenModal} />}
            <Button variant='secondary' onClick={() => closeModal(false)}>
              Close
            </Button>
            <Button
              variant='primary'
              className='saveButton'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddSnippet;
