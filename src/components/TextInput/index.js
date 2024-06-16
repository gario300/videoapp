import React from "react"
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";

function InputText({label, value, onChange, disabled, secureTextEntry = false}){
  return(
    <TextInput
      secureTextEntry={secureTextEntry}
      label={label}
      value={value}
      onChangeText={(v) => onChange(v)}
      disabled={disabled}
      style={{marginVertical: 8}}
    />
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  secureTextEntry: PropTypes.bool
}

export default InputText;
