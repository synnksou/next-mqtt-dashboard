import React, { useState } from "react"
import { useMqtt } from "@/context/MqttProvider"

import { Button } from "./ui/button"

const ClimButton = ({ value }: { value: string }) => {
  const { client } = useMqtt()
  const [isClimOn, setIsClimOn] = useState(false)

  const toggleClim = () => {
    setIsClimOn((prevValue) => !prevValue)
    const message = isClimOn ? "off" : "on"
    if (!client) return console.log("no client")
    client.publish(`${value}/clim`, message)
    console.log("publish", message)
    console.log({ isClimOn })
  }

  return (
    <Button onClick={toggleClim}>
      {isClimOn ? "Éteindre la clim" : "Allumer la clim"}
    </Button>
  )
}

export default ClimButton
