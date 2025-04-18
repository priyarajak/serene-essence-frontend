import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppContent from './AppContent'; // 👈 New component with useSelector etc

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
