import Head from 'next/head'
import Layout from '../containers/Layout'

import Section from '../components/Section'
import Container from '../components/Container'
import Columns from '../components/Columns'
import Column from '../components/Column'
import Subtitle from '../components/Subtitle'
import Field from '../components/Field'
import { useState } from 'react'
import TextInput from '../components/TextInput'
import RangeInput from '../components/RangeInput'
import CheckboxInput from '../components/CheckboxInput'
import Tabs from '../components/Tabs'
import FileUpload from '../components/FileUpload'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import Upload from '../containers/Upload'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faChartArea, faTachometerAlt, faFileUpload, faQuoteLeft, faLink, faCogs } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function expiryOutputName(val) {
    const expiry = ['1 hour', '3 hours', '6 hours', '1 day', '3 days', '1 week', '2 weeks', '1 month', '3 months', '6 months', 'never']
    return expiry[Number(val)]
}

function Home(props) {
    const [password, setPassword] = useState('')
    const [expiry, setExpiry] = useState('10')
    const [uploadType, setUploadType] = useState('Files')

    return (
        <>

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
                                {uploadType === 'Files' &&
                                    <div className="field dz-container"><div className="control is-expanded">
                                        <div id="dropzone" className="button is-outlined is-fullwidth is-unselectable dz-clickable">
                                            <span className="icon">
                                                <i className="icon-upload-cloud"></i>
                                            </span>
                                            <span>Upload Files</span>
                                        </div>
                                        <h2 className="subtitle" style={{ fontSize: '1rem', paddingBottom: '1.5rem', paddingTop: '0.5rem' }}>Maximum upload size per file is 8GB</h2>
                                    </div></div>}
                                {uploadType === 'Text' &&
                                    <>
                                        <TextArea placeholder={'Text to upload'} style={{ marginBottom: '0.5em' }} />
                                        <Button style={{ display: 'block', marginBottom: '1.5rem' }}>Upload Text</Button>
                                    </>
                                }
                                {uploadType === 'Shorten' &&
                                    <>
                                        <TextInput placeholder={'Link to shorten'} style={{ marginBottom: '0.5em' }} />
                                        <Button style={{ display: 'block', marginBottom: '1.5rem' }}>Upload Text</Button>
                                    </>
                                }
                                <a title="FAQ" style={{ display: 'inline-block', width: '2em' }}>
                                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faQuestionCircle} />
                                </a>
                                <a title="Stats" style={{ display: 'inline-block', width: '2em' }}>
                                    <FontAwesomeIcon style={{ fontSize: '1.25em' }} icon={faChartArea} />
                                </a>
                                <a title="GitHub" style={{ display: 'inline-block', width: '2em' }}>
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
        </>
    )

    return (
        <Layout>
            <Section>
                <Container>
                    <Columns>
                        <Column size='is-one-third'>
                            <Subtitle>Options</Subtitle>
                            <Field>
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
                            </Field>
                        </Column>
                        <Column>
                            <Tabs active={uploadType} setActive={setUploadType} tabs={[
                                { text: 'Upload Files', icon: 'file-upload' },
                                { text: 'Upload Text', icon: 'quote-left' },
                                { text: 'Shorten Link', icon: 'link' }
                            ]} />
                            {uploadType === 'Upload Files' &&
                                <FileUpload style={'is-boxed is-primary is-centered'} id='uploads' multiple={true} text='Upload files' />
                            }
                            {uploadType === 'Upload Text' &&
                                <>
                                    <TextArea placeholder={'Text to upload'} />
                                    <br />
                                    <Button className={'is-primary'}>Upload Text</Button>
                                </>
                            }
                            {uploadType === 'Shorten Link' &&
                                <>
                                    <TextInput placeholder={'Link to shorten'} />
                                    <br />
                                    <Button className={'is-primary'}>Shorten Link</Button>
                                </>
                            }
                        </Column>
                    </Columns>
                    <Columns>
                        <Column>
                            <Upload progress={23} name="Example File.mp4" type="video/mp4" src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" date="11:09 PM - 1 Jan 2016" />
                            <br />
                            <Upload name="Example File.png" type="image/png" src="https://bulma.io/images/placeholders/1280x960.png" date="11:09 PM - 1 Jan 2016" />
                        </Column>
                        <Column>
                            <Upload progress={83} name="Example File.mp4" type="video/mp4" src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" date="11:09 PM - 1 Jan 2016" />
                            <br />
                            <Upload name="Example File.png" type="image/png" src="https://bulma.io/images/placeholders/1280x960.png" date="11:09 PM - 1 Jan 2016" />
                        </Column>
                        <Column>
                            <Upload name="Example File.png" type="image/png" src="https://bulma.io/images/placeholders/1280x960.png" date="11:09 PM - 1 Jan 2016" />
                        </Column>
                    </Columns>
                </Container>
            </Section>
        </Layout >
    )
}

export default Home;