function HeroContainer({ children, className }) {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className={`container ${className}`}>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default HeroContainer