import React, { Fragment, useEffect } from "react";
import Cell from "../../components/Cell/Cell";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import AddCell from "../../components/AddCell/AddCellBar";
import SaveStatus from "../../components/SaveStatus/SaveStatus";
import DeleteFileButton from "../../components/DeleteFileButton/DeleteFileButton";
import "./cellList.css";
import Spinner from "../../components/Spinner/Spinner";

const CellListOffline = () => {
  const files = useTypedSelector(({ files: { files } }) => files);
  const cells = files["intro"].order.map((id) => files["intro"].data[id]);
  const { loading } = files["intro"];
  console.log("CellList Offline");
  if (loading) return <Spinner message="Loading file..." />;

  let child = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <Cell cell={cell} fileName="intro" />
        <AddCell prevId={cell.id} />
      </Fragment>
    );
  });
  return (
    <div className={`CellList`}>
      <AddCell forceVisible={cells.length === 0 ? true : false} prevId={null} />
      {child}
    </div>
  );
};

export default React.memo(CellListOffline);
