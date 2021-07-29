import React, {useState, useEffect, createRef} from 'react'
import { Typography, Box, List, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles'

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

    const [todos, setTodos] = useState([])
    const [filterTodos, setFilterTodos] = useState([...todos])
    const [currentPage, setCurrentPage] = useState(1)
    const [trackBug, setTrackBug] = useState('')
    const [openBar, setOpenBar] = useState(false);
    const [valFilter, setValFilter] = useState('')
    const [valSort, setValSort] = useState('asc')

    const countTodoOnPage = 3    

    function sliceTodosList(arrTodo) {
        const lastIdTask = currentPage * countTodoOnPage
        const firstIdTask = lastIdTask - countTodoOnPage
        setFilterTodos(arrTodo.slice(firstIdTask, lastIdTask))
    }

  
//REST API
    const postTodos =  async (task) => {
        try {
            const dataPOST = await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2', task)
            setTodos([...todos, dataPOST.data])
            sliceTodosList([...filterTodos, dataPOST.data])
            console.log('Very pretty code!!!', dataPOST)
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${`${err}`.slice(0, 6) + ' ' + `${err}`.slice(39, 42)}`)
            console.log('It is wrong code!!!!!', err)
        }
    }

    const deleteTodos = async (id) => {
        try {
            await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`)
            setTodos([...todos.filter(todo => todo.uuid !== id) ])
            setFilterTodos([...filterTodos.filter(todo => todo.uuid !== id) ])
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${`${err}`.slice(0, 6) + ' ' + `${err}`.slice(39, 42)}`)
            console.log(`Troubles with delete task: ${err}`)
        }
    }

    const getTodos = async () => {
        try {
            const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { filterBy: valFilter, order: valSort }})
            setTodos(dataGET.data)
            sliceTodosList(dataGET.data)
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${`${err}`.slice(0, 6) + ' ' + `${err}`.slice(39, 42)}`)
            console.log('GET function very bad written', err)
        }
    }

    
    const putTodos = async (id, newName, flag) => {
        try {
            const dataPUT = await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`, {done: !flag, name: newName})
            getTodos()
            setValSort('asc')
        } catch (err) {
            setOpenBar(true)
            setTrackBug(`${`${err}`.slice(0, 6) + ' ' + `${err}`.slice(39, 42)}`)
            console.log('PUT trouble: ', err)
        }
    }

    function handleTodoComplete (task) {
        putTodos(task.uuid, task.name, task.done)
    }

    function handleChangeText (newTitle, task) {
        putTodos(task.uuid, newTitle, !task.done)
    }


    function handleAddItem (userInput, clearStr) {
        const newItem = {
            name: userInput,
            done: false
        }
        postTodos(newItem)
        clearStr('')
        if (filterTodos.length > 2) {
            sliceTodosList(todos)
        }
    }


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
        getTodos()
    }, [valFilter, valSort])
    

    const handleDeleteToDo = async (itemId) => {
        await deleteTodos(itemId)
    }
    

    
    function handleReturnText (e, task, func) {
        if (e.key === 'Escape') {
            setFilterTodos([...filterTodos.map(todo => {
                func(task.name)
                return todo
            })])
        }
    }
    


    const handleFilterMethod = (val) => {
        setValFilter(val)
    }

    function handleSort (val) {
        setValSort(val)
    }

    function handlePaginationBtn (num) {
        setCurrentPage(num)
    }
    
//Snackbar
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
                                changeText={handleChangeText}
                                returnText={handleReturnText}
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
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openBar} 
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