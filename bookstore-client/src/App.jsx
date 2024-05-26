import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import useOnline from './common/customhooks/useOnline'
import OfflinePage from './common/OfflinePage'
import { Provider } from "react-redux";
import appStore from './Stores/Store'

function App() {
  const isOnline = useOnline();
  return (
    
      <div className='min-h-screen'>
      {
        isOnline?(<div>
          <Provider store={appStore}>
      <Header/>
      <Outlet/>
      <Footer/>
      </Provider>
        </div>):(
      <OfflinePage/>
        )
      }
      
      </div>
  )
}

export default App
