import { Field, Input, Button, Label } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { requestRegistration } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // store field specific validation errors for enhanced UI/UX
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
});

  const navigate = useNavigate();
  // destructure login function to immediatley sign user in upon successful registration
  const { login } = useAuth();

  const validateRegistrationForm = () => {
    const newErrors = {};
    if (firstName.trim().length < 2 || firstName.trim().length > 40) {
      newErrors.firstName = "First name must be between 2 and 40 characters";
    }
    if (lastName.trim().length < 2 || lastName.trim().length > 40) {
      newErrors.lastName = "Last name must be between 2 and 40 characters";
    }
    if (displayName.trim().length > 20) {
      newErrors.displayName = "Display name must not exceed 20 characters"
    }
    if (!email.includes("@") || email.trim().length === 0) {
      newErrors.email = "Email must be valid"
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match"
    }
    return newErrors;
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    // if there are form errors, set the errors and return early
    const validateErrors = validateRegistrationForm();
    // if validation object contains any keys, errors were found
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestRegistration({ email, password, firstName, lastName, displayName });
      // log user in using JWT from successful registration
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 409) {
        // takes a copy of all errors and overrides email error as a conflict
        setErrors(prev => ({ ...prev, email: "Email already in use." }));
      } else {
        setErrors(prev => ({ ...prev, email: "Registration failed. Please try again." }));
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center py-[10vh] bg-(--bg-base)">
      <div className="relative z-10 w-full max-w-md rounded-3xl border px-11 py-10 bg-(--bg-surface)/30 shadow-xl hover:shadow-2xl shadow-primary border-primary transition-all duration-300 hover:-translate-y-1">
        <h1 className="text-[32px] text-primary tracking-wide">
          Amplify
        </h1>
        <h2 className="text-[28px] font-bold text-(--text-high) tracking-tight mb-1">
          Create an account
        </h2>
        <p className="text-sm text-(--text-med) mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
        <form onSubmit={handleRegistration}>
          <Field className="flex flex-col gap-4">
            <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <Label className="text-xs font-semibold uppercase tracking-wide text-(--text-low)">
                First name
              </Label>
              <Input
                id="register-first-name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                name="first-name"
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 rounded-xl text-sm text-(--text-high) placeholder:text-(--text-low) bg-(--bg-surface) border border-white/10 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/5 transition-all"
                required
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <Label className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Last name
              </Label>
              <Input
                id="register-last-name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="last-name"
                type="text"
                placeholder="Smith"
                className="w-full px-4 py-3 rounded-xl text-sm text-(--text-high) placeholder:text-(--text-low) bg-(--bg-surface) border border-white/10 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/5 transition-all"
                required
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Display Name
              </Label>
              <Input
                id="register-display-name"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                name="display-name"
                type="text"
                placeholder="johnsmith123"
                className="w-full px-4 py-3 rounded-xl text-sm text-(--text-high) placeholder:text-(--text-low) bg-(--bg-surface) border border-white/10 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/5 transition-all"
                required
              />
              {errors.displayName && (
                <p className="text-red-400 text-xs mt-1">{errors.displayName}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Email address
              </Label>
              <Input
                id="register-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm text-(--text-high) placeholder:text-(--text-low) bg-(--bg-surface) border border-white/10 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/5 transition-all"
                required
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Password
              </Label>
              <Input
                id="register-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm text-(--text-high) placeholder:text-(--text-low) bg-(--bg-surface) border border-white/10 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-primary/5 focus:ring-2 transition-all"
                required
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Confirm password
              </Label>
              <Input
                id="register-confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm text-(--text-high) placeholder:text-(--text-low) bg-(--bg-surface) border border-white/10 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/5 transition-all"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full shadow-(--primary) py-3 rounded-xl font-semibold cursor-pointer transition-all disabled:opacity-60 mt-1 bg-primary hover:bg-(--primary)/80 hover:shadow-lg"
            >
              {isLoading ? "Loading..." : "Create Account"}
            </Button>
          </Field>
        </form>
      </div>
    </div>
  );
}
