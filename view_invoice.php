<?php
$jsonFile = 'invoiceDetails.json';

// Check if the JSON file exists
if (file_exists($jsonFile)) {
    // Retrieve the invoice number from the URL
    if (isset($_GET['invoiceNumber'])) {
        $invoiceNumber = $_GET['invoiceNumber'];
        // Get the contents of the JSON file
        $jsonData = file_get_contents($jsonFile);
        // Decode the JSON data to a PHP array
        $invoices = json_decode($jsonData, true);
        // Check if the invoice number exists in the array
        if (array_key_exists($invoiceNumber, $invoices)) {
            // Get the invoice data
            $invoice = $invoices[$invoiceNumber];
            // Convert the $invoice array to JSON format
            $invoiceJSON = json_encode($invoice);
        } else {
            echo "Invoice not found.";
            exit;
        }
    } else {
        echo "Invoice number not provided.";
        exit;
    }
} else {
    echo "Invoice data file not found.";
    exit;
}


// Output JavaScript code to parse the JSON string
echo "<script>";
echo "var invoice = JSON.parse('" . addslashes($invoiceJSON) . "');";
echo "</script>";

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice <?php echo $invoiceNumber ?></title>
    <link rel="stylesheet" href="invoice.css" />
    <script src="calculateTotal.js"></script>
</head>

<body>
    <div class="invoice-container" id="printJS-form">
        <div class="header">
            <div class="invoice-title">
                <h2>TAX INVOICE</h2>
            </div>
            <div class="invoice-info">
                <div class="company-logo-container">
                    <img src="company_logo.png" alt="Company Logo" class="company-logo" />
                </div>
                <div class="invoice-details">
                    <h3>Invoice Number: <?php echo $invoice['invoiceNumber']; ?></h3>
                    <h3 id="date">Date: <?php echo $invoice['invoiceDate']; ?></h3>
                </div>
            </div>
        </div>

        <div class="address-container">
            <div class="sender-address">
                <h3>ORGANIC HOMOEO</h3>
                <p>D.NO-1-3- 395,</p>
                <p>JP Road, Yadari,</p>
                <p>Bhongir,Telangana, 508116</p>
                <p>Phone : <b>9801820258</b></p>
                <p>Email : <b>organichomoeo@gmail.com</b></p>
                <p>GSTIN : 36CSWPK5477K1ZP</p>
                <p>DL No : T-370/DH2023</p>
            </div>
            <div class="line"></div>
            <!-- Add a line element here -->
            <div class="customer-address">
                <!-- <div class="customer-address-inner"> -->
                <h3>Bill To</h3>
                <?php
                echo "<h4>" . $invoice['clientName'] . "</h4>";
                echo "<p>" . $invoice['clientAddress'] . "</p>";
                echo "<p>" . $invoice['clientState'] . "</p>";
                echo "<p>Phone: " . $invoice['clientNumber'] . "</p>";
                echo "<p>GSTIN: " . $invoice['clientGST'] . "</p>";
                ?>
                <!-- </div> -->
            </div>
        </div>
        <table class="table-container" id="invoice-table">
            <thead>
                <tr>
                    <th>PRODUCT NAME</th>
                    <th>HSN</th>
                    <th>PACK</th>
                    <th>MRP</th>
                    <th>QTY</th>
                    <th>DIS%</th>
                    <th>NET AMOUNT</th>
                    <th>GST</th>
                    <th>TAX AMOUNT</th>
                    <th>TOTAL AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                <!-- Items will be dynamically added here -->
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4"><b>TOTAL</b></td>
                    <!-- <td>MRP</td> -->
                    <td>QTY</td>
                    <td></td>
                    <td>NET AMOUNT</td>
                    <td></td>
                    <td>TAX AMOUNT</td>
                    <td>Total AMOUNT</td>
                </tr>
            </tfoot>
        </table>

        <div class="payment-info">
            <!-- Bank Details Section -->
            <div class="bank-details">
                <div class="bank-info">
                    <h3>Bank Details</h3>
                    <p><b>ORGANIC HOMOEO</b></p>
                    <p>Bank Name : ICICI BANK</p>
                    <p>A/C Number : 380105005249</p>
                    <p>IFSC Code : ICIC0003801</p>
                </div>
                <div class="or"><b>OR(SCAN)</b></div>
                <div class="qr-code"><img src="company_qr.png" alt="QR CODE" /></div>
            </div>
            <div class="divider"></div>
            <div class="final-amount">
                <p>Gross value : <b class="gross-value"></b></p>
                <p>Round off : <b class="round-off"></b></p>
                <p>You Saved : <b class="you-saved"></b></p>
                <p>Total(Round) : <b class="total-value"></b></p>
            </div>
        </div>
        <div class="amount-words">
            <p>Amount in Words : <b class="amount-in-words"></b></p>
        </div>
        <div class="payment-terms">
            <p>
                Declaration : We hereby certify that goods supplied under this invoice
                do not Contravene in any way the provisions are Section 18 of Drug
                Control Act 1940.
            </p>
        </div>
        <div class="authorised-signatory">
            <h4>FOR ORGANIC HOMOEO</h4>
            <h4>Authorized Signatory</h4>
        </div>
        <button id="printPreview" class="hide button" onclick="printpdf()">Save and Print</button>
    </div>

    <script src="view_invoice.js"></script>
</body>

</html>