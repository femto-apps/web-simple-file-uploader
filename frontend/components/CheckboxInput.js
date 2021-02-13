export default function CheckboxInput({ label }) {
    return (
        <div className="control">
            <label className="checkbox">
                <input type="checkbox" /> {label}
            </label>
        </div>
    )
}