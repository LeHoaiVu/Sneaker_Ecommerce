import * as React from 'react';
import { useCallback } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { style } from './styles';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideRegisterModal } from './redux/actions';
import { modalState } from './redux/selectors';
import {
    HOME_PAGE,
    LOGIN_PAGE,
    REGISTER_PAGE,
} from '../../../configs/routeConfig';
import * as actions from '../../../containers/Pages/Register/redux/actions';
import { registerSelector } from '../../../containers/Pages/Register/redux/selector';

const RegisterPopup = (props) => {
    const {
        hideRegisterPopup,
        registerState,
        history,
        registerAccountClear,
        registerData: { error: checkEmailExist, newUser } = {},
    } = props;

    const handleClose = useCallback(() => {
        hideRegisterPopup();
        if (newUser) {
            history.push(LOGIN_PAGE);
        }
        registerAccountClear();
    }, [hideRegisterPopup, registerAccountClear, history, newUser]);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={registerState.isShowRegister}
                disableBackdropClick
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={registerState.isShowRegister}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {`${checkEmailExist ? 'Email has been used' : ''} ${
                                newUser ? 'Account is signed up' : ''
                            }`}
                        </Typography>
                        <Button onClick={handleClose}>OK</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

const withRegisterPopup = compose(
    withRouter,
    connect(
        (state) => ({
            registerState: modalState(state),
            registerData: registerSelector(state),
        }),
        (dispatch) => ({
            hideRegisterPopup: () => dispatch(hideRegisterModal()),
            registerAccountClear: () =>
                dispatch(actions.registerAccount.registerAccountClear()),
        })
    )
);

export default withRegisterPopup(RegisterPopup);
