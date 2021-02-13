import Link from 'next/link'

export default function CardFooterItem({ children, href }) {
    if (href) {
        return (
            <Link href={href}>
                <a className="card-footer-item">
                    {children}
                </a>
            </Link>
        )
    }

    return (
        <a className="card-footer-item">
            {children}
        </a>
    )
}