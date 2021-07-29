import React, {useState} from 'react'
import { ListItem, Checkbox, Button, Box, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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


export default function TodoItem({ todo, todoComplete, todoDelete, changeText, currentText, editTodo }) {

    const classes = useStyles();
    
    const [changeTitle, setChangeTitle] = useState(todo.name)
    const [editField, setEditField] = useState(true)

    function change (e) {
        setChangeTitle(e.target.value)
    }
    
    return (
        <ListItem>
            <Box htmlFor={todo.uuid} style={{display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    id={todo.uuid} 
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    onChange={() => editTodo(todo, todo.name, !todo.done)}
                    checked={todo.done}
                />
                <form 
                    className={classes.root}
                    onDoubleClick={(e) => {
                        setEditField(false)
                        console.log(todo)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            currentText(e, todo, setChangeTitle)
                            setEditField(true)
                        }
                    }}
                >
                    <Box width='608px' p={2} >
                        { (editField) 
                        ? <Typography className={classes.title} >{changeTitle}</Typography>
                        : <TextField 
                            className={classes.input}
                            onBlur={() => setEditField(true)}
                            onKeyPress={(e) => {
                                if(editField === false && e.key === 'Enter') {
                                    editTodo(todo, changeTitle, todo.done)
                                    setEditField(true)
                                }
                            }} 
                            onChange={(e) => change(e)} 
                            value={changeTitle} 
                            label="Outlined" 
                            variant="outlined"
                            InputProps={{
                                style: {
                                    color: "#f50057"
                                }
                            }}
                            autoFocus
                          />
                        }
                    </Box>
                </form>
                <Typography className={classes.dateText}>{`${todo.createdAt.slice(0, 10)}, time: ${todo.createdAt.slice(11, 19)}`}</Typography>
            </Box>
            <Button startIcon={<DeleteOutlinedIcon />} onClick={() => todoDelete(todo.uuid)} type="button"></Button>
        </ListItem>
    )
}   

