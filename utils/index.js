import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function requestAPI(url, options, isFullUrl = false) {
    if (!isFullUrl && !url.startsWith('/')) {
        url = `/${url}`;
    }

    options = {
        url: isFullUrl ? url : `${BASE_API_URL}${url}`,
        method: "get",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        ...options,
    };

    try {
        const response = await axios(options);
        const { data } = response;
        return { response, data };
    } catch (error) {
        return { error };
    }
}

export {
    requestAPI,
};
