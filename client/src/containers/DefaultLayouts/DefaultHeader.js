import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import {
    HOME_PAGE,
    LOGIN_PAGE,
    MEN_SHOES_PAGE,
    MY_SHOP,
    MY_SHOPING_CART,
    REGISTER_PAGE,
} from '../../configs/routeConfig';
import {
    Link as RouterLink,
    withRouter,
    NavLink,
    useLocation,
} from 'react-router-dom';
import { Link } from '@mui/material';
import * as loginActions from '../Pages/Login/redux/actions';
import BrowserStoreService from '../../shared/services/browserStoreServices';
import { userInfoSelector } from '../../redux/selectors';
import * as globalActions from '../../redux/actions/globalActions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const drawerWidth = 240;

const DefaultHeader = (props) => {
    const {
        window,
        history,
        userInfo = {},
        loginAccountClear,
        userInfoClear,
    } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //checkLogin
    const isLogin = !!userInfo._id;

    //check path
    const current_path = useLocation();

    const handleLogout = useCallback(() => {
        loginAccountClear();
        userInfoClear();
        BrowserStoreService.clearAllBrowserData();
        history.push(HOME_PAGE);
    }, [loginAccountClear, history]);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                SNEAKER ECOMMERCE
            </Typography>
            <Divider />
            <List>
                <NavLink to={`${HOME_PAGE}`}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="HOME" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to={`${MEN_SHOES_PAGE}`}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="MEN" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to={`${REGISTER_PAGE}`}>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary="REGISTER" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                {isLogin ? (
                    <>
                        <NavLink to={`${HOME_PAGE}`} onClick={handleLogout}>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary="LOGOUT" />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        {userInfo && userInfo.role === 'seller' && (
                            <NavLink to={`${MY_SHOP}${userInfo._id}`}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        sx={{ textAlign: 'center' }}
                                    >
                                        <ListItemText primary="MY STORE" />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        )}
                    </>
                ) : (
                    <NavLink to={`${LOGIN_PAGE}`}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="LOGIN" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                )}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <Link
                            sx={{ marginRight: '15px', textDecoration: 'none' }}
                            to={`${HOME_PAGE}`}
                            variant="h6"
                            component={RouterLink}
                        >
                            SNEAKER ECOMMERCE
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link
                            sx={{ marginRight: '15px', textDecoration: 'none' }}
                            to={`${HOME_PAGE}`}
                            variant="button"
                            component={RouterLink}
                        >
                            Home
                        </Link>
                        <Link
                            sx={{ marginRight: '15px', textDecoration: 'none' }}
                            to={`${MEN_SHOES_PAGE}`}
                            variant="button"
                            component={RouterLink}
                        >
                            Men
                        </Link>
                        <Link
                            sx={{ marginRight: '15px', textDecoration: 'none' }}
                            to={`${REGISTER_PAGE}`}
                            variant="button"
                            component={RouterLink}
                        >
                            Register
                        </Link>
                        {isLogin ? (
                            <>
                                <Link
                                    to={`${HOME_PAGE}`}
                                    onClick={handleLogout}
                                    variant="button"
                                    component={RouterLink}
                                    sx={{
                                        marginRight: '15px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    LOGOUT
                                </Link>
                                {userInfo && userInfo.role === 'seller' && (
                                    <Link
                                        to={`${MY_SHOP}${userInfo._id}`}
                                        variant="button"
                                        component={RouterLink}
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        MY STORE
                                    </Link>
                                )}
                                <Link
                                    to={`${MY_SHOPING_CART}${userInfo._id}`}
                                    variant="button"
                                    component={RouterLink}
                                    className={`badge ${
                                        current_path.pathname === '/checkout'
                                            ? 'hidden'
                                            : ''
                                    }`}
                                >
                                    <IconButton
                                        aria-label="cart"
                                        className="header-menu-badge-button"
                                    >
                                        <Badge
                                            badgeContent={userInfo.cart.reduce(
                                                (sum, next) => {
                                                    return (
                                                        sum + next.prodNumber
                                                    );
                                                },
                                                0
                                            )}
                                            color="secondary"
                                            className="header-menu-badge-icon"
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </Link>
                            </>
                        ) : (
                            <Link
                                to={`${LOGIN_PAGE}`}
                                variant="button"
                                component={RouterLink}
                                sx={{ textDecoration: 'none' }}
                            >
                                LOGIN
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
};

const withHeader = compose(
    withRouter,
    connect(
        (state) => ({
            userInfo: userInfoSelector(state),
        }),
        (dispatch) => ({
            loginAccountClear: () =>
                dispatch(loginActions.loginAccount.loginAccountClear()),
            userInfoClear: () => dispatch(globalActions.logout()),
        })
    )
);
export default withHeader(DefaultHeader);
