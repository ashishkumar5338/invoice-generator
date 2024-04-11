// Fetch invoices from server
function fetchInvoices() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_invoices.php", true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var invoices = JSON.parse(xhr.responseText);
            renderInvoices(invoices);
        } else {
            console.error("Failed to fetch invoices.");
        }
    };
    xhr.onerror = function () {
        console.error("Request failed.");
    };
    xhr.send();
}

// Render invoices on HTML page
function renderInvoices(invoices) {
    var tableBody = document.getElementById("invoiceTableBody");
    // Clear previous content
    tableBody.innerHTML = "";

    var invoiceNumbers = Object.keys(invoices);
    // console.log(invoices[invoiceNumbers[0]].clientName);

    // Loop through invoices in reverse order
    for (var i = invoiceNumbers.length - 1; i >= 0; i--) {
        var invoiceNumber = invoiceNumbers[i];
        var invoice = invoices[invoiceNumber];
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = invoice.clientName;
        row.insertCell(1).textContent = invoice.invoiceNumber;
        row.insertCell(2).textContent = invoice.invoiceDate;
        row.insertCell(3).textContent = "₹ " + (invoice.totalValue || "");

        // Create a button to view the invoice
        var viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        // Use an IIFE to capture the current value of invoiceNumber
        viewButton.addEventListener('click', (function (invoiceNumber) {
            return function () {
                // Redirect to the view_invoice.html page
                window.location.href = 'view_invoice.php?invoiceNumber=' + invoiceNumber;
            };
        })(invoiceNumber)); // Pass invoiceNumber and invoice to the IIFE

        // Add the button to the row
        row.insertCell(4).appendChild(viewButton);
    }
}
function forceDesktopView() {
    // Set the viewport meta tag to display the page in desktop view
    var viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
        viewport.setAttribute("content", "width=1024, initial-scale=1");
    } else {
        // If the viewport meta tag doesn't exist, create and append it to the head
        var viewportTag = document.createElement("meta");
        viewportTag.setAttribute("name", "viewport");
        viewportTag.setAttribute("content", "width=1024, initial-scale=1");
        document.head.appendChild(viewportTag);
    }
}

// Fetch invoices when page loads
window.onload = function () {
    fetchInvoices();
    forceDesktopView();
    document.getElementById("invoiceDate").valueAsDate = new Date();
};

