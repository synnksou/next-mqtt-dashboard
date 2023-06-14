/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react"
import { useMqtt } from "@/context/MqttProvider"
import { Thermometer, User, Wind } from "lucide-react"
import { useDeepCompareEffect, useEffectOnce } from "react-use"

import { DashboardItem } from "@/types/index"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TabsContent } from "./ui/tabs"

const LIMIT_PER_ROOM = 200

const DashboardPage = ({ value }: DashboardItem) => {
  const [airQuality, setAirQuality] = useState<number | null>()
  const [celcius, setCelcius] = useState<number | null>()
  const [countPerson, setCountPerson] = useState<number | null>()
  const { client } = useMqtt()

  useDeepCompareEffect(() => {
    const handleMqttMessage = (topic: string, message: string) => {
      console.log("handle", topic, message)
      if (topic === `${value}/CO2`) {
        setAirQuality(parseFloat(message))
      } else if (topic === `${value}/temperature`) {
        setCelcius(parseFloat(message))
      } else if (topic === `${value}/number_of_people`) {
        setCountPerson(parseInt(message))
      }
    }

    if (client) {
      console.log("subscribe")
      client.subscribe(`#`)
      client.subscribe(`${value}/CO2`)
      client.subscribe(`${value}/temperature`)
      client.subscribe(`${value}/number_of_people`)
      client.publish("room_1/temperature", "12")

      client.on("message", handleMqttMessage)
    }

    return () => {
      if (client) {
        client.off("message", handleMqttMessage)
      }
    }
  }, [{ client, value }])

  return (
    <TabsContent value={value} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Qualité de l'air
            </CardTitle>
            <Wind className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{airQuality || "No data"}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Température</CardTitle>

            <Thermometer className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{celcius || "No data"} </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              N de personnes
            </CardTitle>
            <User className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {countPerson || "No data"} / {LIMIT_PER_ROOM}
            </div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        {/*  <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                <Activity className="w-4 h-4 text-muted-foreground" />
            
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card> */}
      </div>
      {/*    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
                                <Overview />
            
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent><RecentSales /> </CardContent>
        </Card>
      </div> */}
    </TabsContent>
  )
}

export default DashboardPage
