"use client"

import React from "react"

import DashboardPage from "./dashboard-page"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

const FAKE_DATA = [
  {
    celcius: 23,
    airQuality: 12,
    countPerson: 2,
    tabName: "overview",
  },
  {
    celcius: 17,
    airQuality: 32,
    countPerson: 23,
    tabName: "gogo gros noob",
  },
]

const Dashboard = () => {
  const data = FAKE_DATA ?? []

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        {data?.map(({ tabName }) => (
          <TabsTrigger
            key={tabName}
            value={tabName}
            className="text-sm font-medium"
          >
            {tabName}
          </TabsTrigger>
        ))}
      </TabsList>
      {data?.map(({ celcius, airQuality, countPerson, tabName }, index) => (
        <DashboardPage
          key={index}
          celcius={celcius}
          airQuality={airQuality}
          countPerson={countPerson}
          index={index}
          value={tabName}
        />
      ))}
    </Tabs>
  )
}

export default Dashboard
