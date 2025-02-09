import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import UseAccessToken from "../../hooks/UseAccessToken";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = UseAccessToken(loginUserEmail);

  if (token) {
    window.location.reload(false);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("Login successful");
          navigate("/main");
        }
        form.reset();
        setLoginUserEmail(email);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="m">
      <div className="flex flex-col max-w-md m-auto p-6 rounded-md sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <form noValidate className="space-y-12" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input type="email" name="email" id="email" placeholder="yourmail@gmail.com" className="w-full px-3 py-2 border rounded-md" required />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">
                  Forgot password?
                </a>
              </div>
              <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md" required />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-black text-white">
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Dont have an account yet?{" "}
              <Link rel="noopener noreferrer" to="/register" className="hover:underline font-bold">
                Sign up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
