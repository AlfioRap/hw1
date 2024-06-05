<?php
    session_start();

    // Elimina tutte le variabili di sessione
    $_SESSION = array();

    // Distrugge la sessione
    session_destroy();

    // Reindirizza l'utente alla pagina di login
    header("Location: ../login.php");
    exit;
?>
