import { useState } from "react";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('This is submit');

    //Lógica para enviar los datos del formulario
  };

  // Implementar el código del formulario aquí


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="text-sm p-2 mt-8 rounded-xl border"
        type="email"
        name="email"
        placeholder="Correo"
        value={correo}
        onChange={(target) => setCorreo(target.value)}
      />
      <div className="relative">
        <input
          className="text-sm p-2 rounded-xl border w-full"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(target) => setPassword(target.value)}
        />
        <svg
          className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="gray"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
      </div>
      <button
        className="bg-[#664040] rounded-xl text-white py-2 hover:scale-105 duration-300"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
