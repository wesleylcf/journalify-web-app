import React, { Fragment, useEffect } from "react";
import Cell from "../../components/Cell/Cell";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import AddCell from "../../components/AddCell/AddCellBar";
import SaveStatus from "../../components/SaveStatus/SaveStatus";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import "./cellList.css";
import Spinner from "../../components/Spinner/Spinner";

const CellList: React.FC = () => {
  const user = useTypedSelector(({ auth: { user } }) => user);
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });
  const [saving, loading] = useTypedSelector(
    ({ cells: { saving, loading } }) => [saving, loading]
  );

  const { fetchCells, logout } = useActions();

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line
  }, [user]);
  if (loading) return <Spinner />;
  let child = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <Cell cell={cell} />
        <AddCell prevId={cell.id} />
      </Fragment>
    );
  });
  return (
    <div className={`CellList`}>
      {!user ? null : <SaveStatus saving={saving} />}
      {user && <LogoutButton onClick={() => logout(user)} />}
      <AddCell forceVisible={cells.length === 0 ? true : false} prevId={null} />
      {child}
    </div>
  );
};

export default CellList;
