import React from 'react';
import './acquaintedContainer.sass'
import laptopMan from '../../img/man-laptop-v1.svg'

export default function AcquaintedContainer() {
    return(
        <div className="acquainted_container">
            <h1>Let's get acquainted</h1>
            <div className="laptop_man_container">
                <img className="laptop_man_picture" src={laptopMan}></img>
                <div className="laptop_man_description">
                    <h2>I am cool frontend developer</h2>
                    <p>We will evaluate how clean your approach to writing CSS and Javascript
                        code is. You can use any CSS and Javascript 3rd party libraries whithout any
                        restriction.
                    </p>
                    <p>If 3rd party css/javascript libraries are added to the project via
                        browser/npm/yarn you will get bonus points. If you use any task runner
                        (gulp/webpack) you will get bonus points as well. Slice service directory
                        page PSD mockup into HTML5/CSS3.
                    </p>
                    <form action="#register">
                        <input type="submit" value="Sign up now" />
                    </form>
                </div>
            </div>
        </div>
    )
}