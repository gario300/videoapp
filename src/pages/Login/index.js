import React, {useState} from "react"
import { View, Text } from "react-native";
import { TextInput, Button } from "../../components";
import styles from "./styles";
import AuthClass from "../../classes/authClass";
import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import { changeAlertStatus } from "../../app/features/alert/alertChange";

function Login({navigation}){
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = async () => {
    try {
      await AuthClass.login({email: email, password: password});
    } catch (e) {
      dispatch(changeAlertStatus(e))
    }
  }

  return(
    <View
      style={styles.container}
    >
      <View
        style={styles.logoContainer}
      >
        <Text
          style={styles.logoText}
        >
          SODA
        </Text>
      </View>
      <TextInput
        label={"Correo Electrónico"}
        onChange={(v) => setEmail(v)}
        value={email}
      />
      <TextInput
        label={"Contraseña"}
        onChange={(v) => setPassword(v)}
        value={password}
        secureTextEntry={true}
      />
      <Button
        onPress={auth}
        title="Acceder" 
      />
      <Button
        title="Crear una cuenta"
        mode="text"
        onPress={() => navigation.navigate("Register")}
      />     
    </View>
  )
}

Login.propTypes = {
  navigation: PropTypes.object
}
export default Login;
