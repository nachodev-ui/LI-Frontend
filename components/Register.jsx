import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { basicSchema } from "@/schemas";
import { useFormik } from "formik";

// Validate username if is 'admin', etc
export const validate = (values) => {
  const errors = {};

  if (
    [
      "admin",
      "superadmin",
      "root",
      "administrator",
      "administrador",
      "null",
    ].includes(values.username)
  ) {
    errors.username = "No puedes usar ese nombre de usuario";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const user = {
          username: values.username,
          correo: values.email,
          password: values.username,
          confirmPassword: values.confirmPassword,
        };

        const response = await axios.post(
          "http://localhost:5000/auth/signup",
          user
        );

        console.log(response.data);
        actions.resetForm();
      } catch (e) {
        if (e.response.data && Object.keys(e.response.data).length > 0) {
          setErrorMessage(e.response.data);
          setShowModal(true);
        } else {
          console.log("Error desconocido");
        }
      }
    },
    validate,
  });

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-12 md:px-12">
          <h2 className="font-bold text-2xl text-[#978284]">Registro</h2>
          <p className="text-xs mt-2 mb-8 text-[#9f888b]">
            ¡Crea tu cuenta fácilmente y empieza a disfrutar de todos nuestros
            productos y servicios!
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            autoComplete="off"
          >
            <input
              className={
                errors.username && touched.username
                  ? "input-error"
                  : "text-sm p-2 rounded-xl border"
              }
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="username"
              id="username"
              placeholder="Ingresa un nombre de usuario"
            />
            {errors.username && touched.username && <p>{errors.username}</p>}
            <input
              className={
                errors.email && touched.email
                  ? "input-error"
                  : "text-sm p-2 rounded-xl border"
              }
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              id="email"
              placeholder="Ingresa tu correo"
            />
            {errors.email && touched.email && <p>{errors.email}</p>}
            <div className="relative">
              <input
                className={
                  errors.password && touched.password
                    ? "input-error"
                    : "text-sm rounded-xl border w-full"
                }
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mínimo 5 caracteres"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
              />
              <svg
                className={
                  errors.password && touched.password
                    ? "bi bi-eye absolute top-1/3 right-3 -translate-y-1/2  cursor-pointer"
                    : "bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                }
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                viewBox="0 0 16 16"
                onClick={toggleShowPassword}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
              {errors.password && touched.password && <p className="mt-3">{errors.password}</p>}
            </div>
            <input
              className={
                errors.password && touched.password
                  ? "input-error"
                  : "text-sm rounded-xl border w-full"
              }
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button 
              className="bg-[#CBB8BA] rounded-xl text-white py-2 hover:scale-105 duration-300"
              type="submit"
              disabled={isSubmitting}  
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">O</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Iniciar con Google
          </button>

          <p className="flex justify-center mt-5 text-xs border-b py-4">
            ¿Olvidó su contraseña?
          </p>

          <div className="font-extralight ">
            <p className="text-sm mt-2 text-[#9d878a]">
              ¿Ya tienes cuenta?{" "}
              <span className="text-[#ad9b9d] cursor-pointer">
                <Link href="/login">Iniciar sesión</Link>
              </span>
            </p>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="/img/li-signup.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Register;
