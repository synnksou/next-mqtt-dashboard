import { render, screen } from "@testing-library/react"

import { SiteHeader } from "@/components/site-header"

describe("App", () => {
  it("renders headline", () => {
    const { getByText } = render(<SiteHeader />)
    const headline = getByText(/Home/i)
    expect(headline).toBeInTheDocument()
  })
})
