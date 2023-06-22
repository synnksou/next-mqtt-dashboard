import { ReactNode } from "react"

export interface DashboardItem {
  value: string
}

export interface BaseLayoutProps {
  children?: ReactNode
}

export interface GraphData {
  name: string
  airQuality?: number
  celcius?: number
}
