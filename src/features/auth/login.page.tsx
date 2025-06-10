import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.tsx";
import { AuthLayout } from "@/features/auth/ui/auth-layout.tsx";
import { LoginForm } from "@/features/auth/ui/login-form.tsx";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      footerText={
        <>
          Нет аккаунта?{" "}
          <Link className="text-primary underline" to={ROUTES.REGISTER}>
            Зарегистрироваться
          </Link>
        </>
      }
      form={<LoginForm />}
    />
  );
}

export const Component = LoginPage;
