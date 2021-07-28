import React, {useState, useEffect, useCallback} from 'react'
import { Typography, Button, Box, List } from '@material-ui/core';
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

    const [todos, setTodos] = useState([])
    const [filterTodos, setFilterTodos] = useState([...todos])
    const [currentPage, setCurrentPage] = useState(1)
    const [flagHideBtn, setFlagHideBtn] = useState(false)
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
            console.log('It is wrong code!!!!!', err)
            alert('It is wrong code!!!!!', err)
        }
    }

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`)
            setTodos([...todos.filter(todo => todo.uuid !== id) ])
            setFilterTodos([...filterTodos.filter(todo => todo.uuid !== id) ])
        } catch (err) {
            console.log(`Troubles with delete task: ${err}`)
            alert(`Troubles with delete task: ${err}`)
        }
    }

    const getRequest = async (valFilter) => {
        try {
            const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { filterBy: valFilter }})
            setTodos(dataGET.data)
            sliceTodosList(dataGET.data)
        } catch (err) {
            console.log('GET function very bad written', err)
            alert('GET function very bad written', err)
        }
    }

    const getRequestSort = async (valSort) => {
        try {
            const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { order: valSort }})
            setTodos(dataGET.data)
            sliceTodosList(dataGET.data)
        } catch (err) {
            console.log('GET function very bad written', err)
            alert('GET function very bad written', err)
        }
    }
    
    const putRequest = async (id, task, newName) => {
        try {
            const dataPUT = await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`, {done: !task.done, name: newName})
            getRequest()
        } catch (err) {
            console.log('PUT trouble: ', err)
            alert('PUT trouble: ', err)
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




//Action definite Todo item    
    const [boolVal, setBoolVal] = useState(true)

    function completeTodo (task) {
        putRequest(task.uuid, task)
    }

    function handleDeleteToDo (itemId) {
        deleteRequest(itemId)
    }
    
    function handleClickForm () {
        setBoolVal(false)
    }
    
    function handleClickEsc (e, task, func) {
        if (e.key === 'Escape') {
            setFilterTodos([...filterTodos.map(todo => {
                func(task.name)
                // task.title = old
                return todo
            })])
            setBoolVal(true)
        }
    }
    
    function handleClickEnter (event, newTitle, task) {
        if(boolVal === false && event.key === 'Enter') {
            putRequest(task.uuid, task, newTitle)
            setBoolVal(true)
            
        }
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
                                completeTodo={completeTodo}
                                todoDelete={handleDeleteToDo}
                                todo={todo} 
                                key={todo.uuid}
                                clickEnter={handleClickEnter}
                                clickForm={handleClickForm}
                                clickEsc={handleClickEsc}
                                boolVal={boolVal}
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
        </Box>
    )
}

export default TodoSection