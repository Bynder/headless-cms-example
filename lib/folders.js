function folderWithChildren(folder, folders) {
  const children = folders
    .filter(({ parent_uuid }) => parent_uuid === folder.uuid)
    .map((childFolder) => folderWithChildren(childFolder, folders));
  return { ...folder, children };
}

export function getStructuredFolders(folders) {
  const rootFolder = folders.find((folder) => folder.type === 'project-root');

  return folderWithChildren(rootFolder, folders);
}

export function getReducedFolderTree(folderId, folder) {
  return {
    ...folder,
    children: folder.children.filter(
      (child) =>
        child.uuid === folderId ||
        getReducedFolderTree(folderId, child).children.length
    ),
  };
}
