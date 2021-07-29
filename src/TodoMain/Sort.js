import React, { useState } from 'react'
import { Box, Typography, Button } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default function Sort ({ sortBtn }) {

    const [classFirstBtn, setClassFirstBtn] = useState('secondary')
    const [classSecondBtn, setClassSecondBtn] = useState('')
    return (
        <Box display='flex' alignItems='center'>
            <Typography>Sort by date:</Typography>
            <Box ml={1}>
                <Button size="small" onClick={() => {
                    sortBtn('asc')
                    setClassFirstBtn('secondary')
                    setClassSecondBtn('')
                }} color={classFirstBtn} type ="button">
                    <ArrowUpwardIcon />
                </Button>
            </Box>
            <Box ml={1}>
                <Button size="small" onClick={() => {
                    sortBtn('desc')
                    setClassSecondBtn('secondary')
                    setClassFirstBtn('')
                }} color={classSecondBtn} type ="button">
                    <ArrowDownwardIcon />
                </Button>
            </Box>
        </Box>
    )
}