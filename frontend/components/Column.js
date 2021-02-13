export default function Column({ children, size }) {
    return (
        <div className={`column ${size}`}>
            {children}
        </div>
    )
}