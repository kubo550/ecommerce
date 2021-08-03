import * as yup from "yup";

const phoneNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const schema = yup.object().shape({
    firstname: yup.string().required("First Name is required."),
    lastname: yup.string().required("Last Name is required."),
    phone: yup.string().matches(phoneNumberRegex, 'Phone number is not valid').required('Phone number is required'),
    email: yup.string().email("Enter valid adress email.").required("E-mail is required."),
    address: yup.string().required('Adress is required'),
    zip: yup.string().required('Zip is required'),
    city: yup.string().required('City is required'),
});