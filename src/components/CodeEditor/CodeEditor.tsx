import { useEffect } from "react";
import Editor from "./Editor/Editor";
import Preview from "./Preview/Preview";
import { useTypedSelector } from ".././../hooks/useTypedSelector";
import Resizable from "../Resizable/Resizable";
import { useActions } from "../../hooks/useActions";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";
import styles from "./codeEditor.module.css";
import { Cell } from "../../store/types";

interface CodeEditorProps {
  cell: Cell;
  fileName: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ cell, fileName }) => {
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id, fileName);
  const { updateCell, createBundle } = useActions();
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className={styles.CodeEditor}>
        <Resizable direction="horizontal">
          <Editor
            initialValue={cell.content}
            onChangeHandler={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className={styles.ProgressBackground}>
          {!bundle || bundle.isLoading ? (
            <div className={styles.ProgressWrapper}>
              <progress className={`progress is-small is-primary`} max="100">
                {" "}
                Loading{" "}
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeEditor;
