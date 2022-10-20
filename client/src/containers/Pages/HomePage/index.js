import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

const HomePage = (props) => {
    const {} = props;
    return (
        <div>
            <p>HomePage</p>
        </div>
    );
};
const withHomePage = compose(
    withRouter,
    connect(
        (state) => ({}),
        (dispatch) => ({})
    )
);

export default withHomePage(HomePage);
