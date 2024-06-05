<?php
require_once('php/config.php');

session_start();

$success_message = '';
if (isset($_SESSION['success_message'])) {
    $success_message = $_SESSION['success_message'];
    unset($_SESSION['success_message']);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Controlla se i campi username e password sono stati inviati
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = $connessione->real_escape_string($_POST['username']);
        $password = $connessione->real_escape_string($_POST['password']);

        $sql_select = "SELECT * FROM utenti WHERE username = ?";
        if ($stmt = $connessione->prepare($sql_select)) {
            $stmt->bind_param('s', $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows == 1) {
                $row = $result->fetch_assoc();

                if (password_verify($password, $row['password'])) {
                    $_SESSION['loggato'] = true;
                    $_SESSION['user_id'] = $row['id_utente']; // Cambiato da 'id' a 'id_utente'
                    $_SESSION['username'] = $row['username'];

                    header("Location: index.php");
                    exit();
                } else {
                    $error_message = "La password non è corretta";
                }
            } else {
                $error_message = "Non ci sono account con quello username";
            }
            $stmt->close();
        } else {
            $error_message = "Errore in fase di login";
        }
    } else {
        $error_message = "Si prega di inserire sia username che password";
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
    <form action="login.php" method="POST">
        <h2>Accedi</h2>
        
        <?php if (!empty($success_message)): ?>
            <p class="success"><?php echo $success_message; ?></p>
        <?php endif; ?>

        <?php if (isset($error_message)): ?>
            <p class="error"><?php echo $error_message; ?></p>
        <?php endif; ?>

        <div class="username">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" required>
        </div>
        
        <div class="password">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>
        </div>
        
        <input type="submit" value="Invia">
        
        <p>Non hai ancora un account? <a href="register.php">Registrati</a></p>
    </form>
    <script src="../login/javascript/login.js"></script>
</body>
</html>
