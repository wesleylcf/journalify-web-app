import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useActions } from "../../hooks/useActions";
import { useContext } from "react";
import { ModalContext } from "../..";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const ConfirmDeleteModal = ({ fileName, hideModal }) => {
  const [files, loading] = useTypedSelector(({ files: { files, loading } }) => [
    files,
    loading,
  ]);
  //   const oldFilesArray = Object.keys(files);
  //   const newFilesArray = oldFilesArray.splice(oldFilesArray.indexOf(fileName));
  //   console.log("OFA", oldFilesArray);
  //   console.log("NFA", newFilesArray);
  //   console.log("files_modal", files);
  const { deleteFile } = useActions();
  const onConfirmHandler = () => {
    deleteFile(fileName);
    hideModal();
  };
  const setDeleteFileNameHandler = useContext(ModalContext).deleteFile.handler;
  return (
    <ConfirmModal
      isDanger
      heading="CONFIRM DELETION?"
      message=""
      onCancel={hideModal}
      onConfirm={onConfirmHandler}
      loading={loading}
    />
  );
};

export default ConfirmDeleteModal;
