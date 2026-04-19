import React, { useState, useRef, useEffect } from 'react'

const LazyImage = ({defaultImage='/static/avatar.png', ...imageProps}:any) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (!shouldLoad && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setShouldLoad(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [shouldLoad, placeholderRef]);

  if(imageProps.src=="/cdnnull"){
    return <img src={defaultImage} className={imageProps?.className}/> 
  }

  return (shouldLoad
    ? <img {...imageProps} onError={(e:any)=>{e.target.onerror = null; e.target.src=defaultImage}}/> 
    : 
    <>
      <div className="img-placeholder" ref={placeholderRef}>No Image</div>
    </>
  );
};

export default LazyImage