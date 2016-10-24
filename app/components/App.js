import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    {children}
    <footer>
      Proudly brought to you by <a href="https://github.com/shuttleql">ShuttleQL</a>
    </footer>
  </div>
)

App.propTypes = {
  children: PropTypes.object
};

export default App;
