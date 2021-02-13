import Cookies from 'js-cookie'

// mock the user api
export default async () => {
    if (Cookies.get('user')) {
        // authorized
        return { user: Cookies.get('user') };
    }

    // not authorized
    const error = new Error("Not authorized!");
    error.status = 403;
    throw error;
};
