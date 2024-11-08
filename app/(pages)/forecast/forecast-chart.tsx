import * as React from "react";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import {StpRmforKlasikValueItem} from "@/types/response.interface";

const chartConfig = {
    last: {
        label: "Son Durum",
        color: "hsl(var(--chart-1))",
    },
    current: {
        label: "Mevcut",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

interface ForecastChartProps {
    data: StpRmforKlasikValueItem[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({data}) => {
    const chartData = data.map((data) => ({
        date: data["Gun Tarih"],
        current: data["Mevcut"],
        last: data["Son Durum"],
    }));

    return (
        <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false}/>
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel/>}/>
                <ChartLegend content={<ChartLegendContent/>}/>
                <Bar
                    dataKey="last"
                    stackId="a"
                    fill="var(--color-last)"
                    radius={[0, 0, 4, 4]}
                />
                <Bar
                    dataKey="current"
                    stackId="a"
                    fill="var(--color-current)"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    );
}

export default ForecastChart;
