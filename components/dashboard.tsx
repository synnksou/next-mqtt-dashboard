"use client"

import React from "react"

import DashboardPage from "./dashboard-page"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

const FAKE_DATA = [
  {
    tabName: "room_1",
  },
  {
    tabName: "room_2",
  },
  {
    tabName: "room_3",
  },
]

const Dashboard = () => {
  const data = FAKE_DATA ?? []

  return (
    <Tabs defaultValue={FAKE_DATA[0].tabName} className="space-y-4">
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
      {data?.map(({ tabName }, index) => (
        <DashboardPage key={index} value={tabName} />
      ))}
    </Tabs>
  )
}

export default Dashboard
