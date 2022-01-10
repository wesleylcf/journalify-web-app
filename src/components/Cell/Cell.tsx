import React from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import TextEditor from "../TextEditor/TextEditor";
import { Cell as CellType } from "../../store";
import ToolBar from "./ToolBar/ToolBar";
import styles from "./cell.module.css";
import { AnimateSharedLayout, motion } from "framer-motion";

interface CellListItemProps {
  cell: CellType;
  fileName: string;
}

const Cell: React.FC<CellListItemProps> = ({ cell, fileName }) => {
  let child =
    cell.type === "code" ? (
      <>
        <AnimateSharedLayout>
          <motion.div layout>
            <div className={styles.ToolBar}>
              <ToolBar id={cell.id} />
            </div>
            <CodeEditor cell={cell} fileName={fileName} />
          </motion.div>
        </AnimateSharedLayout>
      </>
    ) : (
      <>
        <AnimateSharedLayout>
          <motion.div layout>
            <TextEditor cell={cell} fileName={fileName} />
            <div>
              <ToolBar id={cell.id} />
            </div>
          </motion.div>
        </AnimateSharedLayout>
      </>
    );
  return <div className={styles.Cell}>{child}</div>;
};

export default Cell;
