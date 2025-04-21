'use client';

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiBackend } from "@/data/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    Content: string;
    Files: FileList | null;
};

export const CreatePostPage = () => {

    const form = useForm<FormData>({
        defaultValues: {
          Content: '',
          Files: null,
        },
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        formData.append("Content", data.Content);
        if (data.Files && data.Files.length > 0) {
            formData.append("Files", data.Files[0]);
        }
        try{
            const reponse = await ApiBackend.post("Post/CreatePost", formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (!reponse.data.result){
                throw new Error("Error al crear el post");
            }
            setError(null);
            setPreviewUrl(null);

            form.reset();
            router.push("/")

        } catch (error: any) {
            console.error("Error en la petición de Crear Post:", error);
            if (error.response && typeof error.response.data === "string") {
                setError(error.response.data);
            } else {
                setError("Ocurrió un error inesperado al crear el post.");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="p-8 rounded-md shadow-md w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold text-center text-white">Crear Post</h1>
    
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="Content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Contenido</FormLabel>
                      <FormControl>
                        <Input placeholder="Escribe un título..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  control={form.control}
                  name="Files"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel className="text-white">Imagen</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setPreviewUrl(url);
                              onChange(e.target.files);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                { error && (
                  <div className="text-red-500 bg-red-200 text-sm mt-2 p-2 rounded-lg">
                    {error}
                  </div>
                )
                }
    
                {previewUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">Vista previa:</p>
                    <img
                      src={previewUrl}
                      alt="Vista previa"
                      className="w-full h-64 object-cover rounded-md border"
                    />
                  </div>
                )}
    
                {}
    
                <Button type="submit" className="w-full">
                  Publicar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      );
}