/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable react/no-unescaped-entities */

import { useCallback, useState } from "react"
import { useMqtt } from "@/context/MqttProvider"
import { Thermometer, User, Wind } from "lucide-react"
import { useDeepCompareEffect, useEffectOnce } from "react-use"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { DashboardItem, GraphData } from "@/types/index"

import ClimButton from "./ClimButton"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TabsContent } from "./ui/tabs"

const LIMIT_PER_ROOM = 200

const DashboardPage = ({ value }: DashboardItem) => {
  const [airQuality, setAirQuality] = useState<number | null>()
  const [celcius, setCelcius] = useState<number | null>()
  const [countPerson, setCountPerson] = useState<number | null>()
  const [graphData, setGraphData] = useState<GraphData[]>([])

  const { client } = useMqtt()

  const handleMqttMessage = useCallback(
    (topic: string, message: string) => {
      switch (topic) {
        case `${value}/CO2`:
          setAirQuality(parseFloat(message))
          break
        case `${value}/temperature`:
          setCelcius(parseFloat(message))
          break
        case `${value}/number_of_people`:
          setCountPerson(parseInt(message))
          break
        default:
          break
      }
    },
    [value]
  )

  useDeepCompareEffect(() => {
    if (client) {
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
  }, [{ client, handleMqttMessage, value }])

  useDeepCompareEffect(() => {
    if (graphData.length > 10) {
      setGraphData((prev) => prev.slice(1))
      setGraphData((prevData) => [
        ...prevData,
        {
          name: new Date().toLocaleTimeString(),
          airQuality: airQuality || 0,
          celcius: celcius || 0,
          countPerson: countPerson || 0,
        },
      ])
    } else {
      setGraphData((prevData) => [
        ...prevData,
        {
          name: new Date().toLocaleTimeString(),
          airQuality: airQuality || 0,
          celcius: celcius || 0,
          countPerson: countPerson || 0,
        },
      ])
    }
  }, [airQuality, celcius, countPerson])

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
          </CardContent>
        </Card>
        <Card className={celcius && celcius > 30 ? "bg-red-500" : ""}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Température</CardTitle>
            <Thermometer className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{celcius || "No data"}</div>
            <ClimButton value={value} />
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
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-8 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Degres / Nombre de personne</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width={600} height={400}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="celcius" stroke="#82ca9d" />
                <Line type="monotone" dataKey="countPerson" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}

export default DashboardPage
