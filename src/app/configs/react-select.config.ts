export const ReactSelectStyle = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'var(--black-50)',
    borderColor: 'var(--black-50, #ccc)',
    color: '$input-color',
    '&:focus': {
      ...styles[':focus'],
      backgroundColor: 'var(--black-50)',
      borderColor: 'var(--primary-400)',
      boxShadow: '0 0 0 0.25rem rgba(var(--primary-rgb, #5E5CE6), 0.25)',
    },
    ':hover': {
      ...styles[':hover'],
      borderColor: 'var(--primary-400)',
    },
    ':active': {
      ...styles[':active'],
      borderColor: 'var(--primary-400)',
    },
    minHeight: '25px',
  }),
  input: (styles: any) => ({
    ...styles,
    color: 'var(--black-800)',
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    backgroundColor: 'var(--black-50)',
    marginTop: '6px',
    marginBottom: '6px',
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    color: 'var(--black)',
    padding: '0 4px',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    padding: '5px',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: 'var(--black)',
  }),
  multiValue: (styles: any) => ({
    ...styles,
    color: 'var(--black-500)',
    backgroundColor: 'var(--black-50)',
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: 'var(--black-500)',
    backgroundColor: 'var(--black-50)',
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: 'var(--black-500)',
    backgroundColor: 'var(--black-50)',
    ':hover': {
      color: 'var(--black)',
      backgroundColor: 'var(--primary-300)',
    },
  }),
  menu: (styles: any) => ({
    ...styles,
    zIndex: 9999,
    backgroundColor: 'var(--black-25)',
  }),
  option: (styles: any) => ({
    ...styles,
    // backgroundColor: 'var(--black-25)',
    // color: 'var(--black)',
    ':hover': {
      ...styles[':hover'],
      backgroundColor: 'var(--primary-50)',
    },
    ':focus': {
      ...styles[':focus'],
      backgroundColor: 'var(--primary-50)',
    },
  }),
};

export const ReactSelectStyleCustom = ()=>{
  // const styles = ReactSelectStyle
}