import { MOCK_DATA_PAYLOAD, DRIVE_ITEM_TYPES } from "../constants";

/**
 * @function getAppStateData
 *
 * @description Returns formatted payload (files + payload) from base constant file
 * @returns {object}
 */
export const getAppStateData = () => {
  return groupByParentFolderId(MOCK_DATA_PAYLOAD);
};

/**
 * @function groupByParentFolderId
 * @param {array} driveData
 *
 * @description Groups folders and files by parentFolderId
 * @returns {object}
 */

export const groupByParentFolderId = (driveData = []) => {
  return driveData.reduce((acc, curr) => {
    if (!acc[curr.parentFolderId]) {
      acc[curr.parentFolderId] = [];
    }
    acc[curr.parentFolderId].push(curr);
    return acc;
  }, {});
};

/**
 * @function getFolderStack
 * @param {array} currentFolderStack
 * @param {object} folder
 *
 * @description Returns updated folder stack with new item folder pushed to it, or all folders prior to it
 * @returns {array}
 */
export const getFolderStack = (currentFolderStack = [], folder = {}) => {
  let clonedFolderStack = [...currentFolderStack];
  const folderIdIndex = clonedFolderStack.findIndex(
    (folderStack) => folderStack.id === folder.id
  );
  if (folderIdIndex > -1) {
    clonedFolderStack = clonedFolderStack.slice(0, folderIdIndex + 1);
  } else {
    clonedFolderStack.push({ id: folder.id, label: folder.name });
  }
  return clonedFolderStack;
};

/**
 * @function getBreadCrumbsFromFolderStack
 * @param {array} breadCrumbs
 * @param {function} onClickFn
 *
 * @description Returns formatted breadcrumbs list for navbar UI
 * @returns {array}
 */
export const getBreadCrumbsFromFolderStack = (
  breadCrumbs = [],
  onClickFn = () => {}
) => {
  return breadCrumbs.map((item, index) => {
    const isLastItem = index === breadCrumbs.length - 1;
    return {
      ...item,
      onClick: onClickFn,
      isLastItem,
      color: isLastItem ? "text.primary" : "text.secondary",
      type: isLastItem ? "text" : "link",
      disabled: isLastItem,
      sx: isLastItem ? {} : { cursor: "pointer" },
    };
  });
};

/**
 * @function addDriveItem
 * @param {object} driveItem
 * @param {object} groupedFolderMap
 *
 * @description Performs add operation based on parentFolderId on groupedFolderMap object (cloned) and returns it
 * @returns {object}
 */
export const addDriveItem = (driveItem = {}, groupedFolderMap) => {
  const groupedFolderMapClone = { ...groupedFolderMap };
  if (!groupedFolderMapClone[driveItem.parentFolderId]) {
    groupedFolderMapClone[driveItem.parentFolderId] = [driveItem];
  } else {
    groupedFolderMapClone[driveItem.parentFolderId] = [
      ...groupedFolderMapClone[driveItem.parentFolderId],
      driveItem,
    ];
  }
  return groupedFolderMapClone;
};

/**
 * @function deleteComment
 * @param {object} driveItem
 * @param {object} groupedFolderMap
 *
 * @description Performs delete operation based on parentFolderId on groupedFolderMap object (cloned) and returns it
 * @returns {object}
 */
export const deleteDriveItem = (driveItem = {}, groupedFolderMap = {}) => {
  const groupedFolderMapClone = { ...groupedFolderMap };

  // remove that particular driveItem from the list
  groupedFolderMapClone[driveItem.parentFolderId] = groupedFolderMapClone[
    driveItem.parentFolderId
  ]?.filter((item) => item.id !== driveItem.id);

  let idsToDelete = [driveItem.id];

  // finds ids to delete n children of that comment, recursively
  function getIdsToDelete(driveItemsArr = []) {
    let nestedIdsToDelete = [];
    driveItemsArr.forEach((item) => {
      nestedIdsToDelete.push(item.id);
      if (groupedFolderMapClone[item.id]) {
        nestedIdsToDelete = [
          ...nestedIdsToDelete,
          ...getIdsToDelete(groupedFolderMapClone[item.id]),
        ];
      }
    });
    return nestedIdsToDelete;
  }

  idsToDelete = [
    ...idsToDelete,
    ...getIdsToDelete(groupedFolderMapClone[driveItem.id]),
  ];

  idsToDelete.forEach((id) => {
    delete groupedFolderMapClone[id];
  });

  return groupedFolderMapClone;
};

/**
 * @function updateDriveItem
 * @param {object} driveItem
 * @param {object} groupedFolderMap
 *
 * @description Performs update operation based on parentFolderId on groupedFolderMap object (cloned) and returns it
 * @returns {object}
 */
export const updateDriveItem = (driveItem = {}, groupedFolderMap = {}) => {
  const groupedFolderMapClone = { ...groupedFolderMap };
  const indexOfDriveItem = groupedFolderMapClone[
    driveItem.parentFolderId
  ].findIndex((item) => item.id === driveItem.id);
  if (indexOfDriveItem > -1) {
    groupedFolderMapClone[driveItem.parentFolderId][indexOfDriveItem] = {
      ...driveItem,
    };
  }
  return groupedFolderMapClone;
};

/**
 * @function pasteDriveItem
 * @param {object} driveItem
 * @param {object} groupedFolderMap
 * @param {any} currentFolderId
 *
 * @description Copies file into current folder and returns updated groupedFolderMap
 * @returns {object}
 */
export const pasteDriveItem = (
  driveItem = {},
  groupedFolderMap = {},
  currentFolderId
) => {
  const newFolderName = Object.values(
    groupedFolderMap[currentFolderId] || []
  ).filter((item) => item.name === driveItem.name);
  const updatedDriveItem = {
    ...driveItem,
    parentFolderId: currentFolderId,
    id: Date.now(),
    created: Date.now(),
    name: `${driveItem.name} (${newFolderName.length + 1})`,
  };
  const groupedFolderMapClone = { ...groupedFolderMap };
  if (!groupedFolderMapClone[currentFolderId]) {
    groupedFolderMapClone[currentFolderId] = [];
  }
  groupedFolderMapClone[currentFolderId].push(updatedDriveItem);
  return groupedFolderMapClone;
};

/**
 * @function checkForDuplicateDriveItem
 * @param {object} driveItem
 * @param {object} groupedFolderMap
 *
 * @description Checks if duplicate file/folder exists inside current folder
 * @returns {object}
 */
export const checkForDuplicateDriveItem = (
  driveItem = {},
  groupedFolderMap,
  currentFolderId
) => {
  const currentFolderToSearch = groupedFolderMap[currentFolderId];

  if (driveItem.type === DRIVE_ITEM_TYPES.FILE) {
    return currentFolderToSearch?.find(
      (item) =>
        item.type === DRIVE_ITEM_TYPES.FILE &&
        item.name?.toLowerCase() === driveItem.name?.toLowerCase()
    );
  }

  if (driveItem.type === DRIVE_ITEM_TYPES.FOLDER) {
    return currentFolderToSearch?.find(
      (item) =>
        item.type === DRIVE_ITEM_TYPES.FOLDER &&
        item.name?.toLowerCase() === driveItem.name?.toLowerCase()
    );
  }
};

/**
 * @function filterDriveItems
 * @param {object} groupedFolderMap
 * @param {string} searchText
 *
 * @description Performs search based on searchText on groupedFolderMap and returns matching result
 * @returns {array}
 */
export const filterDriveItems = (groupedFolderMap = {}, searchText = "") => {
  return Object.values(groupedFolderMap)
    .flat()
    .filter((driveItem) =>
      driveItem.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );
};
