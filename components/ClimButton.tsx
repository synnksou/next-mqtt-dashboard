import React, { useEffect, useState } from "react"
import { useMqtt } from "@/context/MqttProvider"

import { Button } from "./ui/button"

const ClimButton = ({ value }: { value: string }) => {
  const { client } = useMqtt()
  const [isClimOn, setIsClimOn] = useState(false)

  useEffect(() => {
    if (!client) return

    client.subscribe(`${value}/clim`)

    client.on("message", (topic, message) => {
      if (topic === `${value}/clim`) {
        setIsClimOn(message.toString() === "on")
      }
    })

    return () => {
      client.unsubscribe(`${value}/clim`)
    }
  }, [client, value])

  const toggleClim = () => {
    setIsClimOn((prevValue) => !prevValue)
    const message = isClimOn ? "off" : "on"

    if (!client) return console.log("no client")
    client.publish(`${value}/clim`, message, { retain: true })
  }

  return (
    <Button onClick={toggleClim}>
      {isClimOn ? "Éteindre la clim" : "Allumer la clim"}
    </Button>
  )
}

export default ClimButton
