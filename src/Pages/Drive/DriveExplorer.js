import React, { useMemo } from "react";
import { arrayOf, object } from "prop-types";
import Box from "@mui/material/Box";
import AddDriveItem from "../../components/DriveItem/AddDriveItem";
import DriveItem from "../../components/DriveItem";
import { DRIVE_ITEMS_EXPLORER_STYLE } from "./styles";
import useDriveContext from "../../hooks/useDriveContext";
import { DRIVE_ITEM_TYPES } from "../../constants";

const DriveExplorer = ({ filesAndFolders }) => {
  const { handleDriveItemDelete, handleDriveItemCopy } = useDriveContext();

  const DRIVE_ITEM_ACTIONS_FILE = useMemo(() => {
    return [
      {
        label: "Copy",
        onClick: handleDriveItemCopy,
      },
      {
        label: "Delete",
        onClick: handleDriveItemDelete,
        sx: {
          color: (theme) => theme.palette.error.main,
        },
      },
    ];
  }, []);

  const DRIVE_ITEM_ACTIONS_FOLDER = useMemo(() => {
    return [
      {
        label: "Delete",
        onClick: handleDriveItemDelete,
        sx: {
          color: (theme) => theme.palette.error.main,
        },
      },
    ];
  }, []);

  return (
    <Box sx={DRIVE_ITEMS_EXPLORER_STYLE}>
      {filesAndFolders?.map((driveItem) => {
        return (
          <DriveItem
            key={driveItem.id}
            driveItem={driveItem}
            withRenameMode
            actions={
              driveItem.type === DRIVE_ITEM_TYPES.FILE
                ? DRIVE_ITEM_ACTIONS_FILE
                : DRIVE_ITEM_ACTIONS_FOLDER
            }
          />
        );
      })}
      <AddDriveItem />
    </Box>
  );
};

DriveExplorer.propTypes = {
  filesAndFolders: arrayOf(object).isRequired,
};

DriveExplorer.defaultProps = {
  filesAndFolders: [],
};

export default DriveExplorer;
