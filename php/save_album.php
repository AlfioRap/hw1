<?php
require_once 'autth.php'; // Include il file per verificare l'autenticazione
include 'config.php'; // Include il file per la connessione al database

// Controlla se l'utente è loggato
$user_id = checkAuth();
if (!$user_id) {
    die(json_encode(['error' => 'Errore: utente non loggato.']));
}

// Controlla se la connessione al database è stata stabilita
if (!isset($connessione)) {
    die(json_encode(['error' => 'Errore: connessione al database non stabilita.']));
}

$album_id = $_POST['album_id'];
$name = $_POST['name'];
$artist = $_POST['artist'];
$image_url = $_POST['image_url'];
$spotify_url = $_POST['spotify_url'];

// Salva l'album se non esiste già
$query = "INSERT IGNORE INTO albums (album_id, name, artist, image_url, spotify_url) VALUES (?, ?, ?, ?, ?)";
$stmt = $connessione->prepare($query);
$stmt->bind_param("sssss", $album_id, $name, $artist, $image_url, $spotify_url);
$stmt->execute();

// Ottieni l'ID dell'album appena salvato o esistente
if ($stmt->affected_rows > 0) {
    $album_db_id = $connessione->insert_id;
} else {
    $query = "SELECT id FROM albums WHERE album_id = ?";
    $stmt = $connessione->prepare($query);
    $stmt->bind_param("s", $album_id);
    $stmt->execute();
    $stmt->bind_result($album_db_id);
    $stmt->fetch();
}

// Inserisci la relazione tra utente e album nella tabella user_albums
$query = "INSERT INTO user_albums (user_id, album_id) VALUES (?, ?)";
$stmt = $connessione->prepare($query);
$stmt->bind_param("ii", $user_id, $album_db_id);
$stmt->execute();

echo json_encode([
    'success' => true,
    'album' => [
        'id' => $album_db_id,
        'album_id' => $album_id,
        'name' => $name,
        'artist' => $artist,
        'image_url' => $image_url,
        'spotify_url' => $spotify_url
    ]
]);

$stmt->close();
$connessione->close();
?>
