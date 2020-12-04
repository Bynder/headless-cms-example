import Link from 'next/link';
import { getReducedFolderTree } from '../lib/folders';

const QuickNavigation = ({ folders, currentFolder }) => (
  <div className="bg-neutral-1 p-3 rounded-md sticky top-4 border border-gray-200">
    <h4 className="font-medium uppercase text-xs mb-3 text-base-1">
      Quick Navigation
    </h4>
    {currentFolder && (
      <Link href="/">
        <a className="mb-3 inline-block transition-colors hover:text-accent-1">
          ← Back to directory
        </a>
      </Link>
    )}
    <h3 className="text-xl font-medium mb-3">Departments</h3>
    {(currentFolder
      ? getReducedFolderTree(currentFolder, folders)
      : folders
    ).children.map((folder) => (
      <ul key={folder.uuid} className="mb-2">
        <p className="font-medium">
          <Link href={`/#${folder.uuid}`}>
            <a className="transition-colors hover:text-accent-1">
              {folder.name}
            </a>
          </Link>
        </p>
        {folder?.children?.map((child) => (
          <li key={child.uuid}>
            <Link href={`/#${child.uuid}`}>
              <a className="transition-colors hover:text-accent-1">
                <span className="text-base-1">↳</span> {child.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

export default QuickNavigation;
