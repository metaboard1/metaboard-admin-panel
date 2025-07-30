import * as yup from 'yup';
import  { articleValidations, loginValidations, publicationValidations, userValidations } from './Schema';


let validationSchema = (screen: string) => {
    let yupValidateObj = {}

    switch (screen) {
        case "login":
            yupValidateObj = loginValidations
            break;
        case "article":
            yupValidateObj = articleValidations 
            break;
        case "publication":
            yupValidateObj = publicationValidations 
            break;
        case "user":
            yupValidateObj = userValidations 
            break;
    }

    return yup.object(yupValidateObj)
}
export default validationSchema