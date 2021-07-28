import React, {useState, useEffect, useCallback} from 'react'
import { Typography, Button, Box, List, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles'

import TodoTitle from './TodoTitle'
import TodoForm from './TodoForm'
import Options from './Options'
import TodoItem from './TodoItem'
import Pagination from './Pagination'
import axios from 'axios'

const useStyles = makeStyles(() => ({
    title: {
        color: 'white'
    },
    input: {
        color: "white"
      }
}))


function TodoSection() {
    const classes = useStyles();

    // const get = () => {
    //     axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2')
    //     .then(req => {
    //         req.data
    //         console.log(req.data)
    //     }) 
    // }
    
    const [todos, setTodos] = useState([])
    const [filterTodos, setFilterTodos] = useState([...todos])
    const [currentPage, setCurrentPage] = useState(1)
    const [flagHideBtn, setFlagHideBtn] = useState(false)
    const [trackBug, setTrackBug] = useState('')
    const [openBar, setOpenBar] = useState(false);
    // console.log(' ========= Render todoSection', todos)
    const countTodoOnPage = 3    

    function sliceTodosList(arrTodo) {
        const lastIdTask = currentPage * countTodoOnPage
        const firstIdTask = lastIdTask - countTodoOnPage
        setFilterTodos(arrTodo.slice(firstIdTask, lastIdTask))
    }

  
//REST API
    const postRequest =  async (task) => {
        try {
            const dataPOST = await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2', task)
            setTodos([...todos, dataPOST.data])
            setFilterTodos([...filterTodos, dataPOST.data].slice(currentPage * 3 - 3, currentPage * 3))
            console.log('Very pretty code!!!', dataPOST)
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${err}`)
            console.log('It is wrong code!!!!!', typeof err)
        }
    }

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`)
            setTodos([...todos.filter(todo => todo.uuid !== id) ])
            setFilterTodos([...filterTodos.filter(todo => todo.uuid !== id) ])
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${err}`)
            console.log(`Troubles with delete task: ${err}`)
        }
    }
// function handleSortEarlier () {
//         setFilterTodos(filterTodos.sort(function(a, b) {
//             return b.id - a.id
//         }))
//     }
    const getRequest = async (valFilter) => {
        try {
            const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { filterBy: valFilter, order: 'asc' }})
            setTodos(dataGET.data)
            sliceTodosList(dataGET.data)
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${err}`)
            console.log('GET function very bad written', err)
        }
    }

    const getRequestSort = async (valSort) => {
        try {
            const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { order: valSort }})
            setTodos(dataGET.data)
            sliceTodosList(dataGET.data)
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${err}`)
            console.log('GET function very bad written', err)
        }
    }
    
    const putRequest = async (id, task, newName) => {
        try {
            const dataPUT = await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`, {done: !task.done, name: newName})
            // (task.done === true) ? getRequest('done') 
            getRequest()
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${err}`)
            console.log('PUT trouble: ', err)
        }
    }




//Form actions
    function handleAddItem (userInput, funcDelete) {
        const newItem = {
            name: userInput,
            done: false
        }
        postRequest(newItem)
        funcDelete('')
        if (filterTodos.length > 2) {
            sliceTodosList(todos)
        }
    }




//Hook useEffect
    useEffect(() => {
        sliceTodosList(todos)
    }, [currentPage])

    useEffect (() => {
        if (filterTodos.length < 1 && todos.length !== 0 && currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            sliceTodosList(todos)
        } 
        else if (filterTodos.length < 1 && todos.length !== 0 && currentPage === 1) {
            sliceTodosList(todos)
        }
    }, [filterTodos.length])

    useEffect(() => {
        getRequest()
    }, TodoSection)



//Action definite Todo item    

    function handleTodoComplete (task) {
        putRequest(task.uuid, task)
    }

    const handleDeleteToDo = async (itemId) => {
        await deleteRequest(itemId)
    }
    

    
    function handleClickEsc (e, task, func) {
        if (e.key === 'Escape') {
            setFilterTodos([...filterTodos.map(todo => {
                func(task.name)
                // task.title = old
                return todo
            })])
        }
    }
    
    function handleClickEnter (newTitle, task) {
        putRequest(task.uuid, task, newTitle)
    }




// Filtration
    const handleFilterMethod = (val) => {
        getRequest(val)
    }




//Sort
    function handleSort (val) {
        getRequestSort(val)
    }




//Pagination 
    function handlePaginationBtn (num) {
        setCurrentPage(num)
    }
    

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenBar(false);
    };
      


    return (
        <Box bgcolor="text.secondary" p={10}>
            <Typography className={ classes.title } variant='h3'>toDo List</Typography>
            <TodoForm addTodo={handleAddItem}></TodoForm>
            <Options 
                sortTodos={handleSort} 
                filterMethod={handleFilterMethod}
            />
            <Box minHeight='280px'>
                <List>
                    {filterTodos.map((todo) => {
                        return (
                            <TodoItem 
                                todoComplete={handleTodoComplete}
                                todoDelete={handleDeleteToDo}
                                todo={todo} 
                                key={todo.uuid}
                                clickEnter={handleClickEnter}
                                clickEsc={handleClickEsc}
                            />
                        )
                        })
                    }
                </List>
            </Box>
            {todos.length > 3 
            && 
            <Pagination 
                classes={classes}
                btnSwitchPage={handlePaginationBtn} 
                countTodoOnPage={countTodoOnPage}                
                countFilterTodo={todos.length}
            />
            }
            <Snackbar 
                open={openBar} 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                autoHideDuration={6000} 
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {trackBug}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default TodoSection