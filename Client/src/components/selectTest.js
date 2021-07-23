import React, { useState } from 'react'

const Select = () => {
    const [lang, setlang] = useState("EN")
    const change =(e)=>{
        const {value}=e.target
        setlang(value)
    }
    console.log(lang);
    return <>
        <select onChange={change}>
            <option value='EN'>EN</option>
            <option value='RU'>RU</option>
            <option value='HY'>HY</option>
        </select>
    </>

}
export default Select