import React from 'react';
import './userCard.sass'
import noPhoto from '../../img/photo-cover.png'
const nullPic = 'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png'
export default function UserCard({users}) {
    return (
        <>
            {/* карточку пользователя рендерим только в случае если нам пришел массив с пользователями  */}
            {users && users.map(e =>
                <div className="card_container" key={e.id}>
                    <div className="card_wrapper">
                    {e.photo === nullPic ? 
                    // 1)рендерим аватарку по условию, если с бэка приходит ссылка, ведущая на ошибку 404
                    //   помещаем на аватарку инкогнито заглушку
                    // 2)в вашем списке на бэке такая аватарка одна - я ее захардкодил
                    //   другого решения определить явно, вернет ссылка файл или вернет 404, к сожалению
                    //   не нашел :(
                        <img src={noPhoto}></img> :
                        <img src={e.photo}></img>
                    }
                    <h2>{e.name}</h2>
                    <p className="position">{e.position}</p>
                    
                    {e.email.length > 25 ?
                    // скрываем слишком длинное мыло, более 20 символов, окончание троеточием и только при ховере
                    // его показываем, просто записываем в аттрибут тайтл :)
                        <p className="email" title={e.email}>
                            {e.email.substr(0,20)+`...`}
                        </p> :
                        <p className="email">
                            {e.email}
                        </p> 
                    }
                    <p>{e.phone}</p>
                    </div>
                </div>
            )}
        </>
    )
}