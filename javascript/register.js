document.getElementById('registrationForm').addEventListener('submit', function(event) {
    let valid = true;

    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    const allow = document.getElementById('allow');

    // Reset error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('allowError').textContent = '';

    // Controllo della struttura della password
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/;
    if (!passwordPattern.test(password.value)) {
        document.getElementById('passwordError').textContent = 'La password deve essere lunga almeno 8 caratteri, contenere almeno una lettera maiuscola, un numero e un simbolo.';
        valid = false;
    }

    // Controllo se le password corrispondono
    if (password.value !== confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = 'Le password non corrispondono.';
        valid = false;
    }

    // Controllo accettazione termini
    if (!allow.checked) {
        document.getElementById('allowError').textContent = 'Devi accettare i termini e le condizioni.';
        valid = false;
    }

    if (!valid) {
        event.preventDefault();
    }
});

function checkText(event) {
    const input = event.currentTarget;
    if (input.value.length > 0) {
        input.parentNode.classList.remove('errorj');
    } else {
        input.parentNode.classList.add('errorj');
    }
}

function checkPassword(event) {
    const password = document.getElementById('password');
    if (password.value.length > 7) {
        document.getElementById('passwordError').classList.remove('errorj');
    } else {
        document.getElementById('passwordError').classList.add('errorj');
    }
}

function checkConfirmPassword(event) {
    const confirmPassword = document.getElementById('confirm_password');
    if (document.getElementById('password').value === confirmPassword.value && confirmPassword.value.length > 7) {
        document.getElementById('confirmPasswordError').classList.remove('errorj');
    } else {
        document.getElementById('confirmPasswordError').classList.add('errorj');
    }
}

function checkForm(event) {
    const checkbox = document.getElementById('allow');
    if (checkbox.checked) {
        document.getElementById('allowError').classList.remove('errorj');
    } else {
        document.getElementById('allowError').classList.add('errorj');
    }
}

document.getElementById('username').addEventListener('blur', checkText);
document.getElementById('email').addEventListener('blur', checkText);
document.getElementById('password').addEventListener('blur', checkPassword);
document.getElementById('confirm_password').addEventListener('blur', checkConfirmPassword);
document.getElementById('allow').addEventListener('change', checkForm);
