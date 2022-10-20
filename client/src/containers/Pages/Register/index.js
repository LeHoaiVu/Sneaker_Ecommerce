import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as Yup from 'yup';
import RegisterPopup from '../../../components/Modals/PopupRegister';
import { showRegisterModal } from '../../../components/Modals/PopupRegister/redux/actions';
import { useFocus } from '../../../hooks/useFocus';
import * as actions from './redux/actions';
import { registerSelector } from './redux/selector';

const RegisterPage = (props) => {
    const {
        createAccount,
        history,
        registerData: { error, newUser } = {},
        openRegisterPopup,
    } = props;

    useEffect(() => {
        if ((newUser && newUser._id) || error) {
            openRegisterPopup();
        }
    }, [newUser, error, openRegisterPopup]);

    const formik = useFormik({
        initialValues: {
            // full_name: '',
            email: '',
            username: '',
            role: '',
            password: '',
            password_confirm: '',
        },
        validationSchema: Yup.object({
            // full_name: Yup.string()
            //     .min(2, 'Mininum 2 characters')
            //     .max(15, 'Maximum 15 characters')
            //     .required('Required!'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Required!'),
            role: Yup.string().required('Please select a role'),
            password: Yup.string()
                .min(8, 'Minimum 8 characters')
                .required('Required!'),
            password_confirm: Yup.string()
                .required('Required!')
                .oneOf([Yup.ref('password')], "Password's not match"),
            username: Yup.string()
                .min(2, 'Mininum 2 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required!'),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            createAccount(values);
            // console.log(JSON.stringify(values, null, 2));
            resetForm();
        },
    });

    useFocus('email-input');

    return (
        <div className="register-page">
            <img
                className="register-img"
                src="https://source.unsplash.com/random"
            />
            <div className="register-page-form">
                <div className="register-page-form-title">Sign up</div>
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
                        <div className="register-form-item">
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
                        <div className="register-form-item">
                            <span>User Name</span>
                            <input
                                className="input-field"
                                id="username-input"
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.username ? (
                            <div className="error-msg">
                                {formik.errors.username &&
                                    formik.touched.username && (
                                        <p>{formik.errors.username}</p>
                                    )}
                            </div>
                        ) : (
                            <div className="error-msg"></div>
                        )}
                    </div>
                    <div>
                        <div className="register-form-item">
                            <span>Role</span>
                            <select
                                className="input-field"
                                id="role-input"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ display: 'block' }}
                            >
                                <option value="" label="Select a role">
                                    Select a role
                                </option>
                                <option value="seller" label="Seller">
                                    Seller
                                </option>
                                <option value="customer" label="Customer">
                                    Customer
                                </option>
                            </select>
                        </div>
                        {formik.errors.role ? (
                            <div className="error-msg">
                                {formik.errors.role && formik.touched.role && (
                                    <p>{formik.errors.role}</p>
                                )}
                            </div>
                        ) : (
                            <div className="error-msg"></div>
                        )}
                    </div>
                    <div>
                        <div className="register-form-item">
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
                    <div>
                        <div className="register-form-item">
                            <span>Confirm Password</span>
                            <input
                                className="input-field"
                                id="confirm-password-input"
                                type="password"
                                name="password_confirm"
                                value={formik.values.password_confirm}
                                onChange={formik.handleChange}
                            />
                        </div>
                        {formik.errors.password_confirm ? (
                            <div className="error-msg">
                                {formik.errors.password_confirm &&
                                    formik.touched.password_confirm && (
                                        <p>{formik.errors.password_confirm}</p>
                                    )}
                            </div>
                        ) : (
                            <div className="error-msg"></div>
                        )}
                    </div>
                    <div className="register-btn-group">
                        <div className="register-submit">
                            <button
                                type="submit"
                                className="register-submit-btn"
                            >
                                SIGN UP
                            </button>
                        </div>
                        <div className="register-reset">
                            <button
                                className="register-reset-btn"
                                type="reset"
                                onClick={(e) => formik.resetForm()}
                            >
                                RESET
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <RegisterPopup />
        </div>
    );
};
const withRegisterPage = compose(
    withRouter,
    connect(
        (state) => ({ registerData: registerSelector(state) }),
        (dispatch) => ({
            openRegisterPopup: () => dispatch(showRegisterModal()),
            createAccount: (data) =>
                dispatch(actions.registerAccount.registerAccountRequest(data)),
        })
    )
);
export default withRegisterPage(RegisterPage);
