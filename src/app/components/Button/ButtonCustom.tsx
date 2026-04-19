import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const icons: any = {
  facebook: 'fab fa-facebook',
  google: 'fab fa-google',
  googlePlus: 'fab fa-google-plus',
  print: 'fa fa-print',
  show: 'fas fa-file-powerpoint',
  search: 'fas fa-search',
  update: 'fas fa-paper-plane',
  reload: 'fas fa-sync-alt',
  delete: 'fas fa-trash',
  edit: 'fas fa-edit',
  check: 'fas fa-check',
  lock: 'fas fa-lock',
  add: 'fas fa-plus',
  report: 'fas fa-file',
};

interface IAppButton {
  children?:any;
  isLoading?:boolean;
  icon?:any;
  variant?:any;
  disabled?:any;
  iconOnly?:any;
  type?:any;
  onClick?: any;
  className?: any;
}
const ButtonCustom = ({
  children,
  isLoading,
  icon,
  variant = 'primary',
  disabled,
  iconOnly,
  type='button',
  ...otherProps
}: IAppButton) => {
  let spinnerTemplate;
  let iconTemplate;

  if (isLoading) {
    spinnerTemplate = (
      <Spinner
        className='ms-1'
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
      />
    );
  }

  if (icon) {
    const iconClass = icons[icon] ? icons[icon] : icon;
    iconTemplate = <i className={`${iconClass} ${iconOnly ? '' : 'mr-2'}`} />;
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <Button type={type} {...otherProps} variant={variant} disabled={isLoading || disabled}>
      {iconTemplate}
      {children}
      {spinnerTemplate}
    </Button>
  );
};

export default ButtonCustom;
