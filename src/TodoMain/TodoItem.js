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


export default function TodoItem({ todo, todoComplete, todoDelete, changeText, returnText }) {

    const classes = useStyles();
    
    const [changeTitle, setChangeTitle] = useState(todo.name)
    const [changeTag, setChangeTag] = useState(true)

  
    
    return (
        <ListItem>
            <Box htmlFor={todo.uuid} style={{display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    id={todo.uuid} 
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    onChange={() => todoComplete(todo)}
                    checked={todo.done}
                />
                <form 
                    className={classes.root}
                    onDoubleClick={(e) => {
                        setChangeTag(false)
                        console.log(todo)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            returnText(e, todo, setChangeTitle)
                            setChangeTag(true)
                        }
                    }}
                >
                    <Box width='608px' p={2} >
                        { (changeTag) 
                        ? <Typography className={classes.title} >{changeTitle}</Typography>
                        : <TextField 
                            className={classes.input}
                            onBlur={() => setChangeTag(true)}
                            onKeyPress={(e) => {
                                if(changeTag === false && e.key === 'Enter') {
                                    changeText(changeTitle, todo)
                                    setChangeTag(true)
                                }
                            }} 
                            onChange={(e) => setChangeTitle(e.target.value)} 
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

