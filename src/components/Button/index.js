import React from "react"
import { Button } from "react-native-paper";
import PropTypes from "prop-types";

function InputButton({
  icon = "",
  mode = "contained",
  onPress,
  disabled = false,
  title=""
}){
  return(
    <Button      
      icon={icon}
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      style={{marginVertical: 8}}
    >
      {title}
    </Button>
  )
}

InputButton.propTypes = {
  icon : PropTypes.string,
  mode : PropTypes.string,
  onPress : PropTypes.func,
  disabled : PropTypes.bool,
  title: PropTypes.string
}

export default InputButton;
