"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth/AuthContext";
import { ApiBackend } from "@/data/axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { User } from "@/interfaces/User";

export const LoginPage = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: true,
        },
    });
    const [errors, setErrors] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const { auth } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const onSubmit = async (forms: any) => {
        try {
            const { data } = await ApiBackend.post<any>("/Auth/Login", forms);

            const user_: User = {
                email: forms.email,
                password: forms.password,
                token: data.token,
            }

            localStorage.setItem("token", data.token);
            auth(user_);
            setErrors(false);
            setErrorMessages([]);


        } catch (error: any) {
            console.error("Error en la petición:", error);
            setErrors(true);
            let messages: string[] = [];
            const errorData = error.response?.data;
            if (errorData?.errors) {
                // Es un array de errores
                messages = errorData.errors;
            } else if (typeof errorData === "string") {
                // Es un solo string como mensaje de error
                messages = [errorData];
            } else if (typeof errorData?.message === "string") {
                // A veces viene como { message: "algo salió mal" }
                messages = [errorData.message];
            } else if (error.message === "Network Error") {
                messages = ["No se pudo conectar con el servidor."];
            } else {
                messages = ["Ocurrió un error inesperado."];
            }
            setErrorMessages(messages);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h1 className="text-4xl font-bold mb-8">Iniciar Sesión</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "El correo es obligatorio" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        rules={{ required: "La contraseña es obligatoria" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="********"
                                            {...field}
                                            className="pr-10"
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="hover:cursor-pointer">Iniciar Sesión</Button>
                </form>
            </Form>

            {errors && (
                <div className="mt-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded-md">
                    <h2 className="text-lg font-bold">Error en la autenticación</h2>
                    {errorMessages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
            )}

        </div>
    );
};
