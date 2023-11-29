import React from 'react';
import {
	TextField
} from '@mui/material';
import { NumericFormat } from 'react-number-format';

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        allowNegative={false}
        prefix="$"
      />
    );
  },
);

export default function TextFieldCurrency({
	value,
	variant,
	label,
	handleChange,
	...props
}) {
	return (
		<TextField
      label={label}
      value={value}
      onChange={handleChange}
      name="numberformat"
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      variant={variant}/>
	)
}