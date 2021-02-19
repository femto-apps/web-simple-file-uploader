import Head from "next/head";
import Link from "next/link";
import DashboardLayout from "../containers/DashboardLayout";

function FAQ() {
    return (
        <>
            <Head>
                <title>FAQ : Femto Uploader</title>
            </Head>
            <DashboardLayout active="faq">
                <div class="main">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href='/'><a>Femto</a></Link></li>
                            <li class="is-active"><a href="/faq" aria-current="page">FAQ</a></li>
                        </ul>
                    </nav>
                    <h1 class="title">
                        FAQ
                    </h1>

                    <div class="content">
                        <b>What is this?</b>
                        <p>Femto Uploader is a free service that allows people to share files and shorten URLs.  It's meant to be 'no fuss' with no invasive tracking.  The source code is openly available <a href="https://github.com/femto-apps/web-simple-file-uploader">here.</a></p>

                        <br />

                        <b>What should I not do?</b>
                        <p>Femto Uploader is <b>not</b> intended to be a bastion of free speech and will restrict content that is illegal.  We've tried to make it simple (no external dependencies) to host your own version of this site if you disagree with our decisions.  Specifically, the following items are prohibited:</p>
                        <ul>
                            <li>child pornography</li>
                            <li>malware, including "potentially unwanted applications"</li>
                            <li>botnet command and control schemes involving this service</li>
                            <li>piracy</li>
                            <li>extremist content</li>
                        </ul>
                        <p>We also recommend that you do not upload a substantial number of files (e.g. CI build artifacts, backups) or you may be asked to stop / blocked from this service.</p>

                        <br />

                        <b>What laws apply to Femto?</b>
                        <p>This site is governed by British laws.  We may also take into account laws from the Netherlands / France.  Contact us if you are worried <Link href="/contact">here</Link>.</p>

                        <br />

                        <b>What limits apply to Femto?</b>
                        <p>Uploads should be less than 8GB in size.  Uploads may be removed if inactive and larger than 1GB.</p>

                        <br />

                        <b>How stable is this service?</b>
                        <p>It varies.  Over the life time of this service being public we have had an uptime of 99.4%.  0.4% of this downtime was intentional (v1 -> v2 migration) with 0.2% being unplanned.  We expect this to increase over time as bugs are fixed.  As more people use the service we are taking further steps to improve stability.</p>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default FAQ