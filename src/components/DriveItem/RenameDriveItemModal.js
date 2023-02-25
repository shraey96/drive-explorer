import React, { useState } from "react";
import { bool, func, object } from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isEmpty, isValidFileName } from "../../utils/generic";
import { DRIVE_ITEM_TYPES } from "../../constants";
import { DRIVE_ITEM_MODAL_STYLE } from "./styles";

const RenameDriveItemModal = ({
  driveItem,
  isOpen,
  handleClose,
  updateDriveItemName,
}) => {
  const [updatedName, setUpdatedName] = useState(driveItem.name);

  const saveUpdatedName = () => {
    updateDriveItemName(updatedName);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={DRIVE_ITEM_MODAL_STYLE}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Rename
        </Typography>
        <Box>
          <TextField
            autoFocus
            fullWidth
            value={updatedName}
            sx={{ mt: 2, mb: 2 }}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            color="info"
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            disabled={
              updatedName === driveItem.name ||
              isEmpty(updatedName) ||
              (driveItem.type === DRIVE_ITEM_TYPES.FILE
                ? !isValidFileName(updatedName)
                : null)
            }
            onClick={saveUpdatedName}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

RenameDriveItemModal.propTypes = {
  driveItem: object,
  isOpen: bool,
  handleClose: func,
  updateDriveItemName: func,
};

RenameDriveItemModal.defaultProps = {
  isOpen: false,
  handleClose: () => null,
  updateDriveItemName: () => null,
};

export default RenameDriveItemModal;
