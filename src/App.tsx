import { MainContextProvider } from "./context/Context";
import BasicModal from "./components/Pop-up";
import Header from './pages/Header';


const App = () => {
  return (
    <MainContextProvider>
      <div className="App">
        <Header />
      </div>
      <BasicModal />
    </MainContextProvider>
  )
}

export default App