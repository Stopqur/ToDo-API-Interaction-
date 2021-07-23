import React from 'react'

function FormInput({onClickAdd, changeValue, onChange}) {
    return (
        <input  
            id = "main__inputId" 
            className = "main__input" 
            type="text" 
            value={changeValue} 
            onChange={onChange} 
            placeholder="Write a goal..."
            autoComplete='off'
        />
    )
}

export default FormInput