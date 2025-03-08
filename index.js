const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to generate a random card number
app.get('/gen', (req, res) => {
    const cardType = req.query.type || 'Visa'; // Default to Visa
    try {
        const cardNumber = generateRandomCardNumber(cardType);
        res.json({ cardType, cardNumber });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Function to generate a random card number
function generateRandomCardNumber(cardType) {
    let prefix;
    let length;

    // Define prefixes and lengths for different card types
    switch (cardType) {
        case 'Visa':
            prefix = '4';
            length = 16;
            break;
        case 'MasterCard':
            prefix = '5';
            length = 16;
            break;
        case 'AmericanExpress':
            prefix = '37';
            length = 15;
            break;
        case 'Discover':
            prefix = '6';
            length = 16;
            break;
        default:
            throw new Error('Invalid card type');
    }

    // Generate the remaining digits
    let cardNumber = prefix;
    while (cardNumber.length < length - 1) {
        cardNumber += Math.floor(Math.random() * 10);
    }

    // Add the Luhn check digit
    cardNumber += calculateLuhnCheckDigit(cardNumber);

    return cardNumber;
}

// Function to calculate the Luhn check digit
function calculateLuhnCheckDigit(cardNumber) {
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let digit = parseInt(cardNumber[cardNumber.length - 1 - i], 10);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return (10 - (sum % 10)) % 10;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
