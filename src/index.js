import React, {useState, useEffect} from "react"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";  
import { getAuth } from "firebase/auth";
import { app } from "../firebase.config";
// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// App Pages
import MainScreen from "./pages/Main";
import Details from "./pages/Details";
import Historial from "./pages/Historial";

const LoginStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const auth = getAuth(app);

function Main(){
  const [session, setSession] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((session) => {
      setSession(session);
    });

    return unsubscribe;
  }, []);

  const MyTheme = {
  ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#1E1D2E'
    },
  };

  return (
    <NavigationContainer
      theme={MyTheme}
    >
      {
        !session &&
          <LoginStack.Navigator screenOptions={{headerShown: false}}>
            <LoginStack.Screen name="Login" component={Login}/>
            <LoginStack.Screen name="Register" component={Register}/>
          </LoginStack.Navigator>
      }
      {
        session &&
          <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="Main" component={MainScreen}/>
            <AppStack.Screen name="Details" component={Details}/>
            <AppStack.Screen name="Historial" component={Historial}/>
          </AppStack.Navigator>
      }
    </NavigationContainer>
  );
}

export default Main;
