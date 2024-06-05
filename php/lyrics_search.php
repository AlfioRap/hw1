<?php
if (isset($_GET['search'])) {
    $searchValue = urlencode($_GET['search']);
    $apiUrl = "https://api.lyrics.ovh/suggest/$searchValue";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    echo $response;
} elseif (isset($_GET['artist']) && isset($_GET['song'])) {
    $artist = urlencode($_GET['artist']);
    $songTitle = urlencode($_GET['song']);
    $apiUrl = "https://api.lyrics.ovh/v1/$artist/$songTitle";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    echo $response;
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>
