import React from "react"
import { View } from "react-native";
import { Text, Switch } from "react-native-paper";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

function SwitchInput({label = "", value, onChange, disabled = false}){
  return(
    <View
      style={styles.container}
    >
      <View
        style={styles.rigth}
      >
        <Text>
          {label}
        </Text>
      </View>
      <View
        style={styles.left}
      >
        <Switch
          value={value}
          onValueChange={onChange}
          disabled={disabled}
        />
      </View>
    </View>
  )
}

SwitchInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  rigth: {
    flex: 1,
  },
  left: {
    flex: 1,
    alignItems: "flex-end"
  }
})
export default SwitchInput;
