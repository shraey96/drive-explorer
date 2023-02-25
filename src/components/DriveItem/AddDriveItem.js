import React, { useState } from "react";
import AddDriveItemModal from "./AddDriveItemModal";
import useDriveContext from "../../hooks/useDriveContext";
import AddNewIcon from "../../assets/icons/add_new_button.png";

const AddDriveItem = ({ onAdd }) => {
  const [isAddModalOpen, toggleIsAddModalOpen] = useState(false);
  const { handleDriveItemAdd } = useDriveContext();

  return (
    <>
      {isAddModalOpen ? (
        <AddDriveItemModal
          isOpen={isAddModalOpen}
          onAdd={handleDriveItemAdd}
          handleClose={() => toggleIsAddModalOpen(false)}
        />
      ) : null}
      <img
        src={AddNewIcon}
        alt="add-new-icon"
        className="add_new_icon"
        onClick={() => toggleIsAddModalOpen(true)}
      />
    </>
  );
};

export default AddDriveItem;
