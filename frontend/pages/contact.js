import { faEnvelope, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";
import Obfuscate from 'react-obfuscate';
import { useState } from "react";
import * as EmailValidator from 'email-validator'

function Contact() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    let emailError

    console.log(email, EmailValidator.validate(email))

    if (email !== '' && !EmailValidator.validate(email)) {
        emailError = <p className="help is-danger">This email is invalid</p>
    }

    return (
        <>
            <Head>
                <title>Contact : Femto Uploader</title>
            </Head>
            <DashboardLayout active="contact">
                <div className="main">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li className="is-active"><a href="/contact" aria-current="page">Contact</a></li>
                        </ul>
                    </nav>
                    <h1 className="title">
                        Contact
                    </h1>

                    <br />

                    <p>The best way to contact us is via our <a href="https://discord.com/invite/e8keSUN">Discord server</a>.  You may also send your messages to <Obfuscate email="contact@femto.pw" />.</p>

                    <br />
                    <hr />
                    <br />

                    <p className="subtitle">
                        Form
                    </p>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input className={`input ${emailError ? 'is-danger' : ''}`} type="email" placeholder="hello@there.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                        {emailError}
                    </div>

                    <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="Your message here..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                    </div>


                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Contact