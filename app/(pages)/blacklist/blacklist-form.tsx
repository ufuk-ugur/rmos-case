"use client"

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import * as React from "react";
import useStore from "@/store/useStore";
import {useToast} from "@/hooks/use-toast";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AxiosError} from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {PostBlacklistFormProps} from "@/types/payload.interface";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";

const schema = yup.object().shape({
    Adi: yup.string().required("Adı alanı zorunlu"),
    Soy: yup.string().required("Soyadı alanı zorunlu"),
    Kimlik_no: yup.string().nullable(),
    Tcno: yup.string().nullable(),
    Aciklama: yup.string().required("Açıklama alanı zorunlu"),
});

interface BlacklistFormProps {
    data: PostBlacklistFormProps;
    children: React.ReactNode;
}

const BlacklistForm: React.FC<BlacklistFormProps> = ({data, children}) => {
    const loading = useStore((state) => state.loading);
    const postBlacklist = useStore((state) => state.postBlacklist);
    const fetchBlacklist = useStore((state) => state.fetchBlacklist);
    const {toast} = useToast();
    const [open, setOpen] = useState(false)

    const form = useForm<yup.InferType<typeof schema>>({
        resolver: yupResolver(schema),
        defaultValues: {
            Adi: data?.Adi,
            Soy: data?.Soy,
            Kimlik_no: data?.Kimlik_no,
            Tcno: data?.Tcno,
            Aciklama: data?.Aciklama,
        },
    });

    const onSubmit = async (values: yup.InferType<typeof schema>) => {

        try {
            await postBlacklist({
                db_Id: 9,
                Id: data.Id,
                ...values,
            });
            toast({
                variant: "success",
                title: "Blacklist başarıyla kaydedildi",
            });
            fetchBlacklist({db_Id: 9, Adi: "ALL?"}).then();
            setOpen(false);
        } catch (error: unknown) {
            let message = "Beklenmeyen bir hata oluştu";

            if (error instanceof AxiosError && error.response) {
                message = error.response.data?.message || error.message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast({
                variant: "destructive",
                title: "Oluşturulurken bir hata oluştu",
                description: message,
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="Adi"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Adı</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Soy"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Soyadı</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Kimlik_no"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Kimlik No</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Tcno"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>TC No</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Aciklama"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Açıklama</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default BlacklistForm;
