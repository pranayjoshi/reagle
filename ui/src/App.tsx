import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Chat from './layout/chat'
import Username from './layout/username'
import Room from './components/Room';

function App() {
  return (
    <div className="App dark:bg-gray-900 bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Username />} />
          <Route path="/room" element={<Chat />} />
          <Route path="/room/:roomID" element={<Room/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;