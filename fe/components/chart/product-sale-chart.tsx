"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with dots"


const chartData = [
    { month: "tháng 1", desktop: 186, mobile: 80 },
    { month: "tháng 2", desktop: 305, mobile: 200 },
    { month: "tháng 3", desktop: 237, mobile: 120 },
    { month: "tháng 4", desktop: 73, mobile: 190 },
    { month: "tháng 5", desktop: 209, mobile: 130 },
    { month: "tháng 6", desktop: 214, mobile: 140 },
    { month: "tháng 7", desktop: 221, mobile: 111 },
    { month: "tháng 8", desktop: 312, mobile: 151 },
    { month: "tháng 9", desktop: 201, mobile: 201 },
    { month: "tháng 10", desktop: 199, mobile: 147 },
    { month: "tháng 11", desktop: 312, mobile: 60 },
    { month: "tháng 12", desktop: 214, mobile: 254 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export default function ProductSaleChart() {
    return (
        <div className="p-2">
            <Card>
                <CardHeader>
                    <CardTitle>Doanh số bán sản phần</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent >
                    <ChartContainer className="h-70 w-full" config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip
                                cursor
                                content={<ChartTooltipContent />}
                            />
                            <Line
                                dataKey="desktop"
                                type="linear"
                                stroke="var(--color-desktop)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-desktop)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                            <Line
                                dataKey="mobile"
                                type="linear"
                                stroke="var(--color-mobile)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-mobile)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
