export default function Navbar({ children }) {
    return (
        <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='container'>
                {children}
            </div>
        </nav>
    )
}