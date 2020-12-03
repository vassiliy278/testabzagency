import React, { Component } from 'react';
import Wrapper from './wrapper/Wrapper'
import Header from './header/Header'
import Banner from './bannerContainer/BannerContainer'
import Acquainted from './acquaintedContainer/AcquaintedContainer'
import UsersContainer from './usersContainer/UsersContainer'
import RegistrationForm from './registrationContainer/RegistrationForm'
import RadioButtons from './registrationContainer/RadioButtons'
import Modal from './registrationContainer/madalContainer/Modal'
import Footer from './footerContainer/Footer'
import './app.sass'
var validator = require("email-validator");
let initialRequestURL

//в зависимости от типа устройста (мобилка/десктоп) определяем сколько пользователей нам нужно получать
//каждый раз с бэка. мобилка-три за раз, десктоп-шесть за раз, таблетка также получает шесть
if(window.innerWidth <= 414) {
    initialRequestURL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=3'
} else (initialRequestURL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')

const tokenFetchURL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'
const positionsFetchURL = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
class App extends Component {

    //данные для всех компонентов хранит в едином стэйте
    state = { 
        users: [],
        nextPortion: '',
        totalUsers: '',
        token: '',
        positions: [],
        name: '',
        email: '',
        phone: '',
        position_id: '',

        //здесь будет объек загруженного имджа, который полетит на бэк
        image: '',

        //блок сигнализаторов/тогглеров об ошибках/недопустимых вводах в инпутах
        nameProblem: false,
        emailProblem: false,
        phoneProblem: false,
        imageProblem: false,

        //тогглер модального окна
        modalOpen: false
    }

    //болванка для HTTP запросов
    fetchModel = (url, actionFunction) => {
        fetch(url)
            .then(res =>  res.json())
            .then(data => {
                if(data.success) {
                    actionFunction(data)
                } else return
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        //первоначальный запрос на бэк, ответ с самым свежим списком юзеров
        this.fetchModel(initialRequestURL, this.initalSetUsers)

        //запрашиваем токен, помещаем его в стейт
        this.fetchModel(tokenFetchURL, data => {
            this.setState({
                token: data.token
            })
        })

        //запрашиваем список позиций для дальнейшего выбора в форме
        this.fetchModel(positionsFetchURL, data => {
            this.setState({
                positions: [...data.positions]
            })
        })

        //записываем в стейт дефолтные значения пустых инпутов (красный хайлайт) для обозначения
        //обязательных для заполнения полей
        this.setState({
            nameProblem: true,
            imageProblem: true,
            phoneProblem: true,
            emailProblem: true,
        })
    }

    //первоначально стейт заполняется самыми "свежими" юзерами
    initalSetUsers = data => {
        this.setState({
            users: [...data.users],
            nextPortion: data.links.next_url,
            totalUsers: data.total_users
        })
    }

    //подгрузка следующей порции юзеров
    showMoreButton = e => {
        e.preventDefault()
        this.fetchModel(this.state.nextPortion, data => {
            this.setState({
                users: [...this.state.users, ...data.users],
                nextPortion: data.links.next_url,
                totalUsers: data.total_users
            })
        })
    }

    //обработчик изменений в форме + валидация в зависимотси от типа инпута (тел, мэйл, имя)
    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        switch(name){
            case "name":
                this.setState({
                    name: value
                })
                if(value.length < 2  || value.length > 60)
                {
                    this.setState({
                        nameProblem: true
                    })
                    
                } else {
                    this.setState({
                        nameProblem: false
                    })
                }
                break

            case "phone":
                this.setState({
                    phone: value
                })
                if(value.length !== 9)
                {
                    this.setState({
                        phoneProblem: true
                    })
                    
                } else {
                    this.setState({
                        phoneProblem: false
                    })
                }
                break

            case "email":
                this.setState({
                    email: value
                })
                if(validator.validate(value)){
                    this.setState({
                        email: value,
                        emailProblem: false
                    })
                } else {
                    this.setState({
                        emailProblem: true
                    })
                }
                break
        }
    }

    //обработчик рабио баттонов, выбор конкретной позиции из числа вытянушвих с бэка
    handleRadioButton = (id) => {
        this.setState({
            position_id: id
        })
    }

    //функция загрузки картинки, помещение ее в стэйт (можно добавить необходимые проверки)
    //здесь мы имеем доступ ко всем значениям свойств объекта файлз и это круто :)
    uploadPic = (e) => {
        console.log('uploaded')
        this.setState({
            image: e.target.files[0],
            imageProblem: false,
        })
    }

    //обработчик сабмита формы. здесь мы провобим все нужные проверки перед отправкой объекта-тела дабы избежать
    //ошибок с бэка. Промис резолвится успехом и мы получаем модальное окно, а в финале обновляем стэйт на исходный
    //дабы обновить дефолтное отображение инпутов (пустые инпуты)
    //так же обновляем наших пользователей, помещаю свеже добавленного в самый верх списка
    signUp = (e) => {
        e.preventDefault()
        const { position_id, name, email, phone, token, image, nameProblem, 
            imageProblem, phoneProblem,emailProblem} = this.state
        var formData = new FormData()
        formData.append('position_id', position_id)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', '+380'+phone)
        formData.append('photo', image)

        if(!name || name.length<2 || name.length>60) {
            this.setState({
                nameProblem: true
            })}
        if(!email || !validator.validate(email)) {
            this.setState({
                emailProblem: true
            })}
        if(!phone || phone.length !== 9) {
            this.setState({
                phoneProblem: true
            })}
        if(!image) {
            this.setState({
                imageProblem: true
            })}
        if(!nameProblem && !emailProblem && !phoneProblem && !imageProblem){
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', 
            { 
                method: 'POST', 
                body: formData, 
                headers: { 'Token': token}, })
                .then(res => res.json()) 
                .then(data => {
                    if(data.success) { 
                        console.log('success')
                        this.setState({
                            modalOpen: true
                        })
                    } else return
                })
                .catch(err => {
                    console.log('problem')
                })
                .finally(e => {
                    this.fetchModel(initialRequestURL, this.initalSetUsers)
                    this.setState({
                        name: '',
                        phone: '',
                        email: '',
                        image: ''
                    })
                })
            }
        }
    
    //обработчик закрытия модального окна. так же обновлем стейт, что говорит нам о необходимости
    //заполнения обязятельных инпутов (красный хайлайт)
    modalClose = () => {
        this.setState({
            modalOpen: false,
            nameProblem: true,
            imageProblem: true,
            phoneProblem: true,
            emailProblem: true,
        })
    }
    render() {
        //деструктуризируем стейт, вытаскиваем свойства, нужные нам для отправки в другие компоненты
        //как пропсов
        const { 
            users, totalUsers, positions, nameProblem, 
            imageProblem, phoneProblem, emailProblem, modalOpen, name, phone, email } = this.state
        return(
            <Wrapper>
                <Header/>
                <Banner/>
                <Acquainted/>
                <UsersContainer 
                    users={users} 
                    totalUsers={totalUsers} 
                    showMore={this.showMoreButton}
                />
                <RegistrationForm
                    handleRadioButton={this.handleRadioButton}
                    handleChange={this.handleChange}
                    modalClose={this.modalClose}
                    signUp={this.signUp}
                    uploadPic={this.uploadPic}
                    positions={positions}
                    nameProblem={nameProblem}
                    imageProblem={imageProblem}
                    phoneProblem={phoneProblem}
                    emailProblem={emailProblem}
                    modalOpen={modalOpen}
                    name={name}
                    email={email}
                    phone={phone}
                />
                <Footer/>
            </Wrapper>
        )
    }
}

export default App