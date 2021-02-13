export default function Field({ children, id }) {
    return (
        <div className={`field`} id={id}>
            {children}
        </div>
    )
}