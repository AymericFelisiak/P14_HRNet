import './style/sass/style.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import EmployeeList from './pages/employee-list/EmployeeList';
import { fetchEmployeeData } from './store/EmployeeSlice';
import { useDispatch } from 'react-redux';

function App() {

  // const dispatch = useDispatch();
  // dispatch(fetchEmployeeData());

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
