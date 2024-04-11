// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks the button, open the modal
function openForm() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeForm() {
  modal.style.display = "none";
}

// Create an object to hold the invoice details
var invoiceDetails = {
  invoiceNumber: invoiceNumber,
  clientName: clientName,
  clientAddress: clientAddress,
  clientState: clientState,
  clientNumber: clientNumber,
  clientGST: clientGST,
  invoiceDate: invoiceDate,
  items: []
};

function addItem() {
  // event.preventDefault(); // Prevent default form submission behavior
  // console.log("addItem function called"); // Add this line for debugging
  var form = document.getElementById("itemForm");
  var itemName = form.elements["itemName"].value;
  var hsnSac = form.elements["hsnSac"].value;
  var pack = form.elements["pack"].value;
  var mrp = parseFloat(form.elements["mrp"].value);
  var qty = parseFloat(form.elements["qty"].value);
  var discount = parseFloat(form.elements["discount"].value);
  var gst = parseFloat(form.elements["gst"].value);

  if (isNaN(mrp) || isNaN(qty) || isNaN(discount) || isNaN(gst)) {
    alert("Invalid input. Please enter valid numbers.");
    return;
  }

  var item = {
    itemName: itemName,
    hsnSac: hsnSac,
    pack: pack,
    mrp: mrp.toFixed(2),
    qty: qty,
    discount: discount.toFixed(0),
    gst: gst
  };

  invoiceDetails.items.push(item);


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

  var table = document
    .getElementById("invoice-table")
    .getElementsByTagName("tbody")[0];
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
  var cell11 = row.insertCell(10);

  cell1.textContent = itemName;
  cell2.textContent = hsnSac;
  cell3.textContent = pack;
  cell4.textContent = mrp.toFixed(2);
  cell5.textContent = qty;
  cell6.textContent = discount.toFixed(0) + " %";
  var netAmountValue = netAmount(mrp, qty, discount);
  cell7.textContent = netAmountValue.toFixed(2);
  cell8.textContent = gst + " %";
  var taxAmountValue = taxAmount(netAmountValue, gst);
  cell9.textContent = taxAmountValue.toFixed(2);
  var totalAmountValue = totalAmount(netAmountValue, taxAmountValue);
  cell10.textContent = totalAmountValue.toFixed(2);
  cell11.classList.add("hide");

  // Create delete button and append it to the row
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    // Inside the click event listener, use this.parentNode.parentNode
    // to refer to the button's parent row and delete that row
    var row = this.parentNode.parentNode;
    // console.log(row.rowIndex);
    var table = row.parentNode;
    var index = row.rowIndex - 1;
    table.deleteRow(index);
    // Delete item at index 1
    deleteItemByIndex(index);
    calculateTotal(table);
  });

  // Append the delete button to the last cell (cell11) of the row
  cell11.appendChild(deleteButton);


  calculateTotal(table);

  closeForm(); // Close the form modal after adding the item
}

// Function to delete an item by index
function deleteItemByIndex(index) {
  // Check if the index is valid
  if (index >= 0 && index < invoiceDetails.items.length) {
    // Use splice to remove the item at the specified index
    invoiceDetails.items.splice(index, 1);
    console.log("Item deleted successfully.");
  } else {
    console.log("Invalid index.");
  }
}


// Print Preview button
var printPreviewButton = document.getElementById("printPreview");
printPreviewButton.addEventListener("click", function () {
  // Call a function to show print preview
  printPreview();
});

function printPreview() {
  // Check if the items array is empty
  if (invoiceDetails.items.length === 0) {
    // If the items array is empty, show an alert
    alert("Please add at least one item to the invoice.");
  } else {
    // If the items array is not empty, proceed with sending the data to the server
    addtoJSON();

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

    // Redirect to index.html after printing
    window.location.href = "index.html";
  }
}


function copyInvoiceNumber() {
  navigator.clipboard.writeText(invoiceNumber)
    .then(function () {
      console.log("Invoice number copied to clipboard: " + invoiceNumber);
      // alert("Invoice number copied to clipboard: " + invoiceNumber);
    })
    .catch(function (error) {
      console.error("Unable to copy invoice number: ", error);
    });
}

function addtoJSON() {
  // Convert the object to a JSON string
  var invoiceDetailsJSON = JSON.stringify(invoiceDetails);

  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "addItem.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Send the request with the item details as JSON data
  xhr.send(invoiceDetailsJSON);
}

forceDesktopView();









