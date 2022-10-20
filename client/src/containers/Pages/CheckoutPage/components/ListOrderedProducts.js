import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    useTheme,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import BrowserStoreService, {
    BROWSER_KEY,
} from '../../../../shared/services/browserStoreServices';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

const ListOrderedProducts = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [oderedShoes, setOderedShoes] = useState([]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    useEffect(() => {
        setOderedShoes(
            BrowserStoreService.getBrowserData(BROWSER_KEY.ORDERED_SHOES)
        );
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - oderedShoes.length)
            : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    Products Ordered
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {`Unit Price ($)`}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Amount
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {`Item Subtotal ($)`}
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? oderedShoes.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : oderedShoes
                            ).map((oderedShoesItem) => (
                                <TableRow key={oderedShoesItem._id}>
                                    <TableCell component="th" scope="row">
                                        {oderedShoesItem.name}
                                    </TableCell>
                                    <TableCell
                                        style={{ width: 160 }}
                                        align="right"
                                    >
                                        {oderedShoesItem.price}
                                    </TableCell>
                                    <TableCell
                                        style={{ width: 160 }}
                                        align="right"
                                    >
                                        {oderedShoesItem.prodNumber}
                                    </TableCell>
                                    <TableCell
                                        style={{ width: 160 }}
                                        align="right"
                                    >
                                        {oderedShoesItem.prodTotalPrice}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        25,
                                        { label: 'All', value: -1 },
                                    ]}
                                    colSpan={4}
                                    count={oderedShoes.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper
                elevation={3}
                sx={{ width: '100%', mb: 2, mt: 2.5, pt: 0.5, pr: 2 }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <p>{`Merchandise Subtotal: ${oderedShoes.reduce(
                            (totalPrice, nextShoesPrice) =>
                                (totalPrice += nextShoesPrice.prodTotalPrice),
                            0
                        )}`}</p>
                    </Grid>
                    <Grid item>
                        <p>Shipping Total: Free</p>
                    </Grid>
                    <Grid item>
                        <p>{`Total Payment: ${oderedShoes.reduce(
                            (totalPrice, nextShoesPrice) =>
                                (totalPrice += nextShoesPrice.prodTotalPrice),
                            0
                        )}`}</p>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ListOrderedProducts;
