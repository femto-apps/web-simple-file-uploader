import Card from '../components/Card'
import CardContent from '../components/CardContent'
import CardFooter from '../components/CardFooter'
import CardFooterItem from '../components/CardFooterItem'
import CardHeader from '../components/CardHeader'
import CardHeaderTitle from '../components/CardHeaderTitle'
import CardImage from '../components/CardImage'

export function Footer({ progress }) {
    if (progress) {
        return (
            <>
                <CardFooterItem href="#">
                    {Math.round(progress)}%
                </CardFooterItem>
                <progress className="upload progress is-primary" value={progress} max="100"></progress>
            </>
        )
    }

    return (
        <>
            <CardFooterItem href="#">Link</CardFooterItem>
            <CardFooterItem href="#">Direct Link</CardFooterItem>
            <CardFooterItem href="#">More Info</CardFooterItem>
        </>
    )
}

export default function Upload({ progress, name, type, src, date }) {
    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle>{name}</CardHeaderTitle>
            </CardHeader>

            {type.startsWith('video') &&
                <div>
                    <figure>
                        <video controls>
                            <source src={src} type={type} />
                            Your browser does not support the video tag.
                        </video>
                    </figure>
                </div>
            }

            {type.startsWith('image') &&
                <CardImage src={'https://bulma.io/images/placeholders/1280x960.png'} alt={'Placeholder image'} className='is4by3' />
            }

            <CardContent>
                <time>{date}</time>
            </CardContent>
            <CardFooter>
                <Footer progress={progress} />
            </CardFooter>
        </Card>
    )
}