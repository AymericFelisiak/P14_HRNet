import './style/sass/style.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import EmployeeList from './pages/employee-list/EmployeeList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/employee-list" element={<EmployeeList />}/>
      </Routes>
    </div>
  );
}

export default App;
