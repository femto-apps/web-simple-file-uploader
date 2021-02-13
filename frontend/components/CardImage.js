export default function CardImage({ className, src, alt }) {
    return (
        <div className="card-image">
            <figure className={`image ${className}`}>
                <img src={src} alt={alt} />
            </figure>
        </div>
    )
}