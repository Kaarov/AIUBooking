const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const messageWarning = document.getElementById("message-warning")

const login_wrapper = document.querySelector('.login-wrapper');

if (messageWarning) {
    login_wrapper.classList.toggle('active');
}

signInBtnLink.addEventListener('click', () => {
    login_wrapper.classList.toggle('active');
});

signUpBtnLink.addEventListener('click', () => {
    login_wrapper.classList.toggle('active');
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function validateform(){
    // let email = document.loginform.email.value;
    // let password = document.loginform.password.value;

    let data = `${email} ${password}`;

    console.log(email);
    console.log(password);

}

// const login_click = document.querySelector(".login_click");
// const sign_in = document.querySelector('.sign-in');
//
// function login_click() {
//     console.log(sign_in.children)
// }

// let ans;

// let response = await fetch('/', {
//         method: 'get',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/json'
//         }
//     }).then(response => response.json())
//         .then(data => ans = data)
//
// console.log(ans);

// login_click.addEventListener('click', async () => {
//     let data = `${24}`;
//
//     await fetch(`login_test/`, {
//     method: 'POST',
//     body: data,
//     headers: {
//         'X-CSRFToken': csrftoken,
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
//     })
// })


