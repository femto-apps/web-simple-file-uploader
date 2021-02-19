import Button from "../components/Button";

function FilesTab({ ...params }) {
    return (
        <Button {...params} style={{ width: '100%' }}>Upload Files</Button>
    )
}

export default FilesTab;