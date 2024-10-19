import React from "react"
import "./App.css"
import { Layout } from "./components/Layout"
import { useInitialize } from "./hooks/useInitialize"
import { Tab } from "./components/Tab"

const App: React.FC = () => {
  const initialize = useInitialize()

  initialize()

  return (
    <>
      <Layout>
        <Tab/>
      </Layout>
    </>
  )
}

export default App