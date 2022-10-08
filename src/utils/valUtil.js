export const validateEmail = (email) => {
    //eslint-disable-next-line
    const regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regExp.test(email);
}

export const validatePassword = (password) => {
    const regExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    return regExp.test(password);
}

export const validateUserName = (userName) => {
    return userName && userName.length >= 5;
}