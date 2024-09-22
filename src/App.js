import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Home from "./pages/admin/Home"
import UsersTable from "./pages/admin/UsersTable"
import JobsTable from "./pages/admin/JobsTable"
import CreateEvent from "./pages/admin/CreateEvent"
import CreateBlog from "./pages/admin/CreateBlog"
import BlogsTable from "./pages/admin/BlogsTable"
import EventsTable from "./pages/admin/EventsTable"
import JobSeekersTable from "./pages/admin/JobSeekersTable"
function App() {
  return (
    <div className="App">
<Routes>
<Route path="/" element={<Home/>} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/create-blog" element={<CreateBlog />} />
     <Route path="/create-event" element={<CreateEvent />} />
     <Route path="/users-table" element={<UsersTable />} />
     <Route path="/jobs-table" element={<JobsTable />} />
     <Route path="/events-table" element={<EventsTable />} />
     <Route path="/blogs-table" element={<BlogsTable />} />
     <Route path="/jobseekers-table" element={<JobSeekersTable />} />
</Routes>
    </div>
  );
}

export default App;
