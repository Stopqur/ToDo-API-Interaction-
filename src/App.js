import React from 'react'
import TodoMain from './TodoMain/TodoMain'

export default function App() {

    function createBlock () {
        return (
            console.log("asdkfsa;ldfkn")
        )
    }

    return (
        <TodoMain createBlock={createBlock}/>
    )
}