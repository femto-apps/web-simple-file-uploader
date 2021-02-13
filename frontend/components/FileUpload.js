export default function FileUpload({ style, id, multiple, text }) {
    // tabs = [{ text: 'Upload Files', icon: 'file-upload' }]
    return (
        <div className={`file has-name ${style}`} id={id}>
            <label className="file-label">
                <input className="file-input" type="file" name="uploads" multiple={multiple} />
                <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">{text}</span>
                </span>
            </label>
        </div>
    )
}