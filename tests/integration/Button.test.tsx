import { render, screen } from "@testing-library/react"

import { Button } from "@/components/ui/button"

describe("Button Component", () => {
  it("renders basic Button", () => {
    render(<Button />)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toBeInTheDocument()
  })

  it("renders Button with different variant and size", () => {
    render(<Button variant="destructive" size="lg" />)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toHaveClass(
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11 px-8 rounded-md"
    )
  })
})
