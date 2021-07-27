import React, {useState, useEffect} from 'react'
import { ListItem, InputLabel, Checkbox, Button, Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'white'
    },
    dateText: {
        color: 'orange'
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      }
}))





export default function TodoItem({todo, todoDelete, completeTodo, clickEnter, clickForm, clickEsc, boolVal, textTask }) {
    
    const classes = useStyles();

    const [classItem, setClassItem] = useState('taskItem__text')
    
    const [changeTitle, setChangeTitle] = useState(todo.name)


    function changeText (task, e ) {
        setChangeTitle(e.target.value)
    }


    return (
        <ListItem >
            <InputLabel htmlFor={todo.uuid} style={{display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    onChange={() => completeTodo(todo.uuid, todo)}
                    checked={todo.done}
                />
                <form 
                    className={classes.root}
                    onDoubleClick={() => clickForm()}
                    onKeyDown={(e) => clickEsc(e, todo, setChangeTitle)}
                >
                    <Box width='608px' p={2} >
                        { (boolVal) 
                        ? <Typography className={classes.title} >{`${changeTitle}, ${todo.done}`}</Typography>
                        : <TextField 
                            className={classes.input}
                            onKeyPress={(e) => clickEnter(e, changeTitle, todo, setChangeTitle)} 
                            onChange={(e) => changeText(todo, e)} 
                            value={changeTitle} 
                            id="outlined-basic" 
                            label="Outlined" 
                            variant="outlined"
                            InputProps={{
                                style: {
                                    color: "#f50057"
                                }
                            }}
                          />
                        }
                    </Box>
                </form>
                                                        {/* {todo.createdAt.slice(0, 10) + ', time: ' + todo.createdAt.slice(12, 19)} */}
                <Typography className={classes.dateText}>{`${todo.createdAt.slice(0, 10)}, time: ${todo.createdAt.slice(12, 19)}`}</Typography>
            </InputLabel>
            <Button startIcon={<DeleteOutlinedIcon />} onClick={() => todoDelete(todo.uuid)} type="button"></Button>
        </ListItem>
    )
}   

