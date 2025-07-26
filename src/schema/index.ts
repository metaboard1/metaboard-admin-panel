import * as yup from 'yup';
import  { articleValidations, loginValidations, userValidations } from './Schema';


let validationSchema = (screen: string) => {
    let yupValidateObj = {}

    switch (screen) {
        case "login":
            yupValidateObj = loginValidations
            break;
        case "article":
            yupValidateObj = articleValidations 
            break;
        case "user":
            yupValidateObj = userValidations 
            break;
    }

    return yup.object(yupValidateObj)
}
export default validationSchema