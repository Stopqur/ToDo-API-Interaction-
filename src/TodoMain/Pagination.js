import React, { useState } from 'react' 
import { Button, Box } from '@material-ui/core';

function Pagination ({ btnSwitchPage, countTodoOnPage, countFilterTodo, classes }) {
    // const [pageNum, setPageNum] = useState([])
    const pageNum = []

    for (let i = 1; i <= Math.ceil(countFilterTodo / countTodoOnPage); i++) {
        pageNum.push(i)
    }
    return (
        <Box display='flex' justifyContent='center'>
            {pageNum.map((btn, i) => {
                return (
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => btnSwitchPage(btn)} 
                        key = {i}
                    >
                    {btn} 
                    </Button>
                )
            })}
        </Box>
    )
}

export default Pagination