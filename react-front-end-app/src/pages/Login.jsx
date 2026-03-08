import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { requestLogin } from "@/services/authService";
import backgroundImage from "../assets/images/guitarbackground.jpg";
import { Button } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // send login request to backend and wait for response
      const response = await requestLogin({ email, password });
      // use login function via useAuth (in AuthContext) to store token in session storage
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setLoginError("Invalid credentials")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full lg:grid-cols-[55fr_45fr] min-h-screen">
      {/* Left branding panel */}
      <div
        className="max-lg:hidden flex flex-col justify-between bg-gray-300 bg-cover bg-center p-16 min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div>
          <h1 className="text-4xl text-white">
            Amplify
          </h1>
        </div>
        <div>
          <h2 className="text-4xl text-white leading-snug">
            Guitar practice,
            <br />
            <em className="text-primary">Amplified</em>
          </h2>
          <p className="text-white/70 mt-3 text-lg">
            Gamified Guitar Learning Dashboard
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center bg-(--bg-surface) px-8 py-16">
        <div className="w-full max-w-sm">
          {/* Mobile */}
          <div className="mb-4 lg:hidden">
          <h1 className="text-5xl mb-2">
            Amplify
          </h1>
          <h2>
            Gamified Guitar Learning Dashboard
          </h2>
          </div>

          <h2 className="text-3xl mb-2 text-(--text-high)">
            Welcome back!
          </h2>
          <p className="text-(--text-med) mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-(--text-high)">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-(--bg-surface) placeholder:text-(--text-med) text-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-(--text-high)">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-(--bg-surface) placeholder:text-(--text-med) text-white"
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-sm text-center">
                {loginError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-(--primary)/80 text-black font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 mt-2 cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-(--text-med) mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
