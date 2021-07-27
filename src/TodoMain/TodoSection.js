import React, { useState, useEffect, useCallback } from 'react'
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
    const [filterBy, setFilterBy] = useState('')
    console.log(' ========= Render todoSection', todos)
    const countTodoOnPage = 3    

    function sliceTodosList() {
        const lastIdTask = currentPage * countTodoOnPage
        const firstIdTask = lastIdTask - countTodoOnPage
        setFilterTodos(todos.slice(firstIdTask, lastIdTask))
    }



//REST API
    const postRequest =  async (task) => {
        try {
            const dataPOST = await axios.post('https://todo-api-learning.herokuapp.com/v1/task/2', task)
            setTodos([...todos, dataPOST.data])
            sliceTodosList()
            console.log('Very pretty code!!!')
        } catch (err) {
            console.log('It is wrong code!!!!!', err)
        }
    }


    const getRequest = async () => {
        console.log('it is realy filterBy in getrequest', currentPage)
        try {
            const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { filterBy }})
            setTodos(dataGET.data)
            console.log(dataGET.data.map(item => item.name))
        } catch (err) {
            console.log('GET function very bad written', err)
        }
    }
    // const getRequest = useCallback(async () => {
    //     console.log('it is realy filterBy in getrequest', currentPage)
    //     try {
    //         const dataGET = await axios.get('https://todo-api-learning.herokuapp.com/v1/tasks/2', {params: { filterBy }})
    //         setTodos(dataGET.data)
    //         console.log(dataGET.data.map(item => item.name))
    //     } catch (err) {
    //         console.log('GET function very bad written', err)
    //     }
    // }, [filterBy, filterTodos])


    const deleteRequest = async (id) => {
        try {
            await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`)
            setTodos([...todos.filter(todo => todo.uuid !== id) ])
            setFilterTodos([...filterTodos.filter(todo => todo.uuid !== id) ])
        } catch (err) {
             console.log(`Troubles with delete task: ${err}`)
        }
    }
    const putRequest = async (id, task) => {
        try {
            const dataPUT = await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/2/${id}`, {done: !task.done})
            console.log('dataPUT', dataPUT.data)
        } catch (err) {
            console.log('PUT trouble: ', err)
        }
    }


    function handleAddItem (userInput, funcDelete) {
        const newItem = {
            name: userInput,
            done: false,
        }
        postRequest (newItem)
        console.log('Response!!! ', 'setTodos:', todos.length, 'filterTodos:', filterTodos.length)
        funcDelete('')
    }


    


//Hook useEffect
    useEffect(() => {
        setFilterTodos(todos.slice(currentPage * 3 - 3, currentPage * 3))
        console.log('it"s working: ', todos.length)
    }, [currentPage])

    useEffect (() => {
        if (filterTodos.length < 1 && todos.length !== 0 && currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            getRequest(todos)
        } 
        else if (filterTodos.length < 1 && todos.length !== 0 && currentPage === 1) {
            setFilterTodos(todos.slice(currentPage * 3 - 3, currentPage * 3))
        }
    }, [filterTodos.length])





//Action definite Todo item    
    function completeTodo (id, task) {
        putRequest(id, task)
        getRequest()
    }

    function handleDeleteToDo (itemId) {
        deleteRequest(itemId)
    }
    



// Filtration
    function handleFilter (paramFilter) {
        setFilterBy(paramFilter)
        getRequest()
    }
    console.log(filterBy)

    
    const lastIdTask = currentPage * countTodoOnPage
    const firstIdTask = lastIdTask - countTodoOnPage

    function handleFilterAll () {
        getRequest()
    }

    function handleFilterDone () {
        setFilterTodos(todos.filter(todo => todo.done === true).slice(firstIdTask, lastIdTask))
        handleHidePagi()
    }

    function handleFilterUndone () {
        setFilterTodos(todos.filter(todo => todo.done === false).slice(firstIdTask, lastIdTask))
        handleHidePagi()
    }





//Sort
    function handleSortEarlier () {
        setFilterTodos(filterTodos.sort(function(a, b) {
            return b.id - a.id
        }))
    }

    function handleSortLater () {
        setFilterTodos(filterTodos.sort(function(a, b) {
            return a.id - b.id 
        }))
    }




//Pagination 
   // Hide pagination on length array less 3
   function handleHidePagi () {
        if(filterTodos.length < 3) {
            setFlagHideBtn(true)
            console.log(filterTodos.length)
        } 
        else {
            setFlagHideBtn(false)
            console.log(filterTodos.length)

        }
    }

    function handlePaginationBtn (num) {
        setCurrentPage(num)
        console.log('number of page: ', currentPage)
    }





// Actions on definite task

const [boolVal, setBoolVal] = useState(true)

function handleClickForm () {
    setBoolVal(false)
}

function handleClickEsc (e, task, func) {
    if (e.key === 'Escape') {
        setFilterTodos([...filterTodos.map(todo => {
            func(task.title)
            // task.title = old
            return todo
        })])
        setBoolVal(true)
    }
}

function handleClickEnter (event, newTitle, task) {
    if(boolVal === false && event.key === 'Enter') {
        setFilterTodos([...filterTodos.map(todo => {
            task.title = newTitle
            return todo
        })])
        setBoolVal(true)
        
    }
}

    



    return (
        <Box bgcolor="text.secondary" p={10}>
            <Typography className={ classes.title } variant='h3'>toDo List</Typography>
            <TodoForm addTodo={handleAddItem}></TodoForm>
            <Options 
                sortTodosLater={handleSortLater} 
                sortTodosEarlier={handleSortEarlier} 
                filterAll={handleFilterAll} 
                filterUndone={handleFilterUndone} 
                filterDone={handleFilterDone}
                filterMethod = {handleFilter}
            />
            <List>
                {filterTodos.map((todo,index) => {
                    return <TodoItem 
                                key={index}
                                completeTodo={completeTodo}
                                style={{width: '100%'}}
                                todoDelete={handleDeleteToDo}
                                todo={todo} 
                                clickEnter={handleClickEnter}
                                clickForm={handleClickForm}
                                clickEsc={handleClickEsc}
                                boolVal={boolVal}
                            />
                    })
                }
            </List>
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
    // (
        // <section className='main__menu'>
        //     <TodoTitle />    
        //     <TodoForm 
        //         addTodo={handleAddItem} 
        //         titleInput={titleInput} 
        //         handleChangeInput={handleChangeInput} 
        //         deleteInput={handleDeleteInput} 
        //     />
        //     <Options sortTodosLater={handleSortLater} sortTodosEarlier={handleSortEarlier} filterAll={handleFilterAll} filterUndone={handleFilterUndone} filterDone={handleFilterDone}/>
        //     <ul className="main__taskList">
        //         {filterTodos.map((todo, index) => {
        //             return <TodoItem 
        //                 number={index}
        //                 todoDelete={handleDeleteToDo}
        //                 todo={todo} 
        //                 key={index}/>
        //             })
        //         }
        //     </ul>
        //     <Pagination btnSwitchPage={handlePaginationBtn} countTodos={todos.length} countTodoOnPage={countTodoOnPage}/>
        // </section>
    // )
}

export default TodoSection