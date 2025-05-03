import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/types/auth";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const { showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
    } catch (error) {
      const err = error as Error;
      showError(err.message || "Login gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="email@contoh.com"
          {...register("email")}
          error={errors.email?.message}
          autoComplete="username"
        />
      </div>

      <div>
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
          autoComplete="current-password"
        />
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full"
        >
          Masuk
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
