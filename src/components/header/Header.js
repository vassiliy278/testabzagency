import React from 'react';
import './header.sass'
import imgLogo from '../../img/logo.svg'
import burger from '../../img/menu-icon.svg'
//передаем управление открытия/закрытия мобильного меню в функцию
function openCloseMoobileMenu() {
    const a = document.querySelector('.menu_list_mobile_wrapper')
    a.classList.toggle('show_mobile_menu')
}

//функция роутинга для жесктопного меню
function goToRegistration(z) {
        z.preventDefault()
        const listItems = document.querySelectorAll('.menu_list li')
        listItems.forEach(e => {
            e.classList.remove('clicked')
            })
        z.target.classList.add('clicked')
        window.location = '#register'
}

//функция роутинга для мобильного меню плюс закрытие меню при клике на сабменю айтем
function goToRegistrationMobile(e) {
    goToRegistration(e)
    openCloseMoobileMenu()
}
export default function Header() {
    return (

        <nav className="navigation_wrapper">
            <img className="logo" src={imgLogo} alt="logo"/>
            <img className="mobile" 
                src={burger} 
                alt="close menu"
                onClick={openCloseMoobileMenu}
                />
            <ul className="menu_list">
                <li onClick={e => goToRegistration(e)}>About me</li>
                <li onClick={e => goToRegistration(e)}>Relationships</li>
                <li onClick={e => goToRegistration(e)}>Requirements</li>
                <li onClick={e => goToRegistration(e)}>Users</li>
                <li onClick={e => goToRegistration(e)}>Sign Up</li>
            </ul>
            {/* блок мобильной навигации рендерим вместе с десктопом для поддержания слайтли адаптивности */}
            <div className="menu_list_mobile_wrapper mobile">
                <ul className="menu_list_mobile_block">
                    <li onClick={e => goToRegistrationMobile(e)}>About me</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Relationships</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Users</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Sign Up</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Terms and Conditions</li>
                </ul>
                <ul className="menu_list_mobile_block">
                    <li onClick={e => goToRegistrationMobile(e)}>How it Works</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Partnership</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Help</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Leave testimonial</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Contact us</li>
                </ul>
                <ul className="menu_list_mobile_block">
                    <li onClick={e => goToRegistrationMobile(e)}>Articles</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Our news</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Testimonials</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Licenses</li>
                    <li onClick={e => goToRegistrationMobile(e)}>Privacy Policy</li>
                </ul>
            </div>
        </nav>
    )
}

