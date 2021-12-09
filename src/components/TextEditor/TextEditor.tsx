import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./textEditor.css";
import { Cell } from "../../store/types";
import { useActions } from "../../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorRef.current &&
        event.target &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  const onEditHandler = () => {
    setIsEditing(true);
  };
  const onEditTextHandler = (text: string) => {
    updateCell(cell.id, text);
  };
  return (
    <div className="card">
      {isEditing ? (
        <div ref={editorRef} className={`card-content text-editor`}>
          <div className="MDEditor-wrapper">
            <MDEditor
              value={cell.content}
              onChange={(text) => onEditTextHandler(text || "")}
            />
          </div>
        </div>
      ) : (
        <div onClick={onEditHandler} className="text-editor card-content">
          <div className="MDEditor-wrapper">
            <MDEditor.Markdown source={cell.content || "Click to edit"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
