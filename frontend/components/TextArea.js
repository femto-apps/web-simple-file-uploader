export default function TextArea({ placeholder, style, value, onChange }) {
    return (
        <textarea class="textarea" placeholder={placeholder} style={style} value={value} onChange={onChange}></textarea>
    )
}