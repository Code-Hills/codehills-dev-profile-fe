import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import routes from './pages';
import AppRoutes from './AppRoutes';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes routes={routes} />
      </Router>
    </Provider>
  );
};

export default App;
