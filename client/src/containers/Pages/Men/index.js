import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import MenShoesChild from './components/MenShoesChild';
import * as actions from './redux/actions';
import { selectMenShoesState } from './redux/selector';

const Men = (props) => {
    const { menShoes, getMenShoesRequest } = props;

    useEffect(() => {
        getMenShoesRequest();
    }, [getMenShoesRequest]);

    return (
        <Grid container spacing={2} alignItems="stretch">
            {menShoes.map((shoes) => (
                <MenShoesChild key={menShoes._id} shoes={shoes} />
            ))}
        </Grid>
    );
};
const withMen = compose(
    withRouter,
    connect(
        (state) => ({ menShoes: selectMenShoesState(state) }),
        (dispatch) => ({
            getMenShoesRequest: () =>
                dispatch(actions.getMenShoes.getMenShoesRequest()),
        })
    )
);
export default withMen(Men);
