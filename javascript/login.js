document.addEventListener('DOMContentLoaded', function() {
    function checkText(event) {
        const input = event.currentTarget;
        if (input.value.length > 0) {
            input.parentNode.classList.remove('errorj');
        } else {
            input.parentNode.classList.add('errorj');
        }
    }

    function checkPassword(event) {
        const password = document.querySelector(".password input");
        if (password.value.length > 7) {
            document.querySelector(".password span").classList.remove('errorj');
        } else {
            document.querySelector(".password span").classList.add('errorj');
        }
    }

    const usernameInput = document.querySelector('.username input');
    const passwordInput = document.querySelector('.password input');

    if (usernameInput) {
        usernameInput.addEventListener('blur', checkText);
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', checkPassword);
    }
});
