"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type formValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const router = useRouter();

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: formValues) {
    const { email, password } = values;

    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (err) => {
          if (err.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("Email ou senha inválidos.");
            return form.setError("email", {
              message: "Email ou senha inválidos.",
            });
          }

          toast.error("Erro ao entrar. Tente novamente.");
        },
      },
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seuemail@exemplo.com" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer">Entrar</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
