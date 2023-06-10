"use client"

import { createContext, useContext, useState } from "react"
import { connectionToMqtt } from "@/services"
import { BaseLayoutProps } from "@/types"
import { useEffectOnce } from "react-use"

import { useToast } from "@/components/ui/use-toast"

interface MqttObject {
  on: (event: string, callback: (...args: any[]) => void) => void
  end: () => void
  subscribe: (topic: string) => void
  publish: (topic: string, message: string) => void
  connect: () => void
}

type SetClientFunction = (client: MqttObject | null) => void

type MqttContextType = {
  client?: MqttObject | null
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
    connectionToMqtt(setClient)
    toast({
      variant: "success",
      title: "Vous etes connectez.",
      description: "T'es un gigabogoss",
    })
    return () => {
      if (client) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
        client?.end()
      }
    }
  })

  return (
    <Context.Provider value={{ client, setClient }}>
      {children}
    </Context.Provider>
  )
}

export const useMqtt = () => useContext(Context)
