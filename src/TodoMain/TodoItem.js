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


export default function TodoItem({todo, todoDelete, completeTodo, clickEnter, clickForm, clickEsc, boolVal }) {

    const classes = useStyles();
    
    const [changeTitle, setChangeTitle] = useState(todo.name)

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
                    onChange={(e) => {
                        return(e.key !== 'Enter') ? completeTodo(todo) : e.preventDefault()
                    }}
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
                    onDoubleClick={() => clickForm()}
                    onKeyDown={(e) => clickEsc(e, todo, setChangeTitle)}
                >
                    <Box width='608px' p={2} >
                        { (boolVal) 
                        ? <Typography className={classes.title} >{changeTitle}</Typography>
                        : <TextField 
                            className={classes.input}
                            onKeyPress={(e) => clickEnter(e, changeTitle, todo, setChangeTitle)} 
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

