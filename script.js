document.getElementById('generateBtn').addEventListener('click', function() {
    const cardNumber = generateCardNumber();
    document.getElementById('cardNumberDisplay').textContent = cardNumber;
});

function generateCardNumber() {
    const prefix = '539268'; // You can change this prefix as needed
    let cardNumber = prefix;

    // Generate the remaining digits
    for (let i = 0; i < 10; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }

    // Add the |01|29|820 part
    cardNumber += '|01|29|820';

    return cardNumber;
}
