import 'materialize-css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {AuthContext} from './context/AuthContext';
import {useAuth} from './hooks/auth.hook';
import {useRoutes} from './routes';

function App() {
    const { login, logout, userId, token, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (ready === false) {
        return <div>loading...</div>
    }

    return (
          <AuthContext.Provider value={{
              token, userId, login, logout, isAuthenticated
          }}>
              <Router>
                  {isAuthenticated && <Navbar />}
                  <div className="container">
                      {routes}
                  </div>
              </Router>
          </AuthContext.Provider>
    );
};

export default App;
