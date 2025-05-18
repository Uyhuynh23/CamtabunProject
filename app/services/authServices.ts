export type LoginResult =
  | { success: true; user: { email: string; isPublisher: boolean } }
  | { success: false; message: string };

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
  // Lưu user vào localStorage (demo)
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u: any) => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }
  users.push({ email, password, fullName, isPublisher: false });
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true };
}