import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb";

interface HeaderProps {
    title: string;
}

export const Header: React.FC<Readonly<HeaderProps>> = ({title}) => {
    return (
        <header
            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                {/* Sidebar trigger button */}
                <SidebarTrigger className="-ml-1"/>

                {/* Vertical separator */}
                <Separator orientation="vertical" className="mr-2 h-4"/>

                {/* Breadcrumb navigation */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
};
