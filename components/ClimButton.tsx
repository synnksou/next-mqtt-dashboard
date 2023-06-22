import React, { useEffect, useState } from "react"
import { useMqtt } from "@/context/MqttProvider"

import { Button } from "./ui/button"

const ClimButton = ({ value }: { value: string }) => {
  const { client } = useMqtt()
  const [isClimOn, setIsClimOn] = useState(false)

  useEffect(() => {
    if (!client) return

    const climTopic = `${value}/clim`

    const handleMqttMessage = (
      topic: string,
      message: { toString: () => string }
    ) => {
      if (topic === climTopic) {
        console.log("topic", topic, "message", message.toString())
        setIsClimOn(message.toString() === "on")
      }
    }

    client.subscribe(climTopic)
    client.on("message", handleMqttMessage)

    return () => {
      client.unsubscribe(climTopic)
      client.off("message", handleMqttMessage)
    }
  }, [client, value])

  const toggleClim = () => {
    setIsClimOn((prevValue) => !prevValue)
    const message = isClimOn ? "off" : "on"

    if (!client) return console.log("no client")
    console.log("publish", `${value}/clim`, message)
    client.publish(`${value}/clim`, message, { retain: true })
    // CE QUE TU RECOI C'EST SURMENT UN OBJET QUI EST DEJA LA AVEC LE RETAIN IL FAUT QUE TU REMETE  OFF QUAND TU RESET
  }

  return (
    <Button onClick={toggleClim}>
      {isClimOn ? "Éteindre la clim" : "Allumer la clim"}
    </Button>
  )
}

export default ClimButton
