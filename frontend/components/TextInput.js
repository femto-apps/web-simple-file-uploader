export default function TextInput({ label, placeholder, value, setValue, iconLeft, style }) {
    return (
        <>
            {label && <label className="label">{label}</label>}
            <div className={`control ${iconLeft ? 'has-icons-left' : ''}`} style={style}>
                <input className="input" type="text" placeholder={placeholder} />
                {iconLeft && <span className="icon is-small is-left"><i className={`fas ${iconLeft}`}></i></span>}
            </div>
        </>
    )
}