import { ReactNode } from "react"

export interface DashboardItem {
  celcius: number
  airQuality: number | string
  countPerson: number
  index: number
  value: string
}

export interface BaseLayoutProps {
  children?: ReactNode
}
