import React from 'react'
import Quantity from './Quantity'
import Sort from './Sort'
import { Box } from '@material-ui/core';

export default function Options ({filterAll, filterDone, filterUndone, sortTodosEarlier, sortTodosLater, deleteAllTasks, filterMethod}) {

    return (
    
        <Box display='flex' justifyContent="space-between">
            <Quantity 
                filterAllBtn={filterAll} 
                filterDoneBtn={filterDone} 
                filterUndoneBtn={filterUndone}
                deleteAllTasks={deleteAllTasks}
                filterMethod={filterMethod}
            />
            <Sort 
                sortBtnEarlier={sortTodosEarlier} 
                sortBtnLater={sortTodosLater}
            />
        </Box>
    )
}