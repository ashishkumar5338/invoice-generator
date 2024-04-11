<?php

function getInvoiceNumber($invoiceDate)
{
    $dataFilePath = 'invoiceCounter.json';
    $jsonFile = 'invoiceDetails.json';
    $invoiceData = json_decode(file_get_contents($jsonFile), true);

    // Extract day, month, and year from the invoice date
    $day = substr($invoiceDate, 8, 2);
    $month = substr($invoiceDate, 5, 2);
    $year = substr($invoiceDate, 2, 2);

    // Format the date components
    $formattedDate = $day . $month . $year;

    // Read existing data from file
    $data = [];
    if (file_exists($dataFilePath)) {
        $jsonData = file_get_contents($dataFilePath);
        $data = json_decode($jsonData, true);
    }

    // Check if there's already a stored counter for the day
    if (!isset($data[$formattedDate])) {
        // If not, initialize counter for the day
        $data[$formattedDate] = [];
        $data[$formattedDate]['counter'] = 1;
    } else {
        $counter = str_pad($data[$formattedDate]['counter'], 2, '0', STR_PAD_LEFT);
        // Construct invoice number format
        $invoiceNumber = 'OH' . substr($formattedDate, 0, 4) . '2' . $year . '-' . $counter;

        if (isset($invoiceData[$invoiceNumber])) {
            // If the invoice number exist, increment the counter
            $data[$formattedDate]['counter']++;
        }
    }

    // Write updated data back to file
    file_put_contents($dataFilePath, json_encode($data, JSON_PRETTY_PRINT));

    // Get the counter value
    $counter = str_pad($data[$formattedDate]['counter'], 2, '0', STR_PAD_LEFT);

    // Construct invoice number format
    return 'OH' . substr($formattedDate, 0, 4) . '2' . $year . '-' . $counter;
}
