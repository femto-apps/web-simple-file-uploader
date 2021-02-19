import Button from "../components/Button";
import TextInput from "../components/TextInput";

function ShortenTab({ }) {
    return (
        <>
            <TextInput placeholder={'Link to shorten'} style={{ marginBottom: '0.5em' }} />
            <Button>Shorten URL</Button>
        </>
    )
}

export default ShortenTab;