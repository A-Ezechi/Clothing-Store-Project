import Content from "../components/Content"
import Header from "../components/Header"
import { Provider } from "./Context"


function App() {

  return (
    <div className="App">
      <Provider>
        <Header />
        <Content />
      </Provider>
    </div>
  )
}

export default App
