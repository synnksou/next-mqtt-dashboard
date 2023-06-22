import mqtt from "mqtt"

import { ERRORS_TOAST, SUCCESS_TOAST } from "@/lib/error"

export const connectionToMqtt = async (
  setClient: Function,
  toast: Function
) => {
  try {
    //
    const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8)

    const mqttClient = mqtt.connect(
      "wss://3dbd3ae102d847199a686471afce2949.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "gogoB",
        password: "GvAdtQFVs.8bk2N",
        clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
        rejectUnauthorized: false,
      }
    )

    /*
    const mqttClient = mqtt.connect(
      "wss://3b5b91ea152d4e57ad9b34c41c75307a.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "efficomAntoineMqtt",
        password: "Password59@",
        clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
        rejectUnauthorized: false,
      }
    )
    */

    mqttClient.on("connect", () => {
      toast(SUCCESS_TOAST.login)
      console.log("connected to MQTT broker")
      mqttClient.subscribe("history", { qos: 1 })
      mqttClient.publish("history", `${clientId}: vient de se connecter`)
      setClient(mqttClient)
    })

    mqttClient.on("error", (e) => {
      toast(ERRORS_TOAST.timeout)

      console.log("Error", e)
    })

    mqttClient.on("disconnect", () => {
      console.log("Disconnected")
      mqttClient.publish("history", `${clientId}: vient de se déconnecter`)
      toast(ERRORS_TOAST.timeout)
    })
  } catch (error) {
    console.log("toto", error)
  }
}
