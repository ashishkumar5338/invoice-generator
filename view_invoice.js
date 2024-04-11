function netAmount(mrp, qty, discount) {
    var discountedPrice = mrp - (mrp * discount) / 100;
    var netAmount = discountedPrice * qty;
    return netAmount;
}

function taxAmount(netAmount, gst) {
    var taxAmount = (netAmount * gst) / 100;
    return taxAmount;
}

function totalAmount(netAmount, taxAmount) {
    return netAmount + taxAmount;
}

function setItems(invoice) {
    var table = document
        .getElementById("invoice-table")
        .getElementsByTagName("tbody")[0];

    for (const item of invoice.items) {
        var itemName = item.itemName;
        var hsnSac = item.hsnSac;
        var pack = item.pack;
        var mrp = parseFloat(item.mrp);
        var qty = parseFloat(item.qty);
        var discount = parseFloat(item.discount);
        var gst = parseFloat(item.gst);

        var { cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10 } = newFunction(table);

        cell1.textContent = itemName;
        cell2.textContent = hsnSac;
        cell3.textContent = pack;
        cell4.textContent = mrp.toFixed(2);
        cell5.textContent = qty;
        cell6.textContent = discount.toFixed(0) + " %";
        var netAmountValue = netAmount(mrp, qty, discount); // Rename variable to avoid conflict
        cell7.textContent = netAmountValue.toFixed(2);
        cell8.textContent = gst + " %";
        var taxAmountValue = taxAmount(netAmountValue, gst); // Rename variable to avoid conflict
        cell9.textContent = taxAmountValue.toFixed(2);
        var totalAmountValue = totalAmount(netAmountValue, taxAmountValue); // Rename variable to avoid conflict
        cell10.textContent = totalAmountValue.toFixed(2);
    }

    calculateTotal(table);
}

function newFunction(table) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    return { cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10 };
}

function printpdf() {
    copyInvoiceNumber();

    var hiddenElements = document.querySelectorAll('.hide');
    // Store the original display value of each hidden element
    var originalDisplayValues = [];
    hiddenElements.forEach(function (element) {
        originalDisplayValues.push(element.style.display);
        element.style.display = 'none'; // Hide the element for print preview
    });

    // Open print preview
    window.print();

    // Restore the original display values after print preview
    hiddenElements.forEach(function (element, index) {
        element.style.display = originalDisplayValues[index];
    });
}

function copyInvoiceNumber() {
    navigator.clipboard.writeText(invoice.invoiceNumber)
        .then(function () {
            console.log("Invoice number copied to clipboard: " + invoice.invoiceNumber);
            // alert("Invoice number copied to clipboard: " + invoiceNumber);
        })
        .catch(function (error) {
            console.error("Unable to copy invoice number: ", error);
        });
}

setItems(invoice);
forceDesktopView();