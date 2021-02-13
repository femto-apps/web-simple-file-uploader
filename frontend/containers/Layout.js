import Header from '../containers/Header'

function Layout({ children, user }) {
    return (
        <>
            <Header />
            { children }
            <p>Footer</p>
        </>
    )
}

export default Layout;