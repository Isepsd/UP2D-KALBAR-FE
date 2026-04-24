import React, { useEffect, forwardRef, useRef } from 'react';

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = forwardRef(({indeterminate, type="checkbox", disabled=false,  ...rest}: any, ref: any) => {
	const defaultRef = useRef<any>()
	const resolvedRef = ref || defaultRef

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate
	}, [resolvedRef, indeterminate])

	// console.log("IndeterminateCheckbox");
	

	return (<input type={type} disabled={disabled} ref={resolvedRef} {...rest} className='ms-0 position-relative form-check-input' />)
})

export default IndeterminateCheckbox