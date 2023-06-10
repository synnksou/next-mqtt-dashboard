"use client"

import { FunctionComponent, createContext, useContext, useState } from "react"
import { BaseLayoutProps } from "@/types"

type MqttContextType = {
  client?: null | any
  setClient?: Function | undefined | null
}

const initialState: MqttContextType = {
  client: null,
  setClient: null,
}

const Context = createContext(initialState)

export const MqttProvider = ({ children }: BaseLayoutProps) => {
  const [client, setClient] = useState(null)
  return (
    <Context.Provider value={{ client, setClient }}>
      {children}
    </Context.Provider>
  )
}

export const useMqtt = () => useContext(Context)
