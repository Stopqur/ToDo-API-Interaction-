import React from 'react'
import QuantityBtn from './QuantityBtn'
import { Box, Button } from '@material-ui/core';

export default function Quantity ({filterAllBtn, filterDoneBtn, filterUndoneBtn, filterMethod}) {
    return (
        <Box>
            <Button onClick={ () => filterMethod('')} variant="contained" type="button">All</Button>
            <Button onClick={ () => filterMethod('done')} variant="contained" style={ { marginLeft: '20px'}} type="button">Done</Button>
            <Button onClick={ () => filterMethod('undone')} variant="contained" style={ { marginLeft: '20px'}} type="button">Undone</Button>
        </Box>
    )
}