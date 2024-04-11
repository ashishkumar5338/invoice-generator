<?php

// Read JSON file
$jsonFile = 'invoiceDetails.json';

// Read existing data from file
if (file_exists($jsonFile)) {
    $invoiceData = json_decode(file_get_contents($jsonFile), true);
}

// Get the new item details from the request
$newInvoice = json_decode(file_get_contents('php://input'), true);

// Check if the invoice number exists in the JSON data
$invoiceNumber = $newInvoice['invoiceNumber'];
if (!isset($invoiceData[$invoiceNumber])) {
    // If the invoice number doesn't exist, initialize it as an empty array
    $invoiceData[$invoiceNumber] = [];
}

// Add the new item to the array corresponding to the invoice number
$invoiceData[$invoiceNumber] = $newInvoice;

file_put_contents($jsonFile,json_encode($invoiceData, JSON_PRETTY_PRINT));

// Respond with success
echo json_encode(['success' => true]);

?>