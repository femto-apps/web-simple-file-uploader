import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Tabs({ active, setActive, tabs, alignment = 'is-centered' }) {
    // tabs = [{ text: 'Upload Files', icon: 'file-upload' }]
    return (
        <div className={`tabs ${alignment}`} style={{ marginBottom: '0.5rem' }}>
            <ul>
                {
                    tabs.map(({ text, icon }) => <li className={active === text ? 'is-active' : ''} key={text}>
                        <a onClick={() => {
                            setActive(text)
                        }}>
                            {icon ? <span className="icon is-small"><FontAwesomeIcon icon={icon} /></span> : null}
                            <span>{text}</span>
                        </a>
                    </li>)
                }
            </ul>
        </div>
    )
}