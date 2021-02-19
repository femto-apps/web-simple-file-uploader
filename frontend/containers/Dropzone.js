import { useDropzone } from 'react-dropzone'
import FilesTab from './FilesTab'

function DropzoneWrapper({ onFilesUpload, children }) {
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: onFilesUpload,
        noClick: true
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">femto.pw</h1>
                        <h2 className="subtitle">Upload and share files for free</h2>
                        <Columns>
                            <Column></Column>
                            <Column>
                                <Tabs active={uploadType} setActive={setUploadType} tabs={[
                                    { text: 'Files', icon: faFileUpload },
                                    { text: 'Text', icon: faQuoteLeft },
                                    { text: 'Shorten', icon: faLink },
                                    { text: 'Config', icon: faCogs }
                                ]} />
                                <div style={{ paddingBottom: '1.5rem' }}>
                                    {uploadType === 'Files' && <FilesTab onClick={open} />}
                                    {uploadType === 'Text' &&
                                        <>
                                            <TextArea placeholder={'Text to upload'} value={textValue} onChange={(event) => setTextValue(event.target.value)} style={{ marginBottom: '0.5em' }} />
                                            <Button onClick={uploadText}>Upload Text</Button>
                                        </>
                                    }
                                    {uploadType === 'Shorten' &&
                                        <>
                                            <TextInput placeholder={'Link to shorten'} style={{ marginBottom: '0.5em' }} />
                                            <Button>Shorten URL</Button>
                                        </>
                                    }
                                    {uploadType === 'Config' &&
                                        <>
                                            <p>Nothing to see here...</p>
                                            {/* <Field>
                                            <TextInput iconLeft='fa-key' label='Password' placeholder='Leave blank for none' value={password} setValue={setPassword} />
                                        </Field>
                                        <Field id="expiry">
                                            <RangeInput label='Expiry Time' step='1' min='0' max='10' value={expiry} setValue={(e) => setExpiry(e.target.value)} id='expiry' outputFormat={expiryOutputName} />
                                        </Field>
                                        <Field>
                                            <CheckboxInput label="Destroy after download?" />
                                        </Field>
                                        <Field>
                                            <CheckboxInput label="Peer to peer streaming?" />
                                        </Field> */}
                                        </>
                                    }
                                    <aside>
                                        <ul>
                                            {uploads.map((file, index) => (
                                                shorts[index] ?
                                                    (<li key={index}>
                                                        {file.path} - {file.size} bytes - <Link href={`/${shorts[index]}`}>{'/' + shorts[index]}</Link>
                                                    </li>) : (<li key={index}>
                                                        {file.path} - {file.size} bytes - uploading...
                                                    </li>)
                                            ))}
                                        </ul>
                                    </aside>
                                </div>
                                <Link href='/faq'>
                                    <a title="FAQ" style={{ display: 'inline-block', width: '2em' }}>
                                        <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faQuestionCircle} />
                                    </a>
                                </Link>
                                <a title="Stats" style={{ display: 'inline-block', width: '2em' }}>
                                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faChartArea} />
                                </a>
                                <a href="https://github.com/femto-apps/web-simple-file-uploader" title="GitHub" style={{ display: 'inline-block', width: '2em' }}>
                                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faGithub} />
                                </a>
                                <a title="Dashboard" style={{ display: 'inline-block', width: '2em' }}>
                                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faTachometerAlt} />
                                </a>
                            </Column>
                            <Column></Column>
                        </Columns>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dropzone