import React from 'react';
import './bannerContainer.sass'
import banner from '../../img/banner-photo.jpg'
export default function BannerContainer() {
    return (
            <div className="banner_container_wrapper">
                {/* <img src={banner} className="banner_img" width="100"></img> */}
                <h1>test assignment <br/> for frontend <br/> developer position</h1>
                <p className="desktop">We kindly remind you that your test assignment should be submitted
                    as a link to github/bitbucket repository. Please be patient, we consider
                    and respond to every application that meets minimum requirements.
                    We look forward to your submission. Good luck! The photo has to scale
                    in the banner area on the different screens.
                </p>
                <p className="mobile">We kindly remind you that your test assignment should be submitted
                    as a link to github/bitbucket repository.</p>
                <form action="#register">
                    <input type="submit" value="Sign up now" />
                </form>
            </div>
    )
}