import React, {useState, useEffect} from 'react'
import { Typography, Button, Box, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import TodoTitle from './TodoTitle'
import TodoForm from './TodoForm'
import Options from './Options'
import TodoItem from './TodoItem'
import Pagination from './Pagination'
//any c
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
    console.log(' ========= Render todoSection', todos)
    const countTodoOnPage = 3    

    function sliceTodosList(arrTodo) {
        const lastIdTask = currentPage * countTodoOnPage
        const firstIdTask = lastIdTask - countTodoOnPage
        setFilterTodos(arrTodo.slice(firstIdTask, lastIdTask))
    }


    function handleAddItem (userInput, funcDelete) {
        const newItem = {
            id: Date.now(),
            title: userInput,
            completed: false,
            date: new Date()
        }
        funcDelete('')
        setTodos([...todos, newItem])
        setFilterTodos([...todos, newItem])
        if (filterTodos.length > 2) {
            sliceTodosList(todos)
        }
    }



//Hook useEffect
    useEffect(() => {
        sliceTodosList(todos)
        console.log('it"s working')
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
    function completeTodo (id) {
        setFilterTodos([...filterTodos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                return todo
            } return todo
        })])
    }

    function handleDeleteToDo (itemId) {
        setFilterTodos([...filterTodos.filter(todo => todo.id !== itemId) ])
        setTodos([...todos.filter(todo => todo.id !== itemId) ])
    }
    



// Filtration
    const lastIdTask = currentPage * countTodoOnPage
    const firstIdTask = lastIdTask - countTodoOnPage

    function handleFilterAll () {
        setFlagHideBtn(false)
        sliceTodosList(todos)
        console.log(filterTodos.length)
    }

    function handleFilterDone () {
        setFilterTodos(todos.filter(todo => todo.completed === true).slice(firstIdTask, lastIdTask))
        handleHidePagi()
    }

    function handleFilterUndone () {
        setFilterTodos(todos.filter(todo => todo.completed === false).slice(firstIdTask, lastIdTask))
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
            />
            <List>
                {filterTodos.map((todo) => {
                    return <TodoItem 
                                completeTodo={completeTodo}
                                style={{width: '100%'}}
                                todoDelete={handleDeleteToDo}
                                classItem={todo.class}
                                todo={todo} 
                                key={todo.id}
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