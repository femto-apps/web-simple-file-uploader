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
        emailError = <p class="help is-danger">This email is invalid</p>
    }

    return (
        <>
            <Head>
                <title>Contact : Femto Uploader</title>
            </Head>
            <DashboardLayout active="contact">
                <div class="main">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li class="is-active"><a href="/contact" aria-current="page">Contact</a></li>
                        </ul>
                    </nav>
                    <h1 class="title">
                        Contact
                    </h1>

                    <br />

                    <p>The best way to contact us is via our <a href="https://discord.com/invite/e8keSUN">Discord server</a>.  You may also send your messages to <Obfuscate email="contact@femto.pw" />.</p>

                    <br />
                    <hr />
                    <br />

                    <p class="subtitle">
                        Form
                    </p>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class={`input ${emailError ? 'is-danger' : ''}`} type="email" placeholder="hello@there.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span class="icon is-small is-left">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                        {emailError}
                    </div>

                    <div class="field">
                        <label class="label">Message</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Your message here..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                    </div>


                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Submit</button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Contact