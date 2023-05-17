import React from 'react';
import styles from './SnippetCard.module.scss';
import CodeMirror from '@uiw/react-codemirror';
// import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { langs } from '@uiw/codemirror-extensions-langs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'react-bootstrap';

const CodeEditor = ({ snippetStoredCode, setCopied }) => {
  return (
    <CodeMirror
      className={styles.editor}
      height='500px'
      id='storedCode'
      value={snippetStoredCode}
      // theme={okaidia}
      extensions={[langs.tsx()]}
      //   placeholder={'const sayHi = () => {\n  console.log(\'Hello World!)\n}'}
      options={{
        readOnly: true,
      }}
      onChange={(e) => (snippetStoredCode = e)}
    >
      <CopyToClipboard text={snippetStoredCode} onCopy={() => setCopied(true)}>
        <Button className='copyButton'> Copy Code Snippet </Button>
      </CopyToClipboard>
    </CodeMirror>
  );
};

export default CodeMirror;
