import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";
import { useState } from "react";
import useToken, { resetToken } from "../data/useToken";
import Button from "../components/Button";

import { CopyToClipboard } from 'react-copy-to-clipboard'

function Token() {
    const { loading: tokenLoading, data: tokenData, error: tokenError, mutate: tokenMutate } = useToken()
    const [copied, setCopied] = useState(false)
    const [modalDisplayed, setModalDisplayed] = useState(false)

    const modal = (
        <div className={`modal ${modalDisplayed ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Are you sure?</p>
                    <button className="delete" onClick={() => setModalDisplayed(false)}></button>
                </header>
                <section className="modal-card-body">
                    Regenerating your token will revoke <b>all</b> existing tokens, meaning that any existing profiles you use to upload (e.g. via CLI, ShareX, etc) will stop working.
      </section>
                <footer className="modal-card-foot">
                    <a className="button is-danger" onClick={() => { resetToken(); setModalDisplayed(false) }}>Regenerate Token</a>
                    <a className="button" onClick={() => setModalDisplayed(false)}>Cancel</a>
                </footer>
            </div>
        </div>
    )

    return (
        <div className={modalDisplayed ? 'is-clipped' : ''}>
            <Head>
                <title>Manage Token : Femto Uploader</title>
            </Head>
            {modal}
            <DashboardLayout active="token">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/contact" aria-current="page">Manage Token</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Manage Token
                    </h1>

                    <p style={{ paddingBottom: '1rem' }}>This token can be used to impersonate you on this service.  Treat it like a password and never give it out. Resetting it will <b>invalidate</b> all existing tokens.</p>

                    {tokenError &&
                        <div className="notification is-danger" style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem' }}>
                            {tokenError}
                        </div>
                    }
                    {!tokenError && <div className="field has-addons">
                        <div className="control has-icons-right is-expanded">
                            {!tokenLoading &&
                                <input type="text" className={`input ${copied ? 'is-success' : ''}`} value={tokenData.data.token} disabled />
                            }
                            {tokenLoading &&
                                <input type="text" className="input" value='Loading...' disabled />
                            }
                            {copied && <p className="help is-success">Token copied to clipboard</p>}
                        </div>
                        <p className="control">
                            <CopyToClipboard text={!tokenLoading && !tokenError ? tokenData.data.token : 'Loading...'}>
                                <Button onClick={() => setCopied(true)} className="is-info">Copy</Button>
                            </CopyToClipboard>
                        </p>
                    </div>}

                    <br />
                    <hr />
                    <br />

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link is-danger" onClick={() => {
                                setModalDisplayed(true)
                            }}>Regenerate Token</button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}

export default Token