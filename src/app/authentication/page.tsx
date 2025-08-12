import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";

export default async function Authentication() {
  return (
    <>
      <div className="flex w-full flex-col gap-6 p-5 lg:px-8 lg:py-12">
        <div className="mx-auto w-full max-w-md">
          <Tabs defaultValue="sign-in">
            <TabsList className="w-full">
              <TabsTrigger value="sign-in" className="flex-1">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="sign-up" className="flex-1">
                Criar Conta
              </TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="sign-in">
              <SignInForm />
            </TabsContent>
            <TabsContent value="sign-up">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
