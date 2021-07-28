import React from 'react'
import Quantity from './Quantity'
import Sort from './Sort'
import { Box } from '@material-ui/core';

export default function Options ({sortTodos, filterMethod}) {
    return (
        <Box display='flex' justifyContent="space-between">
            <Quantity filterMethod={filterMethod} />
            <Sort sortBtn={sortTodos} />
        </Box>
    )
}