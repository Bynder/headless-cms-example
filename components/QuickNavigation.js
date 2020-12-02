import Link from "next/link";

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
    {folders.children
      .filter((folder) =>
        currentFolder ? folder.uuid === currentFolder : true
      )
      .map((item) => (
        <ul key={item.uuid} className="mb-2">
          <p className="font-medium">
            <Link href={`/#${item.uuid}`}>
              <a className="transition-colors hover:text-accent-1">
                {item.name}
              </a>
            </Link>
          </p>
          {item?.children?.map((child) => (
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
