import type {Metadata} from "next";
import "./globals.css";
import * as React from "react";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "RMOS Challenge",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<Readonly<RootLayoutProps>> = ({children}) => {
    return (
        <html lang="en">
        <body>
        {children}
        <Toaster/>
        </body>
        </html>
    );
};

export default RootLayout;
