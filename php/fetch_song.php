<?php


header('Content-Type: application/json');

spotify();

function spotify() {
    $client_id = "576cf47bee724458a12602a5fe7f5008";
    $client_secret = "9633a2b446da49b0b935d8c75e33092d";

    // ACCESS TOKEN
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . base64_encode($client_id . ':' . $client_secret)));
    $token_response = curl_exec($ch);

    if ($token_response === false) {
        echo json_encode(['error' => 'Failed to get access token']);
        curl_close($ch);
        exit;
    }

    $token = json_decode($token_response, true);
    if (isset($token['error'])) {
        echo json_encode(['error' => 'Failed to get access token: ' . $token['error_description']]);
        curl_close($ch);
        exit;
    }

    curl_close($ch);

    // QUERY EFFETTIVA
    $query = urlencode($_GET["q"]);
    $url = 'https://api.spotify.com/v1/search?type=album&limit=4&q=' . $query;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $token['access_token']));
    $res = curl_exec($ch);

    if ($res === false) {
        echo json_encode(['error' => 'Failed to fetch data from Spotify']);
        curl_close($ch);
        exit;
    }

    $response_data = json_decode($res, true);
    if (isset($response_data['error'])) {
        echo json_encode(['error' => 'Spotify API error: ' . $response_data['error']['message']]);
        curl_close($ch);
        exit;
    }

    curl_close($ch);
    echo json_encode($response_data);
}
?>
