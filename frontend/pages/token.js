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
        <div class={`modal ${modalDisplayed ? 'is-active' : ''}`}>
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Are you sure?</p>
                    <button class="delete" onClick={() => setModalDisplayed(false)}></button>
                </header>
                <section class="modal-card-body">
                    Regenerating your token will revoke <b>all</b> existing tokens, meaning that any existing profiles you use to upload (e.g. via CLI, ShareX, etc) will stop working.
      </section>
                <footer class="modal-card-foot">
                    <a class="button is-danger" onClick={() => { resetToken(); setModalDisplayed(false) }}>Regenerate Token</a>
                    <a class="button" onClick={() => setModalDisplayed(false)}>Cancel</a>
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
                <div class="main">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li class="is-active"><a href="/contact" aria-current="page">Manage Token</a></li>
                        </ul>
                    </nav>
                    <h1 class="title">
                        Manage Token
                    </h1>

                    <p style={{ paddingBottom: '1rem' }}>This token can be used to impersonate you on this service.  Treat it like a password and never give it out. Resetting it will <b>invalidate</b> all existing tokens.</p>

                    {tokenError &&
                        <div class="notification is-danger" style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem' }}>
                            {tokenError}
                        </div>
                    }
                    {!tokenError && <div class="field has-addons">
                        <div class="control has-icons-right is-expanded">
                            {!tokenLoading &&
                                <input type="text" className={`input ${copied ? 'is-success' : ''}`} value={tokenData.data.token} disabled />
                            }
                            {tokenLoading &&
                                <input type="text" className="input" value='Loading...' disabled />
                            }
                            {copied && <p class="help is-success">Token copied to clipboard</p>}
                        </div>
                        <p class="control">
                            <CopyToClipboard text={!tokenLoading && !tokenError ? tokenData.data.token : 'Loading...'}>
                                <Button onClick={() => setCopied(true)} className="is-info">Copy</Button>
                            </CopyToClipboard>
                        </p>
                    </div>}

                    <br />
                    <hr />
                    <br />

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link is-danger" onClick={() => {
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