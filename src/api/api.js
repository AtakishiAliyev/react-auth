import axios from 'axios';
import { logout } from '../utils/helpers';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosPrivate = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

async function checkRefreshToken(refreshToken) {
    try {
        const { data } = await axios.post(`${REACT_APP_BASE_URL}api/v1/customers/login/refresh/`, {
            refresh: refreshToken
        });

        if (data) {
            return data.access;
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.status === 401) {
            throw new Error("Refresh token expired");
        }
        else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return checkRefreshToken(refreshToken);
        }
    }
}

axiosPrivate.interceptors.request.use(
    (config) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user && user.access) {
                config.headers["Authorization"] = "Bearer " + user.access;
            }
        } catch (err) {
            console.error(err);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosPrivate.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const refreshToken = user?.refresh;

                const newAccessToken = await checkRefreshToken(refreshToken);

                user.access = newAccessToken;
                localStorage.setItem("user", JSON.stringify(user));

                originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
                return axiosPrivate(originalRequest);
            } catch (err) {
                console.error(err);
                logout()
            }
        }

        return Promise.reject(error);
    }
);

export { axiosPrivate };
