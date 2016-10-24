import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <div className='content'>
        {children}
      </div>
      <footer>
        Proudly brought to you by <a href="https://github.com/shuttleql">ShuttleQL</a>
      </footer>
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.object
};

export default App;
