import { Divider, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { HOT_NEWS } from '../../../constants';

const HomePage = (props) => {
    const {} = props;
    return (
        <div className="home-page">
            <Typography variant="h4">WHAT'S HOT</Typography>
            <div className="home-page-hot">
                {HOT_NEWS.map((hot_news_item) => (
                    <div
                        className="home-page-hot-item"
                        key={hot_news_item.title}
                    >
                        <video
                            loop=""
                            autoPlay=""
                            playsInline=""
                            src={hot_news_item.video}
                        ></video>
                        <p className="home-page-hot-title">
                            {hot_news_item.title}
                        </p>
                        <p className="home-page-hot-subtitle">
                            {hot_news_item.subtitle}
                        </p>
                    </div>
                ))}
            </div>
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
