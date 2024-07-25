import { jwtDecode } from "jwt-decode";

export function verifyToken(token: string) {
  try {
    const decoded = jwtDecode(token);
    return !!decoded;
  } catch (error) {
    return false;
  }
}
