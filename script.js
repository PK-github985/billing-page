function calculateTotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#billing-table tbody tr');

    rows.forEach(row => {
        const qty = row.querySelector('.quantity').value || 0;
        const price = row.querySelector('.price').value || 0;
        const total = qty * price;
        row.querySelector('.row-total').textContent = total.toFixed(2);
        subtotal += total;
    });

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);

    let discount = document.getElementById('discount').value || 0;
    discount = (subtotal * discount) / 100;
    document.getElementById('discount-amount').textContent = discount.toFixed(2);

    const gstCheckbox = document.getElementById('gst');
    let gstAmount = 0;
    if (gstCheckbox.checked) {
        const gstRate = document.querySelector('input[name="gst-rate"]:checked');
        if (gstRate) {
            gstAmount = (subtotal - discount) * (parseFloat(gstRate.value) / 100);
        }
    }

    document.getElementById('gst-amount').textContent = gstAmount.toFixed(2);
    const totalAmount = subtotal - discount + gstAmount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function addRow() {
    const tableBody = document.querySelector('#billing-table tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${tableBody.rows.length + 1}</td>
        <td><textarea class="description" rows="1"></textarea></td>
        <td><input type="number" class="quantity" oninput="calculateTotal()"></td>
        <td><input type="number" class="price" oninput="calculateTotal()"></td>
        <td class="row-total">0.00</td>
    `;

    tableBody.appendChild(newRow);
}

function toggleGST() {
    const gstPercentage = document.getElementById('gst-percentage');
    if (document.getElementById('gst').checked) {
        gstPercentage.style.display = 'block';
    } else {
        gstPercentage.style.display = 'none';
    }
    calculateTotal();
}

function printBill() {
    window.print();
}

function resetForm() {
    document.getElementById('billing-form').reset();
    document.getElementById('gst-percentage').style.display = 'none';
    const tableBody = document.querySelector('#billing-table tbody');
    while (tableBody.rows.length > 1) {
        tableBody.deleteRow(1);
    }
    calculateTotal();
}

document.addEventListener('DOMContentLoaded', () => {
    calculateTotal();
});
