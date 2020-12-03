import React, { Component } from 'react';
import UserCard from './UserCard'
import './users.sass'

export default function Users(props) {
    const { users, totalUsers, showMore } = props
    return (
        <div className="users_wrapper">
            <h1>Our cheerful users</h1>
            <p>Attention! Sorting users by registration date</p>
            <div className="users_cards_wrapper">
                <UserCard users={users}/>
            </div>

            {/* 
                кнопку "показать больше" рендерим по необходимости: если на бэке более нету доступных
                юзеров - не рендерим ее вовсе
            */}
            {users.length < totalUsers &&
                <form onClick={(e) => showMore(e)}>
                    <input type="submit" value="Show more" />
                </form>
            }

        </div>
    )
}
