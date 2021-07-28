import React, {useState} from 'react'
import { ListItem, InputLabel, Checkbox, Button, Box, Typography, TextField } from '@material-ui/core';
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


export default function TodoItem({todo, todoDelete, todoComplete, clickEnter, clickEsc }) {

    const classes = useStyles();
    
    const [changeTitle, setChangeTitle] = useState(todo.name)
    const [boolVal, setBoolVal] = useState(true)

    function changeText ( todo, e ) {
        setChangeTitle(e.target.value)
    }
    
    return (
        <ListItem>
            <Box htmlFor={todo.uuid} style={{display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    id={todo.uuid} 
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    onChange={(e) => (e.key === 'Enter') ? e.preventDefault() : todoComplete(todo)}
                    onKeyPress={(e) => (e.key === 'Enter') ? e.preventDefault(): console.log('sfsfs')}
                    checked={todo.done}
                />
                {/* <Input
                    id={todo.id.toString()} 
                    type="checkbox" 
                    onChange={() => completeTodo(todo.id)}
                    checked={todo.completed}
                >
                </Input> */}
                <form 
                    className={classes.root}
                    onDoubleClick={() => {
                        setBoolVal(false)
                        console.log(todo)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            clickEsc(e, todo, setChangeTitle)
                            setBoolVal(true)
                        }
                    }}
                >
                    <Box width='608px' p={2} >
                        { (boolVal) 
                        ? <Typography className={classes.title} >{changeTitle}</Typography>
                        : <TextField 
                            className={classes.input}
                            onBlur={() => setBoolVal(true)}
                            onKeyPress={(e) => {
                                if(boolVal === false && e.key === 'Enter') {
                                    clickEnter(changeTitle, todo)
                                    setBoolVal(true)
                                }
                            }} 
                            onChange={(e) => changeText(todo, e)} 
                            value={changeTitle} 
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
                <Typography className={classes.dateText}>{`${todo.createdAt.slice(0, 10)}, time: ${todo.createdAt.slice(11, 19)}`}</Typography>
            </Box>
            <Button startIcon={<DeleteOutlinedIcon />} onClick={() => todoDelete(todo.uuid)} type="button"></Button>
        </ListItem>
    )
}   

