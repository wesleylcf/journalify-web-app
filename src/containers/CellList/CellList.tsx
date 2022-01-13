import React, { Fragment, useEffect, useMemo } from "react";
import Cell from "../../components/Cell/Cell";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import AddCell from "../../components/AddCell/AddCellBar";
import SaveStatus from "../../components/SaveStatus/SaveStatus";
import DeleteFileButton from "../../components/DeleteFileButton/DeleteFileButton";
import "./cellList.css";
import Spinner from "../../components/Spinner/Spinner";
import { File } from "../../store";

interface CellListProps {
  fileName: string;
}

const CellList: React.FC<CellListProps> = ({ fileName }) => {
  const user = useTypedSelector(({ auth: { user } }) => user);
  const files = useTypedSelector(({ files: { files } }) => files);
  const cells = files[fileName].order.map((id) => files[fileName].data[id]);
  const { saving, loading } = files[fileName];
  const { fetchFile } = useActions();

  useEffect(() => {
    fetchFile();
    // eslint-disable-next-line
  }, []);
  if (loading) return <Spinner message="Loading file..." />;
  let child = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <Cell cell={cell} fileName={fileName} />
        <AddCell prevId={cell.id} />
      </Fragment>
    );
  });

  return (
    <div className={`CellList`}>
      {user ? <DeleteFileButton fileName={fileName} /> : null}
      {!user ? null : <SaveStatus saving={saving} />}
      <AddCell forceVisible={cells.length === 0 ? true : false} prevId={null} />
      {child}
    </div>
  );
};

export default React.memo(CellList);
