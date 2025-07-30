import * as yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// let SCHEMA = {
//     mobile: { mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid') },
//     password: { password: yup?.string().required("Enter valid password") },
//     name: { name: yup?.string().required("Name is required") },
//     email: { email: yup.string().matches(emailRegExp, 'Invalid email').required('Required') },
// }
const SCHEMA = {
    mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    password: yup?.string().required("Enter valid password"),
    name: yup?.string().required("Name is required"),
    email: yup.string().matches(emailRegExp, 'Invalid email').required('Required'),
}

const loginValidations = {
    email: SCHEMA.email,
    password: SCHEMA.password
}
const articleValidations = {
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
    author: yup.string().required("Author is required"),
    estimateReadTime: yup.string().required("Estimate read time is required"),
    authorSocials: yup.object({
        linkedin: yup.string().url('Must be a valid URL').nullable(),
        facebook: yup.string().url('Must be a valid URL').nullable(),
        twitter: yup.string().url('Must be a valid URL').nullable(),
    }).nullable(),
}
const publicationValidations = {
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
    pages: yup.number().required("Pages is required").min(1, "Pages must be at least 1"),
    isbn: yup.string().required("ISBN number is required").matches(
        /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/,
        "Please enter a valid ISBN"
    ),
    publisher: yup.string().required("publisher name is required").min(2, "Publisher name must be at least 3 characters"),
    publicationDate: yup.date().required("Publication date is required").max(new Date(), "Publication date cannot be in the future"),
    storeLinks: yup.object({
        amazon: yup.string().url('Must be a valid URL').nullable(),
        flipkart: yup.string().url('Must be a valid URL').nullable(),
    }).nullable(),
}
const userValidations = {
    name: SCHEMA.name,
    email: SCHEMA.email,
    password: SCHEMA.password
}

export {
    articleValidations,
    userValidations,
    loginValidations,
    publicationValidations,
    SCHEMA
}