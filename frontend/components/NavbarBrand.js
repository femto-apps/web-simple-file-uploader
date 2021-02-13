import Link from 'next/link'

export default function NavbarBrand({ children }) {
    return (
        <div className='navbar-brand'>
            <Link href='/'>
                <a className='navbar-item'>{children}</a>
            </Link>
            <a className='navbar-burger burger' role='button' aria-label='menu' aria-expanded='false' data-target='navbar'>
                <span aria-hidden />
                <span aria-hidden />
                <span aria-hidden />
            </a>
        </div>
    )
}