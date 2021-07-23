import React from 'react'
import QuantityBtn from './QuantityBtn'
import { Box, Button } from '@material-ui/core';

export default function Quantity ({filterAllBtn, filterDoneBtn, filterUndoneBtn}) {
    return (
        <Box>
            <Button onClick={ () => filterAllBtn()} variant="contained" color="common" type="button">All</Button>
            <Button onClick={ () => filterDoneBtn()} variant="contained" color="common" style={ { marginLeft: '20px'}} type="button">Done</Button>
            <Button onClick={ () => filterUndoneBtn()} variant="contained" color="common" style={ { marginLeft: '20px'}} type="button">Undone</Button>
        </Box>
    )
}