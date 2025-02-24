
import './App.css'
import Content from './Components/Content'
import Header from './Components/Header'

function App() {

  return (
    <>
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header />
        <Content />
      </div>
    </>
  )
}

export default App
