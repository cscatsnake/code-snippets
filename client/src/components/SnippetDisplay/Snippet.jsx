import React from 'react';
import { Button } from 'react-bootstrap';
import CodeEditor from './CodeEditor';
import SnippetInfo from './SnippetInfo';
import styles from './SnippetCard.module.scss';

const Snippet = ({
  editSnippet,
  setEditButtonState,
  editButtonState,
  snippetComments,
  snippetTitle,
  snippetLanguage,
  snippetTagList,
  selectedSnippet,
  snippetStoredCode,
  setCopied,
}) => {
  return (
    <div className={styles.entireSnippetDisplay}>
      <SnippetInfo
        editButtonState={editButtonState}
        snippetComments={snippetComments}
        snippetTitle={snippetTitle}
        snippetLanguage={snippetLanguage}
        snippetTagList={snippetTagList}
      />
      <CodeEditor snippetStoredCode={snippetStoredCode} setCopied={setCopied} />
      {editButtonState && (
        <Button
          className='saveEditButton'
          onClick={() => {
            editSnippet(selectedSnippet.id);
            setEditButtonState(false);
          }}
        >
          Save Edit
        </Button>
      )}
    </div>
  );
};

export default Snippet;
