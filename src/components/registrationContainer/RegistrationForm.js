import React from 'react'
import RadioButtons from './RadioButtons'
import Modal from './madalContainer/Modal'
import './registrationForm.sass'

export default function Registration(props) {
    const { handleRadioButton, handleChange, modalClose, signUp, uploadPic, positions, 
        nameProblem, imageProblem, phoneProblem, emailProblem, modalOpen, name, phone, email} = props
    return(
        <>
        <div className="form_wrapper" id="register">
            <h1>Register to get a work</h1>
            <p>Attention! After successful registration and alert, update the list of users in the block from the top</p>
            <form onSubmit={e => signUp(e)} >

                {/* 
                    1) каждый из инпутов рендерим по условию (по результату проверки валидности) 
                    2) используем универсальный обработчик handleChange для записи значений в стейт
                    3) значения инпута "value" берем из стейта дабы иметь полный контроль отображаемого контента, 
                       контролируем все через единый стэйт
                */}
                <label htmlFor="name">Name</label>
                {nameProblem ?
                    <div className="name_input_wrapper">
                        <input className="invalid_class" onChange={e => handleChange(e)} value={name} type="text" id="name" name="name" placeholder="Your name" minLength="2" maxLength="60"/>
                        <span className="warning">Error</span>
                    </div> :
                    <div className="name_input_wrapper">
                        <input onChange={e => handleChange(e)} value={name} type="text" id="name" name="name" placeholder="Your name" minLength="2" maxLength="60"/>
                    </div>
                }
            
                <label htmlFor="email">Email</label>
                {emailProblem ?
                    <div className="email_wrapper">
                        <input className="invalid_class" onChange={e => handleChange(e)} value={email} type="text" id="email" name="email" placeholder="Your email" minLength="2" maxLength="100" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                        <span className="warning">Error</span>
                    </div> :
                    <div className="email_wrapper">
                        <input onChange={e => handleChange(e)} value={email} type="text" id="email" name="email" placeholder="Your email" minLength="2" maxLength="100" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                    </div>
                }
                
                <label htmlFor="phone">Phone number</label>
                {phoneProblem ? 
                    <div className="phone_wrapper">
                        <span className="number_prefix">+380</span>
                        <input className="invalid_class" onInput={e => handleChange(e)} value={phone} type="text" id="phone" name="phone" placeholder=" XX XXX XX XX" minLength="9" maxLength="9"/>
                        <span className="warning">Error</span>
                    </div> :
                    <div className="phone_wrapper">
                        <span className="number_prefix">+380</span>
                        <input onInput={e => handleChange(e)} value={phone} type="text" id="phone" name="phone" placeholder=" XX XXX XX XX" minLength="9" maxLength="9"/>
                        <p className="phone_description">Enter phone number in open format</p>
                    </div>
                }

            <p className="radio_buttons_description">Select your position</p>
            <RadioButtons positions={positions} handleChoose={handleRadioButton}/>

            <div className="file_input">
                <p>Photo</p>
                {imageProblem ?
                <div className="photo_button_wrapper invalid_class">
                    <p className="photo_button_text">No file choosen</p>
                    <span className="warning">Error</span>
                    <label htmlFor="photo" className="browse_button">Browse</label>
                    <input onChange={e => uploadPic(e)} type="file" id="photo" name="photo" accept=".jpg, .jpeg"/>
                </div> :
                <div className="photo_button_wrapper">
                    <p className="photo_button_text ">Upload your photo</p>
                    <label htmlFor="photo" className="browse_button">Browse</label>
                    <input onChange={e => uploadPic(e)} type="file" id="photo" name="photo" accept=".jpg, .jpeg"/>
                </div>
                }
            </div>
            
            <input type="submit" id="submit_button" value="Sign up now" />
            </form>
        </div>
        {/* 
            1) модалку позиционируем обсолютно, поэтому нет значения где ее размещать, рендерим по условию.
            2) все тогглы храним в едином стейте
        */}
        {modalOpen && <Modal action={() => modalClose()}/>}
        </>
    )
    }