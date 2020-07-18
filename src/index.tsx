import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { APP_CONFIG } from './app-config';
import { createMuiTheme, CssBaseline, ThemeProvider } from './components';
import { DarkTheme } from './themes';

const theme = createMuiTheme(DarkTheme);

function RenderApp() {
  document.documentElement.setAttribute('orangefox-version', APP_CONFIG.version);

  return (<>
    {/* <React.StrictMode> TODO: Remove this once Material React fixes "findDomNode" bug */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </>);
}

ReactDOM.render(<RenderApp />, document.getElementById('root'));
