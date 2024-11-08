"use client"

import * as React from "react"
import {useEffect} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Container} from "@/components/custom/container";
import {Header} from "@/components/custom/header";
import useStore from "@/store/useStore";
import ForecastTable from "@/app/(pages)/forecast/forecast-table";
import ForecastChart from "@/app/(pages)/forecast/forecast-chart";
import {useToast} from "@/hooks/use-toast";

const Page: React.FC = () => {
    const data = useStore((state) => state.forecasts);
    const fetchForecast = useStore((state) => state.fetchForecast);
    const {toast} = useToast();

    useEffect(() => {
        fetchForecast({
            db_Id: 9,
            xRez_Sirket: 9,
            xBas_Tar: '2024-06-01',
            xBit_Tar: '2024-06-10',
            xtip: 1,
            kon1: 'ALL',
            kon2: 'BB',
            xchkFis_Fazla_otel_10: 0,
            bas_Yil: 2022,
            bit_Yil: 2022,
            fisrci_Kapalioda_10: 0,
            xRez_C_W: 'C',
            xSistem_Tarihi: '2024-01-01',
            xAlis_Tarihi: '2024-01-01',
            sistem_Bas1: '2020-01-01',
            sistem_Bit1: '2029-01-01',
            pmdahil_10: 0,
            tip_1: '001',
            xFis_Bela_tutar_10: 0,
            trace_Dus_10: 0,
            cev_01: null,
        }).then().catch((error) => {
            toast({
                variant: "destructive",
                title: "Beklenmeyen bir hata oluştu",
                description: error.message,
            });
        });
    }, [data]);

    return (
        <>
            {/* Header section */}
            <Header title="Forecast"/>

            {/* Main content */}
            <Container>
                <Tabs defaultValue="table">
                    <TabsList>
                        <TabsTrigger value="table">Tarih Forecast</TabsTrigger>
                        <TabsTrigger value="chart">Forecast Grafiği</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table">
                        <ForecastTable data={data}/>
                    </TabsContent>
                    <TabsContent value="chart">
                        <ForecastChart data={data}/>
                    </TabsContent>
                </Tabs>
            </Container>
        </>
    );
}

export default Page;
