import useSWR, { mutate as swrMutate } from "swr";
import axios from 'axios';

const fetcher = url => fetch(url).then(r => r.json())

export default function useToken() {
    let { data, mutate, error } = useSWR("/api/token", fetcher);

    if (data && data.error) {
        error = data.error
    }

    const loading = !data && !error;

    return {
        loading,
        data,
        error,
        mutate
    };
}

export async function resetToken() {
    const res = await axios.post('/api/token/new')

    swrMutate('/api/token', res.data)
}