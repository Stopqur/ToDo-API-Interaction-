import React from 'react'

export default function SortIcon (props) {
    const icon = './src/image/arrow.svg'
    const classes = `btnSort__icon ${props.rotate}`
    return <img className = {classes} src='https://img.icons8.com/ios-filled/50/000000/long-arrow-up.png'></img>
}