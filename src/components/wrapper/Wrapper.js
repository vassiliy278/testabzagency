import './wrapper.sass'
export default function Wrapper({children}) {
    return(
        <div className="wrapper">
            {children}
        </div>
    )
}