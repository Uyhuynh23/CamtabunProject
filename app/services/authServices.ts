export type LoginResult = 
  | { success: true; user: { email: string; isPublisher: boolean } }
  | { success: false; message: string }

export async function login(email: string, password: string): Promise<LoginResult> {
  if (email === "abc" && password === "abc") {
    return { success: true, user: { email, isPublisher: false } }
  }
  return { success: false, message: "Sai tài khoản hoặc mật khẩu" }
}

export type RegisterResult = 
  | { success: true }
  | { success: false; message: string }

export async function register(email: string, password: string): Promise<RegisterResult> {
  // Giả lập gọi API đăng ký
  if (email && password) {
    return { success: true }
  }
  return { success: false, message: "Thiếu thông tin đăng ký" }
}