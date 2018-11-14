export const required = value => value ? undefined : 'Required';
export const notEmpty = value => value.trim() !== '' ? undefined : 'Field cannot be empty';
export const exactLength = value => value.length===5 ? undefined : 'Value must be exactly 5 characters';
export const onlyNumbers = value => !isNaN(value) ? undefined : 'Value is not a number!'