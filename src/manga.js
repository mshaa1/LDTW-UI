document.querySelector('.quantity-button-left').addEventListener('click', function() {
    let label = document.querySelector('.spinner');
    let value = parseInt(label.textContent, 10);
    value = isNaN(value) ? 0 : value;
    value = value > 1 ? value - 1 : 1; // Ensure the value doesn't go below 1
    label.textContent = value;
});

document.querySelector('.quantity-button-right').addEventListener('click', function() {
    let label = document.querySelector('.spinner');
    let value = parseInt(label.textContent, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    label.textContent = value;
});