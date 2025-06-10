import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/kit/form.tsx";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/kit/input.tsx";
import { Button } from "@/shared/ui/kit/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth/model/use-login.ts";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Обязательно",
    })
    .email("Неверный email"),
  password: z
    .string({
      required_error: "Обязательно",
    })
    .min(6, "Пароль должен быть не менее 6 символов"),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { errorMessage, isPending, login } = useLogin();

  const onSubmit = form.handleSubmit(login);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}
        <Button disabled={isPending} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  );
}
