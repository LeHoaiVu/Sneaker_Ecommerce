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
        <Grid item xs={12} md={4} sm={3}>
            <Card className="card-item">
                <CardMedia
                    image={shoes.attachment}
                    tittle="Tittle"
                    className="img-card"
                />
                <CardContent>
                    <Typography variant="p" color="textPrimary">
                        {shoes.name}
                    </Typography>
                    <div className={classes.cart}>
                        <Typography
                            variant="p"
                            className={classes.cartPrice}
                        >
                            {`${shoes.price}₫`}
                        </Typography>
                    </div>
                </CardContent>

                <div className="add-to-cart-btn">
                    <AddShoppingCartIcon onClick={handleAddToCart} />
                </div>
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
