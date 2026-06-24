"use client"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChartUpIcon, ChartDownIcon, RoboticIcon, CheckmarkCircle01Icon, PieChartIcon } from "@hugeicons/core-free-icons"

export function ModelSectionCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 px-4 lg:px-6">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Model used :</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        <div className="line-clamp-1 flex gap-3 font-medium">
                            Qwen-3.5{" "}
                            <HugeiconsIcon icon={RoboticIcon} strokeWidth={2} className="size-8" />
                        </div>
                    </CardTitle>
                    <CardAction>
                        <Badge variant="default">
                            <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={3} />
                            Online
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Trending up this month{" "}
                        <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        9B - Version of the model
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Template (Dataset  ) :</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        75
                    </CardTitle>
                    <CardAction>
                        <Badge variant="default">
                            <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={3} />
                            Active
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        60 Theme-locked - 15 Theme-Free{" "}
                        <HugeiconsIcon icon={PieChartIcon} strokeWidth={2} className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        The dataset used for training the model
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
