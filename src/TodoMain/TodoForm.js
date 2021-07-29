import React, {useState} from 'react'
import { Box, InputLabel, FormControl, Input, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    title: {
        color: 'white'
    },
    dateText: {
        color: 'orange'
    }
}))

export default function TodoForm({ addTodo }) {

    const classes = useStyles();

    const [titleInput, setTitleInput] = useState('')

    function handleFormSubmit (event) {
        if(titleInput !== '') {
            event.preventDefault();
            addTodo(titleInput, setTitleInput);
        } event.preventDefault();
    }

    function handleChangeInput (event) {
        setTitleInput(event.target.value)
    }


    return ( 
        <Box mt={3} pb={5}>
            <InputLabel>Ввод текста</InputLabel>
            <FormControl 
            component='form' 
            style={ { display: 'flex'} } 
            onSubmit={(e) => handleFormSubmit(e)}>
                <Box display='flex' justifyContent="space-around"> 
                    <Input 
                        style={ { width: '70%'} }
                        type="text"
                        value={titleInput}
                        onChange={(e) => handleChangeInput(e)} 
                        placeholder="Write a goal..."
                        className={classes.title}
                    >
                    </Input>
                    <Button variant="contained" color="primary" style={ { width: '20%', marginLeft: '90px'} } type="submit">Create</Button>
                </Box>
            </FormControl>
        </Box>
    )
}