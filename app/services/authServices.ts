//import emailjs from "@emailjs/browser";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { mockUsers } from "@/app/data/mockUsers";



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
  const user = mockUsers.find(
    (u) => (u.email === email) && u.password === password
  );
  if (user) {
    // Lưu user vào localStorage để dùng chung
    localStorage.setItem("currentUser", JSON.stringify({
      email: user.email,
      displayName: user.displayName,
      isPublisher: user.isPublisher,
      contact: user.contact
    }));
    return { success: true, user: { email: user.email, isPublisher: user.isPublisher } };
  }

  // Nếu email và password đều là "abc" thì cho đăng nhập luôn
  // Nếu email và password đều là "abc" thì cho đăng nhập luôn
  
  if (email === "pub" && password === "pub") {
    localStorage.setItem("currentUser", JSON.stringify({
      email,
      displayName: "Publisher",
      isPublisher: true,
      contact: ""
    }));
    return { success: true, user: { email, isPublisher: true } };
  }

  // Lấy danh sách user đã đăng ký từ localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const localUser = users.find((u: any) => u.email === email && u.password === password);
  if (localUser) {
    localStorage.setItem("currentUser", JSON.stringify({
      email: localUser.email,
      displayName: localUser.fullName || "",
      isPublisher: localUser.isPublisher || false,
      contact: localUser.contact || ""
    }));
    return { success: true, user: { email: localUser.email, isPublisher: localUser.isPublisher || false } }
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