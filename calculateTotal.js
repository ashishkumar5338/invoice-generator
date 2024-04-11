function calculateTotal(table) {
    var tablefoot = document
        .getElementById("invoice-table")
        .getElementsByTagName("tfoot")[0];
    // var mrpTotal = 0;
    var qtyTotal = 0;
    var netTotal = 0;
    var taxTotal = 0;
    var total = 0;
    var gross = 0;
    // Iterate over each row in the table, skipping the header row
    for (var i = 0; i < table.rows.length; i++) {
        // Parse the total amount from the last cell of each row and add it to the total
        // console.log(table.rows[i].cells[3].textContent);
        // mrpTotal += parseFloat(table.rows[i].cells[3].textContent);
        qtyTotal += parseFloat(table.rows[i].cells[4].textContent);
        netTotal += parseFloat(table.rows[i].cells[6].textContent);
        taxTotal += parseFloat(table.rows[i].cells[8].textContent);
        total += parseFloat(table.rows[i].cells[9].textContent);
        gross += parseFloat(table.rows[i].cells[3].textContent) * parseFloat(table.rows[i].cells[4].textContent);
    }
    // console.log(mrpTotal);
    // tablefoot.rows[0].cells[1].textContent = "₹" + mrpTotal.toFixed(2);
    tablefoot.rows[0].cells[1].textContent = qtyTotal;
    tablefoot.rows[0].cells[3].textContent = "₹" + netTotal.toFixed(2);
    tablefoot.rows[0].cells[5].textContent = "₹" + taxTotal.toFixed(2);
    tablefoot.rows[0].cells[6].textContent = "₹" + total.toFixed(2);
    tablefoot.style.display = "table-row-group";

    var totalValue = Math.floor(total);
    var roundoff = totalValue - total;
    var youSaved = gross.toFixed(2) - totalValue;
    document.querySelector(".gross-value").textContent = "₹ " + gross.toFixed(2);
    document.querySelector(".round-off").textContent = "₹ " + roundoff.toFixed(2);
    document.querySelector(".you-saved").textContent = "₹ " + youSaved.toFixed(2);
    document.querySelector(".total-value").textContent = "₹ " + totalValue;
    document.querySelector(".amount-in-words").textContent = convertAmountToIndianWordsWithRupees(totalValue);
    // Check if invoiceDetails is defined
    if (typeof invoiceDetails !== 'undefined') {
        invoiceDetails.totalValue = totalValue;
    }
}


function convertAmountToIndianWordsWithRupees(amount) {
    // Array of Indian numbering system words
    const words = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    // Function to convert a given number less than 1000 into words
    function convertLessThanOneThousand(num) {
        let result = '';

        if (num >= 100) {
            result += words[Math.floor(num / 100)] + " Hundred ";
            num %= 100;
        }

        if (num >= 20) {
            result += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }

        if (num > 0) {
            result += words[num] + " ";
        }

        return result;
    }

    // Function to convert the entire amount into words
    function convertAmount(amount) {
        if (amount === 0) {
            return "Zero";
        }

        let words = '';

        // Splitting the amount into crores, lakhs, thousands, and ones
        const crore = Math.floor(amount / 10000000);
        const lakh = Math.floor((amount % 10000000) / 100000);
        const thousand = Math.floor((amount % 100000) / 1000);
        const ones = amount % 1000;

        // Convert crore part to words
        if (crore > 0) {
            words += convertLessThanOneThousand(crore) + "Crore ";
        }

        // Convert lakh part to words
        if (lakh > 0) {
            words += convertLessThanOneThousand(lakh) + "Lakh ";
        }

        // Convert thousand part to words
        if (thousand > 0) {
            words += convertLessThanOneThousand(thousand) + "Thousand ";
        }

        // Convert ones part to words
        if (ones > 0) {
            words += convertLessThanOneThousand(ones);
        }

        return words.trim();
    }

    // Convert the amount to words and append "Rupees Only"
    const amountInWords = convertAmount(amount) + " Rupees Only";
    return amountInWords;
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