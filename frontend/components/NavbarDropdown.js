export default function NavbarDropdown({ name, children }) {
    return (
        <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link'>{name}</a>
            <div className='navbar-dropdown'>
                {children}
            </div>
        </div>
    )
}