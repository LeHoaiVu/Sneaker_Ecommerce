import React, { useEffect } from 'react';
import DefaultHeader from './DefaultHeader';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import DefaultFooter from './DefaultFooter';
import { routes } from '../../routes';

const DefaultLayout = () => {
    const currentPath = useLocation();

    return (
        <BrowserRouter>
            <DefaultHeader />
            <div className="app-content">
                <Switch>
                    {routes.map(
                        (route, idx) =>
                            route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) => {
                                        return <route.component {...props} />;
                                    }}
                                />
                            )
                    )}
                </Switch>
            </div>
            <DefaultFooter />
        </BrowserRouter>
    );
};

export default DefaultLayout;
