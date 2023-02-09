import {
    Button,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userInfoSelector } from '../../../../redux/selectors';
import * as globalActions from '../../../../redux/actions/globalActions';
import { CHECK_OUT } from '../../../../configs/routeConfig';
import BrowserStoreService, {
    BROWSER_KEY,
} from '../../../../shared/services/browserStoreServices';

const EnhancedTableToolbar = (props) => {
    const {
        selectedItem,
        shoesCartData,
        history,
        userInfo = {},
        deleteShoesFromCart,
    } = props;

    const [orderedShoesFromCart, setOrderedShoesFromCart] = useState([]);

    const deleteShoes = useCallback(() => {
        deleteShoesFromCart({
            userId: userInfo._id,
            cartDeleted: selectedItem,
        });
    });

    const orderShoes = useCallback(() => {
        let shoesCartDataTemp = [];
        selectedItem.forEach((selI) => {
            shoesCartData.forEach((shoesCartDataItem) => {
                if (shoesCartDataItem._id === selI) {
                    shoesCartDataTemp = [
                        ...shoesCartDataTemp,
                        shoesCartDataItem,
                    ];
                }
            });
        });
        setOrderedShoesFromCart(shoesCartDataTemp);
        BrowserStoreService.setBrowserData(
            BROWSER_KEY.ORDERED_SHOES,
            shoesCartDataTemp
        );
        history.push(CHECK_OUT);
    });

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selectedItem.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {selectedItem.length > 0 ? (
                <>
                    <Typography
                        sx={{ flex: '1 1 70%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {`Total ${selectedItem.length} item`}
                    </Typography>
                </>
            ) : (
                <Typography
                    sx={{ flex: '1 1 70%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Cart
                </Typography>
            )}

            {selectedItem.length > 0 ? (
                <Stack direction="row" spacing={2} className="order-handling">
                    <Tooltip title="Delete">
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={deleteShoes}
                            color="error"
                        >
                            Delete
                        </Button>
                    </Tooltip>
                    <Tooltip title="Check out">
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<InventoryIcon />}
                            color="success"
                            onClick={orderShoes}
                        >
                            CHECK OUT
                        </Button>
                    </Tooltip>
                </Stack>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

const withEnhancedTableToolbar = compose(
    withRouter,
    connect(
        (state) => ({ userInfo: userInfoSelector(state) }),
        (dispatch) => ({
            deleteShoesFromCart: (data) =>
                dispatch(
                    globalActions.deleteFromCartShoes.deleteFromCartShoesRequest(
                        data
                    )
                ),
        })
    )
);
export default withEnhancedTableToolbar(EnhancedTableToolbar);
