import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

const headCells = [
    {
        id: 'product',
        align: 'left',
        disablePadding: true,
        label: 'Product',
    },
    {
        id: 'price',
        align: 'left',
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'number',
        align: 'left',
        disablePadding: false,
        label: 'Number',
    },
    {
        id: 'total-price',
        align: 'left',
        disablePadding: false,
        label: 'Total Price',
    },
];

const EnhancedTableHead = (props) => {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        colSpan={2}
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;
