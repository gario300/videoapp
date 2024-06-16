import React, {useState} from "react"
import { TextInput, Button } from "../../components";
import AuthClass from "../../classes/authClass";
import { View, Text } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

// Redux
import { useDispatch } from "react-redux";
import { changeAlertStatus } from "../../app/features/alert/alertChange";

function Register({navigation}){
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key] : value,
    });
  }

  const onRegister = async() => {
    try {
      await AuthClass.register(form);
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
        onChange={(v) => onChangeForm("email", v)}
        value={form.email}
      />
      <TextInput
        label={"Contraseña"}
        onChange={(v) => onChangeForm("password", v)}
        value={form.password}
        secureTextEntry={true}
      />
      <TextInput
        label={"Confirmar Contraseña"}
        onChange={(v) => onChangeForm("confirmPassword", v)}
        value={form.confirmPassword}
        secureTextEntry={true}
      />
      <Button
       title="Registrarse"
       onPress={onRegister}
      />
      <Button
        title="Regresar"
        mode="text"
        onPress={() => navigation.navigate("Login")}
      />     
    </View> 
  )
}

Register.propTypes = {
  navigation: PropTypes.object
}
export default Register;
