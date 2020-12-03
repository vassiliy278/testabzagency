import React from 'react';

export default function RadioButtons(props) {
    const { positions, handleChoose } = props
    return(
        <>  
            {/* достаем список всех должностей, прилетающих к нам с бэка */}
            {positions.map( e => 
                <div key={e.id} className="radio_buttons_container">
                    <input 
                    onChange={() => handleChoose(e.id)} 
                    type="radio" 
                    name="position" 
                    id={e.id} 
                    value={e.name}/>
                    <label id="radio_button" htmlFor={e.id}>{e.name}</label>
                </div>
            )}
        </>
    )
}