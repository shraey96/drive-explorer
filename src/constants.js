export const MOCK_DATA_PAYLOAD = [
  {
    type: "file",
    name: "home.png",
    parentFolderId: null,
    id: 1,
    created: 1677343602410,
  },
  {
    type: "file",
    name: "dog.png",
    parentFolderId: null,
    id: 2,
    created: 1677347202410,
  },
  {
    type: "file",
    name: "resume.docx",
    parentFolderId: 4,
    id: 3,
    created: 1677350802410,
  },
  {
    type: "folder",
    name: "New Folder 1",
    parentFolderId: null,
    id: 4,
    created: 1677354402410,
  },
  {
    type: "folder",
    name: "New Folder 2",
    parentFolderId: null,
    id: 5,
    created: 1677358002410,
  },
  {
    type: "folder",
    name: "Important Docs",
    parentFolderId: 5,
    id: 6,
    created: 1677361602410,
  },
  {
    type: "folder",
    name: "New Folder 4",
    parentFolderId: 5,
    id: 7,
    created: 1677365202410,
  },
  {
    type: "folder",
    name: "HDD Backup",
    parentFolderId: 7,
    id: 8,
    created: 1677368802410,
  },
  {
    type: "file",
    name: "expenses.xlsx",
    parentFolderId: 8,
    id: 9,
    created: 1677372402410,
  },
];

export const DRIVE_ITEM_TYPES = {
  FILE: "file",
  FOLDER: "folder",
};

export const PUBSUB_EVENTS = {
  CLEAR_SEARCH_TERM: "CLEAR_SEARCH_TERM",
  SHOW_TOAST: "SHOW_TOAAST",
};
