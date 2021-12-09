import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import styles from './editor.module.css';
import React, { useRef } from 'react';

interface EditorProps {
  initialValue: string;
  onChangeHandler(value: string): void;
}
const Editor: React.FC<EditorProps> = ({ initialValue, onChangeHandler }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChangeHandler(getValue());
    });
  };
  const onFormatHandler = () => {
    const input = editorRef.current.getModel().getValue();
    try {
      const formatted = prettier
        .format(input, {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, '');
      editorRef.current.setValue(formatted);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className={styles.Editor}>
      <button
        className={`button ${styles.ButtonFormat} is-primary is-small `}
        onClick={onFormatHandler}
      >
        Format Code
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        height="100%"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          fontSize: 16,
          scrollBeyondLastLine: false,
          folding: false,
          lineNumbersMinChars: 3,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default Editor;
