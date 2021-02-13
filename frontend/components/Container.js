export default function Container({ name, children }) {
    return (
        <div className='container'>
            {children}
        </div>
    )
}