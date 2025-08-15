import * as yup from 'yup';
import  { articleValidations, documentValidations, loginValidations, publicationValidations, userValidations } from './Schema';


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
        case "document":
            yupValidateObj = documentValidations 
            break;
        case "user":
            yupValidateObj = userValidations 
            break;
    }

    return yup.object(yupValidateObj)
}
export default validationSchema