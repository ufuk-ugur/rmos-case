"use client";

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import useStore from "@/store/useStore";

const Page: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const token: string = useStore.getState().token;

        if (token) {
            router.push("/forecast");
        } else {
            router.push("/login");
        }
    }, []);

    return (<></>);
};

export default Page;
