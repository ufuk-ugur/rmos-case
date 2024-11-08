"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Ban, ChartArea, ChevronsUpDown, LogOut, LucideProps} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "@/store/useStore";
import {useRouter} from "next/navigation";


interface NavigationItem {
    name: string;
    url: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface Data {
    user: {
        email: string;
    };
    navigationItems: NavigationItem[];
}

const data: Data = {
    user: {
        email: "yunus@test.com",
    },
    navigationItems: [
        {
            name: "Forecast",
            url: "forecast",
            icon: ChartArea,
        },
        {
            name: "Blacklist",
            url: "blacklist",
            icon: Ban,
        },
    ],
};

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<Readonly<MainLayoutProps>> = ({children}) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const logout = useStore((state) => state.logout);

    useEffect(() => {
        const state = useStore.getState();
        const token: string = state.token;
        setEmail(state.email);
        if (!token) {
            router.push("/login");
        }
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">
                                                {email.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate text-xs">{email}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4"/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="start"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarFallback className="rounded-lg">
                                                    {email.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate text-xs">{email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut/>
                                        Çıkış Yap
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupLabel>Navbar</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navigationItems.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon/>
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail/>
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}

export default MainLayout;
