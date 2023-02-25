import React, { useState } from "react";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import DriveExplorer from "./DriveExplorer";
import DriveContext from "../../contexts/driveContext";
import {
  getAppStateData,
  getFolderStack,
  addDriveItem,
  deleteDriveItem,
  updateDriveItem,
  pasteDriveItem,
  checkForDuplicateDriveItem,
  filterDriveItems,
} from "../../utils/drive";
import { isEmpty } from "../../utils/generic";
import { publish } from "../../utils/pubsub";
import { PUBSUB_EVENTS } from "../../constants";

const Drive = () => {
  const [driveExplorerData, setDriveExplorerData] = useState(getAppStateData());
  const [folderStack, setFolderStack] = useState([{ id: null, label: "root" }]);
  const [searchValue, setSearchValue] = useState("");
  const [itemToPaste, setItemToPaste] = useState(null);

  const currentFolder = folderStack[folderStack.length - 1];
  const CURRENT_ROOT_FILES_AND_FOLDERS = !isEmpty(searchValue)
    ? filterDriveItems(driveExplorerData, searchValue)
    : driveExplorerData[currentFolder.id];

  const handleDriveItemDoubleClick = (driveItem) => {
    if (driveItem.type === "folder") {
      setSearchValue("");
      publish(PUBSUB_EVENTS.CLEAR_SEARCH_TERM);
      setFolderStack(getFolderStack(folderStack, driveItem));
    }
  };

  const handleDriveItemAdd = (payload = {}) => {
    const duplicateDriveItem = checkForDuplicateDriveItem(
      payload,
      driveExplorerData,
      currentFolder.id
    );

    if (duplicateDriveItem) {
      return publish(PUBSUB_EVENTS.SHOW_TOAST, {
        msg: `Duplicate ${payload.type} exists`,
        type: "warning",
      });
    }

    setDriveExplorerData(
      addDriveItem(
        { ...payload, id: Date.now(), parentFolderId: currentFolder.id },
        driveExplorerData
      )
    );
  };

  const handleDriveItemDelete = (driveItem = {}) => {
    setDriveExplorerData(deleteDriveItem(driveItem, driveExplorerData));
  };

  const handleDriveItemUpdate = (driveItem = {}) => {
    setDriveExplorerData(updateDriveItem(driveItem, driveExplorerData));
  };

  const handleDriveItemCopy = (driveItem = {}) => {
    setItemToPaste(driveItem);
  };

  const onItemPaste = () => {
    setDriveExplorerData(
      pasteDriveItem(itemToPaste, driveExplorerData, currentFolder.id)
    );
    setItemToPaste(null);
  };

  const onBreadCrumbClick = (breadCrumb) => {
    if (folderStack.length > 1) {
      setFolderStack(getFolderStack(folderStack, breadCrumb));
    }
  };

  const onBackButtonClick = () => {
    if (folderStack.length > 1) {
      const clonedFolderStack = [...folderStack];
      clonedFolderStack.pop();
      setFolderStack(clonedFolderStack);
    }
  };

  const onSearchTermUpdate = (value) => {
    setSearchValue(value);
    setItemToPaste(null);
  };

  const DRIVE_CONTEXT_VALUES = {
    handleDriveItemDoubleClick,
    handleDriveItemAdd,
    handleDriveItemDelete,
    handleDriveItemUpdate,
    handleDriveItemCopy,
  };

  return (
    <>
      <Navbar
        breadCrumbs={folderStack}
        searchValue={searchValue}
        itemToPaste={itemToPaste}
        onBackButtonClick={onBackButtonClick}
        onBreadCrumbClick={onBreadCrumbClick}
        onSearchTermUpdate={onSearchTermUpdate}
        onItemPaste={onItemPaste}
        title={
          !isEmpty(searchValue)
            ? `Found results: ${CURRENT_ROOT_FILES_AND_FOLDERS?.length} items`
            : null
        }
      />
      <DriveContext.Provider value={DRIVE_CONTEXT_VALUES}>
        <Container maxWidth="xl">
          <DriveExplorer
            filesAndFolders={CURRENT_ROOT_FILES_AND_FOLDERS}
            handleDriveItemAdd={handleDriveItemAdd}
            handleDriveItemDelete={handleDriveItemDelete}
            handleDriveItemUpdate={handleDriveItemUpdate}
            handleDriveItemCopy={handleDriveItemCopy}
          />
        </Container>
      </DriveContext.Provider>
    </>
  );
};

export default Drive;
