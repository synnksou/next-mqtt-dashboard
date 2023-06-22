"use client"

import { createContext, useContext, useState } from "react"
import { connectionToMqtt } from "@/services"
import { BaseLayoutProps } from "@/types"
import { useEffectOnce } from "react-use"

import { ERRORS_TOAST, SUCCESS_TOAST } from "@/lib/error"
import { useToast } from "@/components/ui/use-toast"

interface MqttObject {
  off(arg0: string, callback: (topic: any, message: any) => void): unknown
  on: (event: string, callback: (...args: any[]) => void) => void
  end: () => void
  subscribe: (topic: string) => void
  unsubscribe: (topic: string) => void
  publish: (topic: string, message: string, options?: any) => void
  connect: () => void
}

type SetClientFunction = (client: MqttObject | null) => void

type MqttContextType = {
  client?: MqttObject | undefined | null
  setClient?: SetClientFunction | undefined | null
}

const initialState: MqttContextType = {
  client: null,
  setClient: null,
}

const Context = createContext(initialState)

export const MqttProvider = ({ children }: BaseLayoutProps) => {
  const [client, setClient] = useState<MqttObject | null>(null)
  const { toast } = useToast()

  useEffectOnce(() => {
    connectionToMqtt(setClient, toast)

    return () => {
      if (client) {
        toast(ERRORS_TOAST.timeout)
        client.end()
      }
    }
  })

  return (
    <Context.Provider value={{ client, setClient }}>
      {children}
    </Context.Provider>
  )
}

export const useMqtt = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useMqtt must be used within a MqttProvider")
  }

  return context
}
