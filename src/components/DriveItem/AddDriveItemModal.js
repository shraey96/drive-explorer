import React, { useState } from "react";
import { bool, func } from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { isEmpty, isValidFileName } from "../../utils/generic";
import { DRIVE_ITEM_TYPES } from "../../constants";
import { DRIVE_ITEM_MODAL_STYLE } from "./styles";

const AddDriveItemModal = ({ isOpen, handleClose, onAdd }) => {
  const [newDriveItemPayload, setNewDriveItemPayload] = useState({
    type: DRIVE_ITEM_TYPES.FILE,
    name: "",
  });

  const isNewItemFile = newDriveItemPayload.type === DRIVE_ITEM_TYPES.FILE;

  const addDriveItem = () => {
    onAdd({ ...newDriveItemPayload, created: Date.now() });
    handleClose();
  };

  const checkIfBtnIsDisabled = () => {
    const isNameEmpty = isEmpty(newDriveItemPayload.name);
    if (isNewItemFile) {
      return !isValidFileName(newDriveItemPayload.name);
    }
    return isNameEmpty;
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
          Create New
        </Typography>
        <Box>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={newDriveItemPayload.type}
            onChange={(e) =>
              setNewDriveItemPayload((prevPayload) => ({
                ...prevPayload,
                type: e.target.value,
              }))
            }
          >
            <FormControlLabel
              value={DRIVE_ITEM_TYPES.FILE}
              control={<Radio />}
              label="File"
            />
            <FormControlLabel
              value={DRIVE_ITEM_TYPES.FOLDER}
              control={<Radio />}
              label="Folder"
            />
          </RadioGroup>
          <TextField
            autoFocus
            fullWidth
            label={`New ${newDriveItemPayload.type}`}
            value={newDriveItemPayload.name}
            sx={{ mt: 2, mb: 2 }}
            helperText={isNewItemFile ? "File requires a file extension" : null}
            onChange={(e) =>
              setNewDriveItemPayload((prevPayload) => ({
                ...prevPayload,
                name: e.target.value,
              }))
            }
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
            disabled={checkIfBtnIsDisabled()}
            onClick={addDriveItem}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddDriveItemModal.propTypes = {
  isOpen: bool,
  handleClose: func,
  onAdd: func,
};

AddDriveItemModal.defaultProps = {
  isOpen: false,
  handleClose: () => null,
  onAdd: () => null,
};

export default AddDriveItemModal;
