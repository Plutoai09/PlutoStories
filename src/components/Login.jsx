import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, HeadphonesIcon, Loader2, ArrowRight } from "lucide-react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const checkEmailInAPI = async (inputEmail) => {
    const proxyURL = "https://contractus.co.in/api/customers";
    try {
      const response = await fetch(proxyURL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      return data.items.some((item) => item.email === inputEmail);
    } catch (error) {
      console.error("Error while checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctPassword = "5545";
    setError({ email: "", password: "" });
    setIsSubmitting(true);

    try {
      const isEmailValid = await checkEmailInAPI(email);
      if (!isEmailValid) {
        setError((prev) => ({ ...prev, email: "Email not found in the system" }));
        setIsSubmitting(false);
        return;
      }

      if (password !== correctPassword) {
        setError((prev) => ({ ...prev, password: "Incorrect password" }));
        setPassword("");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem("authCode", "pluto_success");
      localStorage.setItem("plutoemail", email);
      navigate('/install');
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-8">
        {/* Logo/Brand Section */}
        <div className="text-center space-y-2">
          <div className="bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-xl font-bold">P</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to Pluto</h1>
          <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="name@company.com"
                />
              </div>
              {error.email && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {error.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
              {error.password && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                  {error.password}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all transform hover:translate-y-[-1px] hover:shadow-lg disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-sm text-center text-black-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
              Passcode has been sent to your email address
            </p>
          </div>
        </form>

        {/* Support Button */}
        <div className="pt-4">
          <button
            onClick={() => window.location.href = "https://wa.link/i0frpz"}
            className="w-full bg-white text-gray-700 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group"
          >
            <HeadphonesIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            <span className="group-hover:text-gray-900">Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;