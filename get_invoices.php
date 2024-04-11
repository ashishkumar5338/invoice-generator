<?php
// Specify the path to the JSON file
$jsonFile = 'invoiceDetails.json';

// Check if the invoice number is provided in the request
if (isset($_GET['invoiceNumber'])) {
    // Extract the invoice number from the request
    $invoiceNumber = $_GET['invoiceNumber'];

    // Check if the JSON file exists
    if (file_exists($jsonFile)) {
        // Get the contents of the JSON file
        $jsonData = file_get_contents($jsonFile);

        // Decode the JSON data to a PHP array
        $invoices = json_decode($jsonData, true);

        $invoice = $invoices[$invoiceNumber];


        // Check if invoice details were found
        if ($invoice === null) {
            // Return an error message if invoice details were not found
            echo json_encode(['error' => 'Invoice not found']);
        } else {
            // Return the invoice details as JSON
            header('Content-Type: application/json');
            echo json_encode($invoice);
        }
    }
} else {
    // If invoice number is not provided, return all invoices
    if (file_exists($jsonFile)) {
        // Get the contents of the JSON file
        $jsonData = file_get_contents($jsonFile);

        // Output invoices as JSON
        header('Content-Type: application/json');
        echo $jsonData;
    } else {
        // Return an error message if the JSON file does not exist
        echo json_encode(['error' => 'JSON file not found']);
    }
}
