<?php
require_once 'php/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera e sanitizza i dati di input
    $email = $connessione->real_escape_string($_POST['email'] ?? '');
    $username = $connessione->real_escape_string($_POST['username'] ?? '');
    $password = $connessione->real_escape_string($_POST['password'] ?? '');
    $confirm_password = $connessione->real_escape_string($_POST['confirm_password'] ?? '');

    // Controlla se le password corrispondono
    if ($password !== $confirm_password) {
        echo "Le password non corrispondono.";
        exit();
    }

    // Controlla la struttura della password
    if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/', $password)) {
        echo "La password deve essere lunga almeno 8 caratteri, contenere almeno una lettera maiuscola, un numero e un simbolo.";
        exit();
    }

    // Controlla se l'username è già in uso
    $sql = "SELECT * FROM utenti WHERE username='$username'";
    $result = $connessione->query($sql);

    if ($result->num_rows > 0) {
        echo "Username già in uso.";
        exit();
    }

    // Hash della password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Inserisci l'hash della password nel database
    $sql = "INSERT INTO utenti (email, username, password) VALUES ('$email', '$username', '$hashed_password')";

    if ($connessione->query($sql) === true) {
        // Registrazione avvenuta con successo, memorizza il messaggio di successo nella sessione
        session_start();
        $_SESSION['success_message'] = "Registrazione effettuata con successo. Ora puoi accedere.";
        // Reindirizza alla pagina di login
        header("Location: login.php");
        exit();
    } else {
        echo "Errore durante la registrazione utente: " . $connessione->error;
    }
    $connessione->close();
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../login/css/style.css">
    <title>14 Sistema login</title>
</head>
<body>
    <form id="registrationForm" action="register.php" method="POST">
        <h2>Registrati</h2>
        
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="email" required>
        <span class="errorj" id="emailError"></span>
        
        <label for="username">Username</label>
        <input type="text" name="username" id="username" class="username" required>
        <span class="errorj" id="usernameError"></span>
        
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="password" required>
        <span class="errorj" id="passwordError"></span>
        
        <label for="confirm_password">Conferma Password</label>
        <input type="password" name="confirm_password" id="confirm_password" class="confirm_password" required>
        <span class="errorj" id="confirmPasswordError"></span>
        
        <label for="allow">Accetto i termini e le condizioni</label>
        <input type="checkbox" name="allow" id="allow" class="allow" required>
        <span class="errorj" id="allowError"></span>

        <input type="submit" value="Invia">

        <p>Hai già un account? <a href="login.php">Accedi</a></p>
    </form>
    <div id="responseMessage"></div>
    <div id="errorMessage"></div>

    <script src="../login/javascript/register.js"></script>
</body>
</html>
