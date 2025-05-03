import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout title="Login Sistem">
      <LoginForm />
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
