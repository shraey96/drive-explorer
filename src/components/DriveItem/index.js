import React, { useState } from "react";
import { arrayOf, object, bool } from "prop-types";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import RenameDriveItemModal from "./RenameDriveItemModal";
import { isEmpty } from "../../utils/generic";
import fileIcon from "../../assets/icons/file.png";
import folderIcon from "../../assets/icons/folder.png";
import { DRIVE_ITEM_CONTAINER_STYLE } from "./styles";
import useDriveContext from "../../hooks/useDriveContext";

const MENU_ITEM_ANCHOR_ORIGIN = { vertical: 80, horizontal: "center" };

const DriveItem = ({ driveItem, actions, withRenameMode }) => {
  const [isRenameModalOpen, toggleIsRenameModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [isItemFocus, toggleIsItemFocused] = useState(false);
  const { handleDriveItemDoubleClick, handleDriveItemUpdate } =
    useDriveContext();

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    toggleIsItemFocused(false);
  };

  const handleItemRename = () => {
    handleMenuClose();
    toggleIsRenameModalOpen(true);
  };

  const handleIconRightClick = (event) => {
    event.stopPropagation();
    if (isMenuOpen) {
      handleMenuClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleRenameModalClose = () => toggleIsRenameModalOpen(false);

  const handleItemFocus = () => {
    toggleIsItemFocused(true);
  };

  const updateDriveItemName = (newDriveItemName) => {
    handleDriveItemUpdate({ ...driveItem, name: newDriveItemName });
  };

  const DefaultActions = [
    withRenameMode ? { label: "Rename", onClick: handleItemRename } : [],
    ...actions,
  ];

  return (
    <>
      {isRenameModalOpen ? (
        <RenameDriveItemModal
          driveItem={driveItem}
          isOpen={isRenameModalOpen}
          handleClose={handleRenameModalClose}
          updateDriveItemName={updateDriveItemName}
        />
      ) : null}
      <ClickAwayListener onClickAway={handleMenuClose}>
        <div>
          <Box
            sx={{
              ...DRIVE_ITEM_CONTAINER_STYLE,
              background: isItemFocus
                ? (theme) => alpha(theme.palette.primary.main, 0.4)
                : "transparent",
            }}
            onClick={handleItemFocus}
            onContextMenu={(event) => {
              event.preventDefault();
              toggleIsItemFocused(true);
              handleIconRightClick(event);
            }}
            onDoubleClick={(event) => {
              event.stopPropagation();
              handleDriveItemDoubleClick(driveItem);
            }}
          >
            <Box>
              <img
                src={driveItem.type === "file" ? fileIcon : folderIcon}
                alt={`icon_${driveItem.type}`}
                className={`drive_item_icon drive_item_icon--${driveItem.type}`}
              />
            </Box>
            <Tooltip title={driveItem.name} placement="bottom">
              <Typography
                sx={{ maxWidth: "100px" }}
                variant="p"
                color="inherit"
                align="center"
                noWrap
              >
                {driveItem.name}
              </Typography>
            </Tooltip>
          </Box>

          {isMenuOpen && !isEmpty(DefaultActions) ? (
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={MENU_ITEM_ANCHOR_ORIGIN}
            >
              {DefaultActions.map((action, index) => {
                return (
                  <MenuItem
                    key={`${action.label}_${index}`}
                    sx={action.sx || {}}
                    onClick={(...args) => {
                      handleMenuClose();
                      action.onClick?.(driveItem, ...args);
                    }}
                  >
                    {action.label}
                  </MenuItem>
                );
              })}
            </Menu>
          ) : null}
        </div>
      </ClickAwayListener>
    </>
  );
};

DriveItem.propTypes = {
  driveItem: object,
  actions: arrayOf(object),
  withRenameMode: bool,
};

DriveItem.defaultProps = {
  actions: [],
  withRenameMode: false,
};

export default DriveItem;
