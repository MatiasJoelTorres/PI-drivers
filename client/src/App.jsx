import { Route, Routes, BrowserRouter} from 'react-router-dom'

import './App.css'

import Landing from './views/landing/Landing'
import Home from './views/home/Home'
import Detail from  './views/detail/Detail'
import Create from './views/create/Create'

function App() {
  

  return (
    <BrowserRouter>
      <div style={{height: '100%'}}>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route exact path='/home' element={<Home />} />
            <Route path='/home/:id' element={<Detail />} />
            <Route path='/create' element={<Create />} />
        </Routes>
      </div> 
    </BrowserRouter>
  )
}

export default App
