export function foldersChildren({ folder, folders }) {
  let children = [];

  for (let item of folders) {
    if (item.parent_uuid === folder.uuid) {
      children = [
        ...children,
        {
          ...item,
          children: foldersChildren({ folder: item, folders }),
        },
      ];
    }
  }

  return children;
}

export function getStructuredFolders({ folders }) {
  let structuredFolders = {};

  for (let folder of folders) {
    if (folder.type === "project-root") {
      structuredFolders = {
        ...folder,
        children: foldersChildren({ folder, folders }),
      };
    }
  }

  return structuredFolders;
}

export function getParentFolderId({ folders, folderId }) {
  return (
    folders.find((folder) => folder.uuid === folderId)?.parent_uuid || null
  );
}
