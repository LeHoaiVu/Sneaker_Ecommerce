import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as Yup from 'yup';
import { HOME_PAGE } from '../../../configs/routeConfig';
import { useFocus } from '../../../hooks/useFocus';
import * as globalActions from '../../../redux/actions/globalActions';
import BrowserStoreService, {
    BROWSER_KEY,
} from '../../../shared/services/browserStoreServices';
import * as actions from './redux/actions';
import { loginSelector } from './redux/selector';

const LoginPage = (props) => {
    const {
        loginAccount,
        userInfo: { error, userInfo = {}, access_token } = {},
        history,
        getUserInfo,
    } = props;
    const formik = useFormik({
        initialValues: {
            // full_name: '',
            email: '',
            password: '',
            // confirm_password: '',
        },
        validationSchema: Yup.object({
            // full_name: Yup.string()
            //     .min(2, 'Mininum 2 characters')
            //     .max(15, 'Maximum 15 characters')
            //     .required('Required!'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Required!'),
            password: Yup.string()
                .min(8, 'Minimum 8 characters')
                .required('Required!'),
            // confirm_password: Yup.string()
            //     .oneOf([Yup.ref('password')], "Password's not match")
            //     .required('Required!'),
        }),
        onSubmit: (values) => {
            // console.log(values);
            loginAccount(values);
            // console.log(JSON.stringify(values, null, 2));
            // dispatch(login(values));
            // console.log('dataLogin', dataLogin);
        },
    });
    useEffect(() => {
        if (userInfo && userInfo._id) {
            history.push(HOME_PAGE);
            BrowserStoreService.setBrowserData(
                BROWSER_KEY.ACCESS_TOKEN,
                access_token
            );
            BrowserStoreService.setBrowserData(BROWSER_KEY.USER_INFO, userInfo);
            getUserInfo(userInfo);
        }
    }, [userInfo._id]);

    useFocus('email-input');

    return (
        <div className="login-page">
            <img
                className="login-img"
                src="https://source.unsplash.com/random"
            />
            <div className="login-page-form">
                <div className="login-page-form-title">Sign in</div>
                <form onSubmit={formik.handleSubmit}>
                    {/* <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.full_name &&
                            formik.touched.full_name && (
                                <p>{formik.errors.full_name}</p>
                            )}
                    </div> */}
                    <div>
                        <div className="login-form-item">
                            <span>Email</span>
                            <input
                                className="input-field"
                                id="email-input"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.email ? (
                            <div className="error-msg">
                                {formik.errors.email &&
                                    formik.touched.email && (
                                        <p>{formik.errors.email}</p>
                                    )}
                            </div>
                        ) : (
                            <div className="error-msg"></div>
                        )}
                    </div>
                    <div>
                        <div className="login-form-item">
                            <span>Password</span>
                            <input
                                className="input-field"
                                id="password-input"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.password ? (
                            <div className="error-msg">
                                {formik.errors.password &&
                                    formik.touched.password && (
                                        <p>{formik.errors.password}</p>
                                    )}
                            </div>
                        ) : (
                            <div className="error-msg"></div>
                        )}
                    </div>
                    {/* <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.confirm_password &&
                            formik.touched.confirm_password && (
                                <p>{formik.errors.confirm_password}</p>
                            )}
                    </div> */}
                    <div className="login-submit">
                        <button type="submit" className="login-submit-btn">
                            LOGIN
                        </button>
                    </div>
                    {error ? (
                        <div className="error-msg">
                            <p>{`${error}`}</p>
                        </div>
                    ) : (
                        <div className="error-msg"></div>
                    )}
                </form>
            </div>
        </div>
    );
};

const withLogin = compose(
    withRouter,
    connect(
        (state) => ({ userInfo: loginSelector(state) }),
        (dispatch) => ({
            loginAccount: (data) =>
                dispatch(actions.loginAccount.loginAccountRequest(data)),
            getUserInfo: (data) => dispatch(globalActions.getUserInfo(data)),
        })
    )
);

export default withLogin(LoginPage);
