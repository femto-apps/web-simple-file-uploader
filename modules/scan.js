import FormData from 'form-data'
import fetch from 'node-fetch'

export async function scanFromStream({ fileStream, size, apiKey }) {
    const formData = new FormData()
    formData.append('file', fileStream)

    const virusResponse = await fetch('https://www.virustotal.com/api/v3/files', {
        method: 'POST',
        headers: {
            'x-apikey': apiKey,
            'content-length': size
        },
        body: formData
    })
        .then(res => res.json())

    return virusResponse
}

export async function isFileVirus({ virusTotalID, apiKey }) {
    const virusResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${virusTotalID}`, {
        headers: {
            'x-apikey': apiKey,
        },
    })
        .then(res => res.json())

    if (virusResponse.data.attributes.status !== 'completed') {
        return { completed: false }
    }

    const isSuspicious = virusResponse.data.attributes.stats.suspicious + virusResponse.data.attributes.malicious > 3

    return {
        completed: true,
        suspicious: isSuspicious
    }
}