import { connectionToMqtt } from "@/services"
import { assert, describe, it } from "vitest"

import { cn, formatDate } from "@/lib/utils"

describe("ConnectionToMqtt Test", () => {
  it("Connection", () => {
    connectionToMqtt(
      () => {},
      () => {}
    )
  })
})

describe("Format Date Test", () => {
  it("Format Date", () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    assert.equal(`${day}/${month}/${year}`, formatDate(date))
  })
})

describe("Tailwind Merge Test", () => {
  it("Tailwind Merge", () => {
    const test = cn("-m-1", "p-1", "bg-white", "text-black")
    assert.equal("-m-1 p-1 bg-white text-black", test)
  })
})
