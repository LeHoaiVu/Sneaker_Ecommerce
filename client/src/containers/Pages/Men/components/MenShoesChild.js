import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useStyles from './styles';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSelector } from '../../Login/redux/selector';
import { LOGIN_PAGE } from '../../../../configs/routeConfig';
import * as globalActions from '../../../../redux/actions/globalActions';

const MenShoesChild = (props) => {
    const {
        shoes,
        history,
        userInfo: { error, userInfo = {} } = {},
        addUserCart,
    } = props;

    const classes = useStyles();
    const isLogin = !!userInfo._id;

    const handleAddToCart = useCallback(() => {
        if (!isLogin) {
            history.push(LOGIN_PAGE);
            return;
        }
        addUserCart({ _id: userInfo._id, cart: shoes._id });
    }, [addUserCart, isLogin, history]);

    return (
        <Grid item xs={12} sm={6}>
            <Card>
                <CardMedia
                    image={shoes.attachment}
                    tittle="Tittle"
                    className={classes.media}
                />
                <CardContent>
                    <Typography variant="h5" color="textPrimary">
                        {shoes.name}
                    </Typography>
                    <div className={classes.cart}>
                        <Typography
                            variant="p"
                            color="textPrimary"
                            className={classes.cartPrice}
                        >
                            {`${shoes.price}$`}
                        </Typography>
                        <AddShoppingCartIcon onClick={handleAddToCart} />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};
const withMenShoesChild = compose(
    withRouter,
    connect(
        (state) => ({ userInfo: loginSelector(state) }),
        (dispatch) => ({
            addUserCart: (data) =>
                dispatch(
                    globalActions.addToCartShoes.addToCartShoesRequest(data)
                ),
        })
    )
);

export default withMenShoesChild(MenShoesChild);
