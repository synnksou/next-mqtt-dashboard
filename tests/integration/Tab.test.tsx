import { fireEvent, render, waitFor } from "@testing-library/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

describe("Tabs Component", () => {
  it("renders correctly and can switch tabs", async () => {
    const { getByText, queryByText } = render(
      <Tabs defaultValue="tab1" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </TabsList>
      </Tabs>
    )

    // Vérifie que le premier onglet est sélectionné au départ
    expect(getByText("Tab 1")).toHaveAttribute("aria-selected", "true")
    expect(getByText("Content 1")).toBeInTheDocument()
    expect(queryByText("Content 2")).not.toBeInTheDocument()

    // Clique sur le deuxième onglet
    //fireEvent.click(getByText("Tab 2"))
    fireEvent.click(getByText("Tab 2"))

    console.log(getByText("Tab 2"))
    // Utilise waitFor pour attendre que l'onglet 2 soit sélectionné
    await waitFor(() => {
      expect(getByText("Tab 2")).toHaveAttribute("aria-selected", "true")
      expect(queryByText("Content 1")).not.toBeInTheDocument()
      expect(getByText("Content 2")).toBeInTheDocument()
    })
  })
})
