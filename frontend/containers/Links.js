import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faChartArea, faQuestionCircle, faTachometerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

function Links({ }) {
    return (
        <>
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
        </>
    )
}

export default Links