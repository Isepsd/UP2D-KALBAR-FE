import React from 'react';

export default function TopBarLoader({
  isLoading = false,
  version = 'v2',
  className,
  position = 'top', // default tetap top
}: ITopLoader) {
  if (!isLoading) return null;

  // Inline loader (nempel di atas section/table)
if (position === "inline") {
  return (
    <div className={`w-full ${className || ""}`}>
      {version === "v2" && (
        <div className="table-loader-bar">
          <div className="table-loader-bar-content"></div>
        </div>
      )}
    </div>
  );
}

  // Default loader (global di paling atas layar)
  return (
    <>
      {version === 'v1' && (
        <div className={`top-bar-loader${className ? ' ' + className : ''}`}></div>
      )}
      {version === 'v2' && (
        <div className="loader-bar">
          <div className="loader-bar-content"></div>
        </div>
      )}
    </>
  );
}

interface ITopLoader {
  isLoading?: boolean;
  version?: 'v1' | 'v2';
  className?: string;
  position?: 'top' | 'inline';
}
