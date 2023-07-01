import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser({ email, password }));
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/products");
    }
  }, [navigate, user]);

  return (
    <main className="login-wrapper" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <form>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </main>
  );
};

export default Login;
