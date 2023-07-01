
import { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/api';

const useFetch = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = (url) => {
        axiosPrivate.get(url)
            .then((res) => {
                setResponse(res);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData(url);
    }, [url]);

    return { response, error, loading };
};

export default useFetch;
