"use client";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ApiBackend } from "@/data/axios"
import { ResponseAPILogin } from "@/interfaces/Login";
import { useState } from "react"
import { useForm } from "react-hook-form"


export default function LoginPage() {

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: true,
        }
    })

    const [errors, setErrors] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const onSubmit = async (data: any) => {
        try {
            const response = await ApiBackend.post<ResponseAPILogin>("Auth/Login", data);
            console.log("Respuesta del login: ", response.data);
            setErrors(false);
            setErrorMessages([]);
        } catch (error: any) {
            console.log("Error en el login: ", error);
            setErrors(true);
            let messages: string[] = [];
            const errorData = error.response?.data

            if (errorData?.errors) {
                // Es un array de errores
                messages = errorData.errors
            } else if (typeof errorData === "string") {
                // Es un string de error
                messages = [errorData]
            } else if (typeof errorData?.message === "string") {
                // Es un string de error
                messages = [errorData.message]
            } else if (error.message === "Network Error") {
                messages = ["Error de conexión"]
            } else {
                messages = ["Error desconocido"]
            }
            setErrorMessages(messages);

        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "El correo es requerido" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Email </FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    >
                    </FormField>

                    <FormField
                        control={form.control}
                        name="password"
                        rules={{ required: "La contraseña es requerida" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Contraseña </FormLabel>
                                <FormControl>
                                    <Input type="paswword" placeholder="*********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <Button type="submit"> Iniciar sesión</Button>
                </form>
            </Form>

            {errors && (
                <div className="mt-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded-md">
                    <h2 className="text-lg font-bold"> Error de auth</h2>
                    {errorMessages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
            )}

        </>
    )
}