<?php
// Add these lines at the top of generate.php
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
require_once('invoice_number.php');

// Retrieve form data
$clientName = $_POST['clientName'];
$clientAddress = $_POST['clientAddress'];
$clientState = $_POST['clientState'];
$clientNumber = $_POST['clientNumber'];
$clientGST = $_POST['clientGST'];
$invoiceDate = $_POST['invoiceDate'];

// getInvoiceNumber() to generate invoice number based on $invoiceDate
$invoiceNumber = getInvoiceNumber($invoiceDate);
// Convert date to Unix timestamp and format as dmy
$formattedDate = date('d/m/Y', strtotime($invoiceDate));

// Read the invoice template
$invoiceTemplate = file_get_contents("invoice.html");

// Replace placeholders with actual data
$invoiceTemplate = str_replace("[Customer Name]", $clientName, $invoiceTemplate);
$invoiceTemplate = str_replace("[Customer Address]", $clientAddress, $invoiceTemplate);
$invoiceTemplate = str_replace("[City, State, ZIP Code]", $clientState, $invoiceTemplate);
$invoiceTemplate = str_replace("[Phone]", $clientNumber, $invoiceTemplate);
$invoiceTemplate = str_replace("[Customer GSTIN]", $clientGST, $invoiceTemplate);
$invoiceTemplate = str_replace("[Invoice Date]", $formattedDate, $invoiceTemplate);
$invoiceTemplate = str_replace("[Your Invoice Number]", $invoiceNumber, $invoiceTemplate);

// Pass values to JavaScript
echo "<script>";
echo "var clientName = '" . $clientName . "';";
echo "var clientAddress = '" . $clientAddress . "';";
echo "var clientState = '" . $clientState . "';";
echo "var clientNumber = '" . $clientNumber . "';";
echo "var clientGST = '" . $clientGST . "';";
echo "var invoiceDate = '" . $formattedDate . "';";
echo "var invoiceNumber = '" . $invoiceNumber . "';";
echo "</script>";

// Output the rendered invoice HTML to the user's browser
echo $invoiceTemplate;
