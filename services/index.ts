import mqtt from "mqtt"

export const connectionToMqtt = async (setClient: Function) => {
  try {
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

    mqttClient.on("connect", () => {
      console.log("connected to MQTT broker")
      mqttClient.subscribe("history", { qos: 1 })
      mqttClient.publish("history", `${clientId}: vient de se connecter`)
      setClient(mqttClient)
    })

    mqttClient.on("error", (e) => {
      console.log("Error", e)
    })

    mqttClient.on("disconnect", () => {
      console.log("Disconnected")
      mqttClient.publish("history", `${clientId}: vient de se déconnecter`)
    })
  } catch (error) {
    console.log(error)
  }
}
