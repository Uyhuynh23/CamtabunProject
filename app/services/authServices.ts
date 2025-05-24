//import emailjs from "@emailjs/browser";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';



export async function sendVerificationCode(email: string, fullName: string, code: string) {
  //const code = Math.floor(100000 + Math.random() * 900000).toString();
  await emailjs.send(
    "service_g4zacyv",
    "template_ky7s5hb",
    {
      to_email: email,
      code,
      name: fullName, // truyền đúng tên biến template cần
      title: "Verification Code",
      message: `Your verification code is: ${code}`,
      email // nếu template dùng {{email}}
    },
    "YjKLDC0rjHB1j1TAp"
  );
  // Lưu code và thông tin tạm thời vào localStorage hoặc backend
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find((u: any) => u.email === email);
  if (!user) {
    user = { email, verificationCode: code, isVerified: false };
    users.push(user);
  } else {
    user.verificationCode = code;
  }
  localStorage.setItem("users", JSON.stringify(users));
}



export type LoginResult =
  | { success: true; user: { email: string; isPublisher: boolean } }
  | { success: false, message: string };

export async function login(email: string, password: string): Promise<LoginResult> {
  // Nếu email và password đều là "abc" thì cho đăng nhập luôn
  if (email === "abc" && password === "abc") {
    return { success: true, user: { email, isPublisher: false } };
  }
  // Lấy danh sách user đã đăng ký từ localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (user) {
    return { success: true, user: { email: user.email, isPublisher: user.isPublisher || false } }
  }
  return { success: false, message: "Incorrect email or password" }
}


export async function register(
  email: string,
  password: string,
  fullName: string,
  verificationCode: string
): Promise<{ success: boolean; message?: string }> {
  // Lấy thông tin tạm thời đã lưu
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: any) => u.email === email);

  if (!user || user.verificationCode !== verificationCode) {
    return { success: false, message: "Invalid verification code" };
  }

  // Đánh dấu đã xác thực
  user.isVerified = true;
  user.password = password;
  user.fullName = fullName;
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true };
}