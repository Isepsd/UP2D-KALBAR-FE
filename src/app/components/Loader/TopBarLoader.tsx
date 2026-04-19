import React from 'react';

export default function TopBarLoader({
  isLoading = 0,
  version = 'v2',
  className,
}: ITopLoader) {
  return (
    <>
      {(isLoading>0 || isLoading==true) && (
        <>
          {version == 'v1' && (
            <div
              className={`top-bar-loader${className ? ' ' + className : ''}`}
            ></div>
          )}
          {version == 'v2' && (
            <div className='loader-bar'>
              <div className='loader-bar-content'></div>
            </div>
          )}
        </>
      )}
    </>
  );
}

interface ITopLoader {
  isLoading?: any;
  version?: 'v1' | 'v2';
  className?: string;
}
