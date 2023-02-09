import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as Yup from 'yup';
import { address, phoneRegExp } from '../../../constants';
import { userInfoSelector } from '../../../redux/selectors';
import BrowserStoreService, {
    BROWSER_KEY,
} from '../../../shared/services/browserStoreServices';
import { getAddress } from '../../../ultilities/helpers';
import ListOrderedProducts from './components/ListOrderedProducts';

const CheckoutPage = (props) => {
    const { userInfo } = props;
    const [oderedShoes, setOderedShoes] = useState([]);
    const [isDisabledField, setIsDisabledField] = useState({
        isDisabledDistrict: true,
        isDisabledWard: true,
        isDisabledHouseNo: true,
    });

    const [addressData, setAddressData] = useState({
        province: [],
        district: [],
        ward: [],
    });

    useEffect(() => {
        let provinceTemp = [];

        address.forEach((addr) => provinceTemp.push(addr.name));
        setAddressData({ ...addressData, province: provinceTemp });

        setOderedShoes(
            BrowserStoreService.getBrowserData(BROWSER_KEY.ORDERED_SHOES)
        );
    }, []);

    const formik = useFormik({
        initialValues: {
            province: '',
            district: '',
            ward: '',
            houseNo: '',
            receiverName: userInfo.username,
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            province: Yup.string().required('Please select a provice/city'),
            district: Yup.string().required('Please select a district'),
            ward: Yup.string().required('Please select a ward'),
            houseNo: Yup.string().required('Please input sepcific address'),
            receiverName: Yup.string().required(
                'Please select a name of receiver'
            ),
            phoneNumber: Yup.string()
                .required('Please input your phone number')
                .matches(phoneRegExp, 'Phone number is not valid'),
        }),
        // onSubmit: (values, { resetForm }) => {
        //     console.log(values);
        //     resetForm();
        // },

        onSubmit: (values) => {
            console.log({ address: values, order_shoes: oderedShoes });
        },
    });

    //watch field changing
    const handleOnChange = (event) => {
        if (event.target.name === 'province') {
            setIsDisabledField({
                ...isDisabledField,
                isDisabledDistrict: false,
            });
            if (event.target.value === '') {
                setIsDisabledField({
                    ...isDisabledField,
                    isDisabledDistrict: true,
                });
            }
            if (event.target.value !== '') {
                const districtTemp = getAddress(
                    address,
                    `${event.target.value}`,
                    'children'
                );

                let districtNameTemp = [];
                districtTemp.children.forEach((distName) =>
                    districtNameTemp.push(distName.name)
                );

                setAddressData({
                    ...addressData,
                    district: districtNameTemp,
                });
            }
        }
        if (event.target.name === 'district') {
            setIsDisabledField({
                ...isDisabledField,
                isDisabledDistrict: false,
                isDisabledWard: false,
                isDisabledHouseNo: true,
            });
            if (event.target.value === '') {
                setIsDisabledField({
                    ...isDisabledField,
                    isDisabledWard: true,
                });
            }
            if (event.target.value !== '') {
                const wardTemp = getAddress(
                    address,
                    `${event.target.value}`,
                    'children'
                );

                let wardNameTemp = [];
                wardTemp.children.forEach((wardName) =>
                    wardNameTemp.push(wardName.name)
                );
                setAddressData({ ...addressData, ward: wardNameTemp });
            }
        }
        if (event.target.name === 'ward') {
            setIsDisabledField({
                ...isDisabledField,
                isDisabledDistrict: false,
                isDisabledWard: false,
                isDisabledHouseNo: false,
            });
            if (event.target.value === '') {
                setIsDisabledField({
                    ...isDisabledField,
                    isDisabledHouseNo: true,
                });
            }
        }
    };
    return (
        <div>
            <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <div className="delivery-address">
                    <div className="delivery-address__header"></div>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            mb: 2,
                            display: 'flex',
                            paddingTop: 3,
                            height: 'auto',
                        }}
                    >
                        <LocationOnIcon />
                        <Typography
                            sx={{
                                paddingLeft: 0.5,
                                paddingRight: 1,
                                fontSize: 12,
                                width: '13%',
                            }}
                        >
                            Delivery Address
                        </Typography>
                        <div className="delivery-address__form">
                            <div className="delivery-address__form-top">
                                <div>
                                    <div className="delivery-address__form-top-item">
                                        <span>Province/City</span>
                                        <select
                                            className="input-field"
                                            id="province-input"
                                            name="province"
                                            value={formik.values.province}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{ display: 'block' }}
                                        >
                                            <option
                                                value=""
                                                label="Select a provice/city"
                                            >
                                                Select a provice/city
                                            </option>
                                            {addressData.province.map(
                                                (prov) => (
                                                    <option
                                                        value={prov}
                                                        label={prov}
                                                        key={prov}
                                                    >
                                                        {prov}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    {formik.errors.province ? (
                                        <div className="error-msg">
                                            {formik.errors.province &&
                                                formik.touched.province && (
                                                    <p>
                                                        {formik.errors.province}
                                                    </p>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="error-msg"></div>
                                    )}
                                </div>
                                <div>
                                    <div className="delivery-address__form-top-item">
                                        <span>District</span>
                                        <select
                                            className="input-field"
                                            id="district-input"
                                            name="district"
                                            value={formik.values.district}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{ display: 'block' }}
                                            disabled={
                                                isDisabledField.isDisabledDistrict
                                            }
                                        >
                                            <option
                                                value=""
                                                label="Select a district"
                                            >
                                                Select a district
                                            </option>
                                            {addressData.district.map(
                                                (dist) => (
                                                    <option
                                                        value={dist}
                                                        label={dist}
                                                        key={dist}
                                                    >
                                                        {dist}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    {formik.errors.district ? (
                                        <div className="error-msg">
                                            {formik.errors.district &&
                                                formik.touched.district && (
                                                    <p>
                                                        {formik.errors.district}
                                                    </p>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="error-msg"></div>
                                    )}
                                </div>
                                <div>
                                    <div className="delivery-address__form-top-item">
                                        <span>Ward</span>
                                        <select
                                            className="input-field"
                                            id="ward-input"
                                            name="ward"
                                            value={formik.values.ward}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{ display: 'block' }}
                                            disabled={
                                                isDisabledField.isDisabledWard
                                            }
                                        >
                                            <option
                                                value=""
                                                label="Select a ward"
                                            >
                                                Select a ward
                                            </option>
                                            {addressData.ward.map((w) => (
                                                <option
                                                    value={w}
                                                    label={w}
                                                    key={w}
                                                >
                                                    {w}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {formik.errors.ward ? (
                                        <div className="error-msg">
                                            {formik.errors.ward &&
                                                formik.touched.ward && (
                                                    <p>{formik.errors.ward}</p>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="error-msg"></div>
                                    )}
                                </div>
                            </div>
                            <div className="delivery-address__form-middle">
                                <div>
                                    <div className="delivery-address__form-middle-item">
                                        <span>
                                            Street Name, Building, House No
                                        </span>
                                        <input
                                            className="input-field"
                                            id="houseNo"
                                            type="text"
                                            name="houseNo"
                                            value={formik.values.houseNo}
                                            onChange={formik.handleChange}
                                            disabled={
                                                isDisabledField.isDisabledHouseNo
                                            }
                                        />
                                    </div>
                                    {formik.errors.houseNo ? (
                                        <div className="error-msg">
                                            {formik.errors.houseNo &&
                                                formik.touched.houseNo && (
                                                    <p>
                                                        {formik.errors.houseNo}
                                                    </p>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="error-msg"></div>
                                    )}
                                </div>
                            </div>
                            <div className="delivery-address__form-bottom">
                                <div>
                                    <div className="delivery-address__form-bottom-item">
                                        <span>Receiver</span>
                                        <input
                                            className="input-field"
                                            id="receiverName"
                                            type="text"
                                            name="receiverName"
                                            value={formik.values.receiverName}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    {formik.errors.receiverName ? (
                                        <div className="error-msg">
                                            {formik.errors.receiverName &&
                                                formik.touched.receiverName && (
                                                    <p>
                                                        {
                                                            formik.errors
                                                                .receiverName
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="error-msg"></div>
                                    )}
                                </div>
                                <div>
                                    <div className="delivery-address__form-bottom-item">
                                        <span>Phone Number</span>
                                        <input
                                            className="input-field"
                                            id="phoneNumber"
                                            type="text"
                                            name="phoneNumber"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    {formik.errors.phoneNumber ? (
                                        <div className="error-msg">
                                            {formik.errors.phoneNumber &&
                                                formik.touched.phoneNumber && (
                                                    <p>
                                                        {
                                                            formik.errors
                                                                .phoneNumber
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    ) : (
                                        <div className="error-msg"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
                <ListOrderedProducts />
                <Paper
                    elevation={3}
                    sx={{ width: '100%', mb: 2, mt: 2.5, pt: 2, pr: 2, pb: 2 }}
                >
                    <div className="checkout-submit">
                        <p className="checkout-submit-txt">
                            By clicking "Place Order", you are agreeing to
                            General Transaction Terms
                        </p>
                        <button
                            type="submit"
                            className="checkout-submit-btn"
                            // disabled
                        >
                            Place Order
                        </button>
                    </div>
                </Paper>
            </form>
        </div>
    );
};

const withCheckoutPage = compose(
    withRouter,
    connect(
        (state) => ({ userInfo: userInfoSelector(state) }),
        (dispatch) => ({})
    )
);

export default withCheckoutPage(CheckoutPage);
