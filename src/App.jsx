
import './App.css'
import Content from './Components/Content'
import Header from './Components/Header'
// Context wrapper
import MediaCtxProvider from './context/MediaContext'

function App() {

  return (
    <>
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <MediaCtxProvider>
            <Content />
          </MediaCtxProvider>
      </div>
    </>
  )
}

export default App
