import Link from 'next/link'

export default function NavbarItem({ href, children }) {
    if (href) {
        return (
            <Link href={href}>
                <a className='navbar-item'>
                    {children}
                </a>
            </Link>
        )
    }

    return (
        <div className='navbar-item'>
            {children}
        </div>
    )
}