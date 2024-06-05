<?php
require_once 'autth.php'; // Include il file per verificare l'autenticazione
include 'config.php'; // Include il file per la connessione al database

// Controlla se l'utente è loggato
$user_id = checkAuth();
if (!$user_id) {
    die("Errore: utente non loggato.");
}

// Recupera tutti gli album preferiti dell'utente
$query = "
    SELECT albums.*
    FROM albums
    INNER JOIN user_albums ON albums.id = user_albums.album_id
    WHERE user_albums.user_id = ?
";
$stmt = $connessione->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$albums = array();
while ($row = $result->fetch_assoc()) {
    $albums[] = $row;
}

echo json_encode($albums);

$stmt->close();
$connessione->close();
?>
