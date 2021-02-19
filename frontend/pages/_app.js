// import '../../node_modules/bulma/css/bulma.css'
import '../styles/bulma/bulmaswatch.scss'
import '../styles/globals.css'
import '../styles/test.css'

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
