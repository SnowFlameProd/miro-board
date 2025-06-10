import { AuthLayout } from "@/features/auth/ui/auth-layout.tsx";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes.tsx";
import { RegisterForm } from "@/features/auth/ui/register-form.tsx";

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации в системе"
      footerText={
        <>
          Уже есть аккаунт?{" "}
          <Link className="text-primary underline" to={ROUTES.LOGIN}>
            Войти
          </Link>
        </>
      }
      form={<RegisterForm />}
    />
  );
}

export const Component = RegisterPage;
