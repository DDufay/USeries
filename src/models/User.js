export const User = data => {
    return {
        id: data.uid || '',
        username: data.displayName || '',
        picture: data.photoURL || '',
        email: data.email || '',
        refreshToken: data.refreshToken || '',
    }
};
