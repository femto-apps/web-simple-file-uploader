import Column from "../components/Column"
import Columns from "../components/Columns"

import filesize from "filesize"
import Link from "next/link"

function File({ file, key, forceUpdate }) {
    let error
    if (file.error) {
        error = (
            <div className="notification is-danger" style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem', marginBottom: '0.5rem', marginTop: '1rem' }}>
                <button className="delete" onClick={() => { file.error = ''; forceUpdate() }}></button>
                {file.error}
            </div>
        )
    }

    const path = (
        <div className="has-text-left">
            {file.path}
        </div>
    )

    return (
        <div style={{ paddingBottom: '0.5rem' }} key={key}>
            <span>
                {error}
                <Columns>
                    <Column>
                        {file.short ? <Link href={`/${file.short}`}><a>{path}</a></Link> : path}

                    </Column>
                    <Column>
                        <div className="has-text-right">
                            {filesize(file.size)}
                        </div>
                    </Column>
                </Columns>
            </span>
            <div>
                {file.progress ?
                    <progress className="progress is-success is-small" value={file.progress * 100} max="100">{file.progress * 100}%</progress>
                    : null}
            </div>
        </div>
        // <li key={key}>
        //     {file.path} - {file.size} bytes
        //     <progress className="progress is-success" value="60" max="100">60%</progress>
        // </li>
    )
}

function FileList({ files, forceUpdate }) {
    return (
        <div className='upload'>
            <div className='upload-status'>
                <br />
                {files.map((file, index) => <File file={file} key={index} forceUpdate={forceUpdate} />)}
            </div>
        </div>
    )
}

export default FileList