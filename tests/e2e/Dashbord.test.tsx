import { expect, test } from "@playwright/test"

test("Dashboard Cinema", async ({ page }) => {
  await page.goto("http://localhost:3000")

  const title = await page.textContent("h1")
  expect(title).toBe("Dashboard Cinema")

  await page.click("text=room_2")

  const isRoom2Displayed = await page.isVisible("text=room_2")
  expect(isRoom2Displayed).toBe(true)

  await page.click("text=Allumer la clim")

  await page.waitForSelector("text=Éteindre la clim")

  const buttonText = await page.textContent("text=Éteindre la clim")
  expect(buttonText).toBe("Éteindre la clim")
  await page.click("text=Éteindre la clim")
})
