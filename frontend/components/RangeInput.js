export default function RangeInput({ label, id, step, min, max, value, setValue, outputFormat }) {
    return (
        <>
            {label && <label className="label">{label}</label>}
            <div className='control'>
                <input className="has-output slider is-fullwidth" type="range" id={id} step={step} min={min} max={max} value={value} onChange={setValue} />
                <output htmlFor={id}>{outputFormat ? outputFormat(value) : value}</output>
            </div>
        </>
    )
}