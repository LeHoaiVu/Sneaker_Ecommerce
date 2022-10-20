import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    useLocation,
    Switch,
    BrowserRouter,
    HashRouter,
} from 'react-router-dom';
import $ from 'jquery';
import { createBrowserHistory } from 'history';
import { BreakpointProvider } from 'react-socks';
import DefaultLayout from './containers/DefaultLayouts/DefaultLayout';
import configureStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const history = createBrowserHistory();

const { store, persistor } = configureStore();
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {
    useEffect(() => {
        /* Define 'vh' variable in css */
        const setVHCss = () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        //Onload
        window.onload = setVHCss;
        //Resize
        window.addEventListener('resize', setVHCss);
        return () => {
            window.removeEventListener('resize', setVHCss);
        };
    }, []);

    return (
        <>
            {/* <ReduxProvider store={store} history={history}> */}
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <BrowserRouter history={history}>
                            <ScrollToTop />
                            <Switch>
                                <Route
                                    path="/"
                                    name="Home"
                                    component={DefaultLayout}
                                />
                            </Switch>
                        </BrowserRouter>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
            {/* </ReduxProvider> */}
        </>
    );
};

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        $([document.documentElement, document.body]).animate(
            {
                scrollTop: 0,
            },
            500
        );
    }, [pathname]);

    return null;
};

export default App;
