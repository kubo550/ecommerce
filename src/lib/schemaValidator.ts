import * as yup from "yup";

export const schema = yup.object().shape({
    firstname: yup.string().required("First Name is required."),
    lastname: yup.string().required("Last Name is required."),
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email("Enter valid adress email.").required("E-mail is required."),
    address1: yup.string().required('Adress is required'),
    zip: yup.string().required('Zip is required'),
    city: yup.string().required('City is required'),
});