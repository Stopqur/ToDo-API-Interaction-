import React from 'react' 
import { Button, Box } from '@material-ui/core';

function Pagination ({ btnSwitchPage, countTodoOnPage, countFilterTodo }) {
    const pageNum = []

    for (let i = 1; i <= Math.ceil(countFilterTodo / countTodoOnPage); i++) {
        pageNum.push(i)
    }

    return (
        <Box display='flex' justifyContent='center'>
            {pageNum.map((btn, i) => {
                return (
                <Box mr={1} key = {i}>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => btnSwitchPage(btn)} 
                    >
                    {btn} 
                    </Button>
                </Box>
                )
            })}
        </Box>
    )
}

export default Pagination