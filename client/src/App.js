import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Container from 'react-bootstrap/Container';
import { setAuth } from './redux/actions/authActions';
import Loader from './components/Loader/index';
import NotFound from './components/NotFound';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// Loading all components lazy loading so that we can eliminate all components to load at once, This will reducer our bundle main.js file and speed up app to load initial page fast.
const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./components/Login'));
const Orders = lazy(() => import('./components/Orders'));

const App = () => {
  // Using  useAuth custom hook to authenticate firebase users on page load
  const { currentUser, loading } = useAuth();
  const reduxDispatch = useDispatch();

  useEffect(() => {
    // Checking if currentUser is available from useAuth hook and saving it to redux store
    if (currentUser) {
      reduxDispatch(setAuth(currentUser));
    }
  }, [currentUser, reduxDispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Container>
          <Router>
            <Header />
            {!loading ? (
              <Switch>
                <Route path='/' exact component={Login} />
                <ProtectedRoute exact path='/orders' component={Orders} />
                <Route component={NotFound} />
              </Switch>
            ) : (
              <Loader />
            )}
          </Router>
        </Container>
      </Suspense>
      <NotificationContainer />
    </>
  );
};

export default App;
