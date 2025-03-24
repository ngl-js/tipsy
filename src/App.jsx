import './App.css'
// Components
import Content from './Components/Content'
import Header from './Components/Header'
import Loader from './Components/Loader'
// Context wrapper
import MediaCtxProvider from './context/MediaContext'

function App() {

  return (<>
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header />
      <MediaCtxProvider>
        <Loader />
        <Content />
      </MediaCtxProvider>
    </div>
  </>)
}

export default App
