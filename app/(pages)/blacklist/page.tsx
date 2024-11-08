"use client";

import React, {useEffect} from 'react';
import {Header} from "@/components/custom/header";
import {Container} from "@/components/custom/container";
import BlacklistTable from "@/app/(pages)/blacklist/blacklist-table";
import useStore from "@/store/useStore";
import {useToast} from "@/hooks/use-toast"

const Page: React.FC = () => {
    const data = useStore((state) => state.blacklists);
    const fetchBlacklist = useStore((state) => state.fetchBlacklist);
    const {toast} = useToast();

    useEffect(() => {
        fetchBlacklist({db_Id: 9, Adi: "ALL?"}).then().catch((error) => {
            toast({
                variant: "destructive",
                title: "Beklenmeyen bir hata oluştu",
                description: error.message,
            });
        });
    }, []);

    return (
        <>
            {/* Header section */}
            <Header title="Blacklist"/>

            {/* Main content */}
            <Container>
                <BlacklistTable data={data}/>
            </Container>
        </>
    );
};

export default Page;
