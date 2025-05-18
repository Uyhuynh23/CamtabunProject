// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { User } from "lucide-react"

// export interface AuthCardProps {
//   email: string;
//   setEmail: (email: string) => void;
//   password: string;
//   setPassword: (password: string) => void;
//   error: string;
//   registerMode: boolean;
//   setRegisterMode: (mode: boolean) => void;
//   handleLogin: () => void;
//   // Sửa lại hàm handleRegister để nhận thêm verificationCode
//   handleRegister: (fullName: string, verifyPassword: string, verificationCode?: string) => void;
//   extra?: React.ReactNode;
// }

// const AuthCard = ({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   error,
//   registerMode,
//   setRegisterMode,
//   handleLogin,
//   handleRegister,
//   extra,
// }: AuthCardProps) => {
//   const [fullName, setFullName] = useState("");
//   const [verifyPassword, setVerifyPassword] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const [verificationCode, setVerificationCode] = useState("");
//   const [localError, setLocalError] = useState("");

//   // Gửi mã xác thực về email (giả lập)
//   const handleSendVerification = async () => {
//     if (!fullName || !email || !password || !verifyPassword) {
//       setLocalError("Please fill all fields.");
//       return;
//     }
//     if (password !== verifyPassword) {
//       setLocalError("Passwords do not match.");
//       return;
//     }
//     setLocalError("");
//     // Gọi API gửi mã xác thực về email ở đây
//     // await sendVerificationCode(email)
//     setEmailSent(true);
//   };

//   // Xác thực mã và đăng ký
//   const handleVerifyAndRegister = () => {
//     if (!verificationCode) {
//       setLocalError("Please enter the verification code sent to your email.");
//       return;
//     }
//     setLocalError("");
//     // Gọi API xác thực mã và lưu user vào backend ở đây
//     handleRegister(fullName, verifyPassword, verificationCode);
//   };

//   return (
//     <Card className="rounded-3xl shadow-2xl border-0 bg-white/10 backdrop-blur-lg ring-1 ring-cyan-400/30 w-full">
//       <CardContent className="p-10 space-y-8">
//         <div className="flex items-center gap-3 justify-center">
//           <User className="w-8 h-8 text-cyan-400 drop-shadow" />
//           <h2 className="text-3xl font-bold text-white">Welcome to VoSo</h2>
//         </div>
//         <div className="space-y-4">
//           {registerMode && !emailSent && (
//             <Input
//               placeholder="Full Name"
//               className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
//               value={fullName}
//               onChange={e => setFullName(e.target.value)}
//             />
//           )}
//           <Input
//             placeholder="Email"
//             className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             disabled={registerMode && emailSent}
//           />
//           <Input
//             placeholder="Password"
//             type="password"
//             className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             disabled={registerMode && emailSent}
//           />
//           {registerMode && !emailSent && (
//             <Input
//               placeholder="Verify Password"
//               type="password"
//               className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
//               value={verifyPassword}
//               onChange={e => setVerifyPassword(e.target.value)}
//             />
//           )}
//           {registerMode && emailSent && (
//             <Input
//               placeholder="Verification Code"
//               value={verificationCode}
//               onChange={e => setVerificationCode(e.target.value)}
//               className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
//             />
//           )}
//           {(localError || error) && <div className="text-red-400 text-sm">{localError || error}</div>}
//           {!registerMode && (
//             <Button
//               className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
//               onClick={handleLogin}
//             >
//               Login
//             </Button>
//           )}
//           {registerMode && !emailSent && (
//             <Button
//               className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
//               onClick={handleSendVerification}
//             >
//               Send Verification Code
//             </Button>
//           )}
//           {registerMode && emailSent && (
//             <Button
//               className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
//               onClick={handleVerifyAndRegister}
//             >
//               Register
//             </Button>
//           )}
//           {registerMode ? (
//             <Button
//               variant="outline"
//               className="w-full rounded-xl border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition"
//               onClick={() => setRegisterMode(false)}
//             >
//               Back to Login
//             </Button>
//           ) : (
//             <Button
//               variant="outline"
//               className="w-full rounded-xl border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition"
//               onClick={() => setRegisterMode(true)}
//             >
//               Register
//             </Button>
//           )}
//           {extra && <div className="mt-2">{extra}</div>}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default AuthCard;
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { register } from "@/app/services/authServices";

export interface AuthCardProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  error: string
  registerMode: boolean
  setRegisterMode: (mode: boolean) => void
  handleLogin: () => Promise<void>
  handleRegister: () => Promise<void>
}

const AuthCard = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  registerMode,
  setRegisterMode,
  handleLogin,
  setError,
  extra,
}: AuthCardProps) => {
  const [fullName, setFullName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [localError, setLocalError] = useState("");

  // Reset localError và các trường khi chuyển giữa login/register
  useEffect(() => {
    setLocalError("");
    setError(""); // Reset error toàn cục khi chuyển login/register
    setFullName("");
    setVerifyPassword("");
    setVerificationCode("");
    setEmailSent(false);
  }, [registerMode]);

  // Gửi mã xác thực về email
  const handleSendVerification = async () => {
    if (!fullName || !email || !password || !verifyPassword) {
      setLocalError("Please fill in all fields.");
      return;
    }
    if (password !== verifyPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    setLocalError("");
    const sendCodeRes = await fetch("/api/send-verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!sendCodeRes.ok) {
      setLocalError("Failed to send verification code. Please try again.");
      return;
    }
    setEmailSent(true);
    setLocalError("Verification code sent! Please check your email.");
  };

  // Xác thực mã và đăng ký
  const handleVerifyAndRegister = async () => {
    if (!verificationCode) {
      setLocalError("Please enter the verification code sent to your email.");
      return;
    }
    setLocalError("");
    const res = await register(email, password);
    if (res.success) {
      setRegisterMode(false);
      setError("Registration successful! Please log in.");
    } else {
      setLocalError(res.message || "Register failed");
    }
  };

  // Xử lý logic khi button Login được click
  const handleLoginClick = async () => {
    setLocalError("");
    setError("");
    if (!email || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }
    await handleLogin();
  };

  return (
    <Card className="rounded-3xl shadow-2xl border-0 bg-white/10 backdrop-blur-lg ring-1 ring-cyan-400/30 w-full">
      <CardContent className="p-10 space-y-8">
        <div className="flex items-center gap-3 justify-center">
          <User className="w-8 h-8 text-cyan-400 drop-shadow" />
          <h2 className="text-3xl font-bold text-white">Welcome to VoSo</h2>
        </div>
        <div className="space-y-4">
          {registerMode && !emailSent && (
            <Input
              placeholder="Full Name"
              className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          )}
          <Input
            placeholder="Email"
            className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setLocalError("");
            }}
            disabled={registerMode && emailSent}
          />
          <Input
            placeholder="Password"
            type="password"
            className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setLocalError("");
            }}
            disabled={registerMode && emailSent}
          />
          {registerMode && !emailSent && (
            <Input
              placeholder="Verify Password"
              type="password"
              className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
              value={verifyPassword}
              onChange={e => setVerifyPassword(e.target.value)}
            />
          )}
          {registerMode && emailSent && (
            <Input
              placeholder="Verification Code"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              className="rounded-xl bg-slate-800/70 text-white border-cyan-400/30"
            />
          )}
          {(localError || error) && <div className="text-red-400 text-sm">{localError || error}</div>}
          {!registerMode && (
            <Button
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
          {registerMode && !emailSent && (
            <Button
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
              onClick={handleSendVerification}
            >
              Send Verification Code
            </Button>
          )}
          {registerMode && emailSent && (
            <Button
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition"
              onClick={handleVerifyAndRegister}
            >
              Register
            </Button>
          )}
          {registerMode ? (
            <Button
              variant="outline"
              className="w-full rounded-xl border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition"
              onClick={() => setRegisterMode(false)}
            >
              Back to Login
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full rounded-xl border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition"
              onClick={() => setRegisterMode(true)}
            >
              Register
            </Button>
          )}
          {extra && <div className="mt-2">{extra}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthCard;