import dynamic from "next/dynamic";

const Login = dynamic(() => import("./Login"));

export default function LoginPage() {
  return <Login />;
}
