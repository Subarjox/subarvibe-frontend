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
import { ChartUpIcon, ChartDownIcon, RoboticIcon, Circle } from "@hugeicons/core-free-icons"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 px-4 lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Model used :</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <div className="line-clamp-1 flex gap-3 font-medium">
              Qwen-3.5-14b{" "}
              <HugeiconsIcon icon={RoboticIcon} strokeWidth={2} className="size-8" />
            </div>
          </CardTitle>
          <CardAction>
            <Badge variant="default">
              <HugeiconsIcon icon={Circle} strokeWidth={3} />
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
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Template (Dataset) :</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            73
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartDownIcon} strokeWidth={2} />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period{" "}
            <HugeiconsIcon icon={ChartDownIcon} strokeWidth={2} className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
