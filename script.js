document.getElementById('generateBtn').addEventListener('click', async () => {
    const cardType = document.getElementById('cardType').value;
    try {
        const response = await fetch(`http://localhost:3000/gen?type=${cardType}`);
        const data = await response.json();
        document.getElementById('cardNumberDisplay').textContent = `Card Number: ${data.cardNumber}`;
    } catch (error) {
        console.error('Error generating card number:', error);
        document.getElementById('cardNumberDisplay').textContent = 'Failed to generate card number.';
    }
});
