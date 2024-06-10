import Content from "../components/Content"
import Header from "../components/Header"
import Categories from "../components/Categories"
import { Provider } from "./Context"


function App() {

  return (
    <div className="App">
      <Provider>
        <Header />
        <Categories />
        <Content />
      </Provider>
    </div>
  )
}

export default App
