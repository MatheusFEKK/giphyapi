<?php

    header('Content-Type: application/json'); // Resposta será em JSON;

    $api_key     = 'WaumgjBGpbrXzUB7PIZwwglCs6m204wJ';
    $search_term = isset($_GET['q']) ? urlencode($_GET['q']) : 'gato';
    $offset      = isset($_GET['q']) ? (int)$_GET['offset'] : 0;
    $limit       = 10; // Números de GIFS por requisição

    $url = "https://api.giphy.com/v1/gifs/search?api_key=$api_key&q=$search_term&limit=$limit&offset=$offset&rating=g";

    // Inicializa o CURL
    $CURL = curl_init();
    curl_setopt($CURL, CURLOPT_URL, $url);
    curl_setopt($CURL, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($CURL);
    curl_close($CURL);


    echo $response;
    ?>