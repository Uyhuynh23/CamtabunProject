import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Lưu mã xác thực tạm thời (chỉ dùng cho demo, production nên lưu DB)
const codes: Record<string, string> = {};

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
  }

  // Tạo mã xác thực 6 số
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = code;

  // Gửi email (bạn cần cấu hình SMTP thực tế)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // email của bạn
      pass: process.env.SMTP_PASS, // mật khẩu ứng dụng
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your VoSo Verification Code",
      text: `Your verification code is: ${code}`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}

// Hàm này chỉ để minh họa, bạn nên lưu code vào DB hoặc cache thực tế!
export function getCode(email: string) {
  return codes[email];
}
