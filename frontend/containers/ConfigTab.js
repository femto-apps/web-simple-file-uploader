import Field from '../components/Field'
import TextInput from '../components/TextInput'
import RangeInput from '../components/RangeInput'
import CheckboxInput from '../components/CheckboxInput'

function ConfigTab({ }) {
    return (
        <>
            <p>Nothing to see here...</p>
            { /*
                <Field>
                    <TextInput iconLeft='fa-key' label='Password' placeholder='Leave blank for none' value={password} setValue={setPassword} />
                </Field>
                <Field id="expiry">
                    <RangeInput label='Expiry Time' step='1' min='0' max='10' value={expiry} setValue={(e) => setExpiry(e.target.value)} id='expiry' outputFormat={expiryOutputName} />
                </Field>
                <Field>
                    <CheckboxInput label="Destroy after download?" />
                </Field>
                <Field>
                    <CheckboxInput label="Peer to peer streaming?" />
                </Field>
            */ }
        </>
    )
}

export default ConfigTab;