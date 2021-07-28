import React from 'react'
import { Box, Typography, Button, CardMedia } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default function Sort ({sortBtn, sortBtnLater}) {
    return (
        <Box display='flex' alignItems='center'>
            <Typography>Sort by date:</Typography>
            <Button startIcon={<ArrowUpwardIcon />} onClick={() => sortBtn('asc')} type ="button"></Button>
            <Button startIcon={<ArrowDownwardIcon />} onClick={() => sortBtn('desc')} type ="button"></Button>
        </Box>
    )
}