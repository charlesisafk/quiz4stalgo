
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PrivateRoute from './components/PrivateRoute';
import DetailScreen from './screens/DetailScreen';
import ProjectCreateScreen from './screens/ProjectCreateScreen';
import TaskCreateScreen from './screens/TaskCreateScreen';
import UserCreateScreen from './screens/UserCreateScreen';
import UserListScreen from './screens/UserListScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/project/:id' element={
                <PrivateRoute allowedRoles={['admin', 'manager', 'user']}>
                  <DetailScreen />
                </PrivateRoute>
              } />
              <Route path='/project/:id/createtask' element={
                <PrivateRoute allowedRoles={['admin', 'manager']}>
                  <TaskCreateScreen />
                </PrivateRoute>
              } />
              <Route path='/createproject' element={
                <PrivateRoute allowedRoles={['admin']}>
                  <ProjectCreateScreen />
                </PrivateRoute>
              } />
              <Route path='/createuser' element={
                <PrivateRoute allowedRoles={['admin']}>
                  <UserCreateScreen />
                </PrivateRoute>
              } />
              <Route path='/userlist' element={
                <PrivateRoute allowedRoles={['admin']}>
                  <UserListScreen />
                </PrivateRoute>
              } />
            </Routes>
          </Container>
        </main>
      <Footer />
    </Router>

  );
}

export default App;
