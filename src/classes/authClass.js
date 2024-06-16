import { app } from "../../firebase.config";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import QueryingClass from "./queryingclass";
import { vNotVoid, vEmail } from "../utils/validator";
const auth = getAuth(app);

class Auth {
  register(form){
    return new Promise(async(resolve, reject) => {
      try {
        if (form.password !== form.confirmPassword) { 
          reject('Las contraseñas no coinciden')
          return
        }
        for (const key in form) {
          let validate
          validate = vNotVoid(key, form[key])
          if(vNotVoid.status == false){
              reject('Todos los campos son obligatorios')
              return
          }
          if (key == 'email') {
            validate = vEmail(form[key]) 
            if (!validate.status) {
              reject('Porfavor introduzca una dirección de email válida')
              return
            }   
          }
        }
        
        const user = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        )
        
        await QueryingClass.addData("usersCollection", {
          id:user.user.uid,
          email: form.email,
        })

        await this.login({email: form.email, password: form.password});
        resolve();
      } catch (e) {
        console.log(e)
        reject("Su solicitud no puede ser realizada en este momento, intentelo mas tarde")
      }
    });
  }

  login(credentials){
    return new Promise(async (resolve, reject) => {
      try {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        resolve();
      } catch (e) {
        reject(e.code)
      }
    })
  }

  getCurrentUser(){
    return auth.currentUser;
  }
}

const AuthClass = new Auth()

export default AuthClass;
