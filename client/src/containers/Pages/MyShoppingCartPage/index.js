import {
    Box,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import noImg from '../../../assets/img/noimage.png';
import * as globalActions from '../../../redux/actions/globalActions';
import { userInfoSelector } from '../../../redux/selectors';
import { getComparator, stableSort } from '../../../ultilities/helpers';
import EnhancedTableHead from './components/EnhancedTableHead';
import EnhancedTableToolbar from './components/EnhancedTableToolbar';
import * as actions from './redux/actions';
import { selectMenShoesCartSelector } from './redux/selector';

const MyShoppingCartPage = (props) => {
    const {
        history,
        userInfo = {},
        getShoesCartRequest,
        updateToCartShoes,
        cartShoes = [],
    } = props;

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('price');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [shoesCartData, setShoesCartData] = useState([]);

    useEffect(() => {
        // if (shoesCartData.length === 0) {
        getShoesCartRequest({
            userId: userInfo._id,
            cart: userInfo.cart,
        });

        //remove selected after delete it
        setSelected([]);
        // }
    }, [userInfo.cart]);

    useEffect(() => {
        if (cartShoes.length === 0) {
            setShoesCartData([]);
            return;
        }
        const cartShoesTemp = mergeObjectWithSameField(
            userInfo.cart,
            cartShoes
        );
        setShoesCartData(cartShoesTemp);
    }, [cartShoes]);

    const mergeObjectWithSameField = (arr, arrResult) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arrResult.length; j++) {
                if (arr[i]['prodId'] === arrResult[j]['_id']) {
                    arrResult[j]['prodNumber'] = arr[i]['prodNumber'];
                    arrResult[j]['prodTotalPrice'] =
                        arr[i]['prodNumber'] * arrResult[j]['price'];
                }
            }
        }
        return arrResult;
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = shoesCartData.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty cartShoes.
    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - shoesCartData.length)
            : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    selectedItem={selected}
                    shoesCartData={shoesCartData}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={shoesCartData.length}
                        />
                        <TableBody>
                            {stableSort(
                                shoesCartData,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((cartShoesItem, index) => {
                                    const isItemSelected = isSelected(
                                        cartShoesItem._id
                                    );
                                    const labelId = `enhanced-table-checkbox-${cartShoesItem._id}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            cartShoesItem._id
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell
                                                className="shoes-info"
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                onClick={(event) =>
                                                    handleClick(
                                                        event,
                                                        cartShoesItem._id
                                                    )
                                                }
                                            >
                                                <p>{cartShoesItem.name}</p>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                onClick={(event) =>
                                                    handleClick(
                                                        event,
                                                        cartShoesItem._id
                                                    )
                                                }
                                            >
                                                {cartShoesItem.attachment ? (
                                                    <img
                                                        className="img-shoes-cart"
                                                        src={`${cartShoesItem.attachment}`}
                                                    />
                                                ) : (
                                                    <img
                                                        className="no-img-shoes-cart"
                                                        src={`${noImg}`}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align="left" colSpan={2}>
                                                {`${cartShoesItem.price} $`}
                                            </TableCell>
                                            <TableCell align="left">
                                                <TextField
                                                    inputProps={{
                                                        step: '1',
                                                        min: 0,
                                                        max: 50,
                                                    }}
                                                    name="number-prod"
                                                    type="number"
                                                    placeholder="0"
                                                    value={
                                                        cartShoesItem.prodNumber
                                                    }
                                                    onChange={
                                                        //prettier-ignore
                                                        (e) => {
                                                            const cartShoesTemp = [...shoesCartData];
                                                            let newCartShoesTemp = cartShoesTemp.map((newItem) => {
                                                                if (newItem._id === cartShoesItem._id) {
                                                                    return {
                                                                        ...newItem,
                                                                        prodNumber: parseInt(e.target.value) ,
                                                                        prodTotalPrice: e.target.value * newItem['price']
                                                                    };
                                                                }
                                                                return newItem;
                                                            });
                                                            newCartShoesTemp = newCartShoesTemp.filter(newCartShoesTempItem => newCartShoesTempItem.prodNumber !== 0)
                                                            let updatedCartArr = newCartShoesTemp.map((updatedItem) => {
                                                                const {prodNumber, _id} = updatedItem
                                                                return {prodNumber, prodId: _id}
                                                            })
                                                            updateToCartShoes({_id: userInfo._id, cart: updatedCartArr})
                                                            setShoesCartData(newCartShoesTemp);
                                                        }
                                                    }
                                                />
                                            </TableCell>
                                            {/* <TableCell align="left" colSpan={2}>
                                                <Typography>{`${cartShoesItem.prodNumber}`}</Typography>
                                            </TableCell> */}
                                            <TableCell align="left" colSpan={2}>
                                                <Typography>{`${cartShoesItem.prodTotalPrice} $`}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={12} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={shoesCartData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

const withMyShoppingCartPage = compose(
    withRouter,
    connect(
        (state) => ({
            userInfo: userInfoSelector(state),
            cartShoes: selectMenShoesCartSelector(state),
        }),
        (dispatch) => ({
            getShoesCartRequest: (data) =>
                dispatch(actions.getShoesCart.getShoesCartRequest(data)),
            updateToCartShoes: (data) =>
                dispatch(
                    globalActions.updateToCartShoes.updateToCartShoesRequest(
                        data
                    )
                ),
        })
    )
);

export default withMyShoppingCartPage(MyShoppingCartPage);
