import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "emilys",
    password: "emilyspass",
  });
  const { mutate: loginMutate, isError,error } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutate(formData);
  };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const data = await loginUser(formData);

  //     localStorage.setItem("accessToken", data.accessToken);
  //     localStorage.setItem("user", JSON.stringify(data));

  //     navigate("/");
  //   } catch (err) {
  //     setError(err.response?.data?.message || err.message || "Login failed");
  //   }
  // }

  return (
    <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))} />

      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} />

      <button type="submit">Login</button>
      {isError && <p style={{ color: "red" }}>{error.message}</p>}

    </form>
    </div>
  );
}

export default Login;