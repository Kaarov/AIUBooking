const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');

const login_wrapper = document.querySelector('.login-wrapper');

signUpBtnLink.addEventListener('click', () => {
    login_wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    login_wrapper.classList.toggle('active');
});
