import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Loading from '../../../components/Loading';
import MenShoesChild from './components/MenShoesChild';
import * as actions from './redux/actions';
import { selectMenShoesState } from './redux/selector';

const Men = (props) => {
    const { menShoes, getMenShoesRequest } = props;

    useEffect(() => {
        getMenShoesRequest();
    }, [getMenShoesRequest]);

    return (
        <Grid container spacing={2} alignItems="stretch" sx={{ p: 2 }}>
            {menShoes.length === 0 ? (
                <Loading />
            ) : (
                <>
                    {menShoes.map((shoes) => (
                        <MenShoesChild key={shoes._id} shoes={shoes} />
                    ))}
                </>
            )}
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
