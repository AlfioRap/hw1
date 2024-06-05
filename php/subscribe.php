<?php
// Configurazione del database
$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "prova_login";

// Crea connessione
$conn = new mysqli($host, $username, $password, $dbname);

// Controlla connessione
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connessione fallita: " . $conn->connect_error]));
}

// Controlla se l'email è stata inviata tramite POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    
    // Prepara e vincola
    $stmt = $conn->prepare("INSERT INTO email (email) VALUES (?)");
    $stmt->bind_param("s", $email);

    // Esegui la query
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Iscrizione avvenuta con successo!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore: " . $stmt->error]);
    }

    // Chiudi lo statement e la connessione
    $stmt->close();
    $conn->close();
}
?>
