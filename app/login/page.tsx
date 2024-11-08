"use client";

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useStore from '@/store/useStore';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";

const schema = yup.object().shape({
    userName: yup.string().email('Geçersiz E-Posta').required('E-Posta alanı zorunlu'),
    password: yup.string().required('Şifre alanı zorunlu'),
});

const Page: React.FC = () => {
    const login = useStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const router = useRouter();

    const form = useForm<yup.InferType<typeof schema>>({
        resolver: yupResolver(schema),
        defaultValues: {
            userName: "",
            password: "",
        },
    });

    const onSubmit = async (values: yup.InferType<typeof schema>) => {
        setLoading(true);
        try {
            await login(values.userName, values.password);
            toast({
                variant: "success",
                title: "Giriş başarılı.",
            });
            router.push("/forecast");
        } catch (error: unknown) {
            let message = "Bilinmeyen bir hata oluştu";

            if (error instanceof AxiosError && error.response) {
                message = error.response.data?.message || error.message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast({
                variant: "destructive",
                title: "E-Posta veya şifre yanlış",
                description: message,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Giriş Yap</CardTitle>
                    <CardDescription>
                        Hesabınıza giriş yapmak için aşağıya E-Posta ve Şifre girin
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>E-Posta</FormLabel>
                                        <FormControl>
                                            <Input placeholder="mail@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Şifre</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
