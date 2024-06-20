import Content from "../components/Content"
import Header from "../components/Header"
import Categories from "../components/Categories"
import Cart from "../components/Cart"
import { Provider } from "./Context"


function App() {

  return (
    <div className="App">
      <Provider>
        <Header />
        <Categories />
        <Content />
        <Cart />
      </Provider>
    </div>
  )
}

export default App
