import React from "react"
import { View } from "react-native"
import { Text, Icon } from "react-native-paper"

import styles from "./styles"

function EmptyList(){
  return(
    <View
      style={styles.container}
    >
      <Icon
        source={"cloud"}
        size={50}
      />
      <Text>
        No hay nuevos elementos para mostrar.
      </Text>
    </View>
  )
}

export default EmptyList
