import Link from 'next/link'

export default function Button({ href, className = '', children, onClick, style }) {
    if (href) {
        return (
            <Link href={href}>
                <a className={`button ${className}`} style={style}>{children}</a>
            </Link>
        )
    }

    return (
        <a className={`button ${className}`} onClick={onClick} style={style}>{children}</a>
    )
}