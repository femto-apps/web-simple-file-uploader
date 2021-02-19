import { useCallback, useState } from "react";
import Button from "../components/Button";
import TextArea from "../components/TextArea";

function FilesTab({ uploadFile }) {
    const [textValue, setTextValue] = useState('')
    const [errorValue, setErrorValue] = useState('')

    const uploadText = useCallback(async event => {
        if (!textValue.length) {
            return setErrorValue('Cannot upload an empty file.')
        }

        setErrorValue('')

        uploadFile([new File([new Blob([textValue])], 'uploaded-text.txt')])
        setTextValue('')
    })

    let error
    if (errorValue) {
        error = (
            <div className="notification is-danger" style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem' }}>
                <button className="delete" onClick={() => setErrorValue('')}></button>
                {errorValue}
            </div>
        )
    }

    return (
        <>
            {error}
            <TextArea placeholder={'Text to upload'} value={textValue} onChange={(event) => setTextValue(event.target.value)} style={{ marginBottom: '0.5em' }} />
            <Button onClick={uploadText}>Upload Text</Button>
        </>
    )
}

export default FilesTab;