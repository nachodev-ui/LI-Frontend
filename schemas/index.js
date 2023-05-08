import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Ingresa un correo válido")
    .required("El correo es obligatorio"),
  username: Yup
    .string()
    .min(3, "El usuario debe tener mínimo 3 caracteres")
    .required("El nombre de usuario es obligatorio"),
  password: Yup
    .string()
    .min(5, 'Contraseña de mínimo 5 caracteres')
    .matches(passwordRules, { message: "La contraseña es muy débil" })
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup
    .string()
    .required("Por favor confirma tu contraseña")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
});


