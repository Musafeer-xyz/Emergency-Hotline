// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // --- STATE VARIABLES ---
    // ===================================================================
    let heartCount = 0;
    let coins = 100;
    let copyCount = 2; // Initial count from the design

    // ===================================================================
    // --- DOM ELEMENT SELECTORS ---
    // ===================================================================
    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const navbarCopyBtnEl = document.getElementById('copy-btn');
    const heartIcons = document.querySelectorAll('.heart-icon');
    const callButtons = document.querySelectorAll('.call-btn');
    const historyListEl = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const cardCopyButtons = document.querySelectorAll('.card-copy-btn'); // Selects the buttons you just updated

    // ===================================================================
    // --- FUNCTIONS ---
    // ===================================================================

    // Updates the heart count display in the navbar
    const updateHeartCountDisplay = () => {
        heartCountEl.textContent = heartCount;
    };

    // Updates the coin count display in the navbar
    const updateCoinCountDisplay = () => {
        coinCountEl.textContent = coins;
    };
    
    // Updates the copy count display in the navbar
    const updateCopyCountDisplay = () => {
        navbarCopyBtnEl.textContent = `${copyCount} Copy`;
    };

    // Creates and adds a history item to the list
    const addCallToHistory = (serviceName, serviceNumber) => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div class="history-item-info">
                <p>${serviceName}</p>
                <p>${serviceNumber}</p>
            </div>
            <span class="history-item-time">${timeString}</span>
        `;
        historyListEl.prepend(historyItem);
    };

    // ===================================================================
    // --- EVENT LISTENERS ---
    // ===================================================================

    // Event Listener for Heart Icons
    heartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const isNowActive = icon.classList.toggle('active');
            heartCount += isNowActive ? 1 : -1;
            updateHeartCountDisplay();
        });
    });

    // Event Listener for Call Buttons
    callButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (coins < 20) {
                alert("Sorry, you need at least 20 coins to make a call.");
                return;
            }
            coins -= 20;
            updateCoinCountDisplay();
            const card = event.target.closest('.service-card');
            const serviceName = card.querySelector('.service-name').textContent;
            const serviceNumber = card.querySelector('.service-number').textContent;
            alert(`Calling: ${serviceName}\nNumber: ${serviceNumber}`);
            addCallToHistory(serviceName, serviceNumber);
        });
    });

    // Event listener for the "Clear History" button
    clearHistoryBtn.addEventListener('click', () => {
        historyListEl.innerHTML = '';
    });

    // Event listener for the "Copy" buttons on the cards
    cardCopyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // 1. Get the service number from the parent card
            const card = event.target.closest('.service-card');
            const numberToCopy = card.querySelector('.service-number').textContent.trim();

            // 2. Use the modern Clipboard API to copy the text
            navigator.clipboard.writeText(numberToCopy).then(() => {
                // This block runs if the copy was successful
                // 3. Show a success alert
                alert(`Copied "${numberToCopy}" to clipboard!`);

                // 4. Increase the copy count and update the navbar display
                copyCount++;
                updateCopyCountDisplay();

            }).catch(err => {
                // This block runs if the copy failed for any reason
                console.error('Failed to copy text: ', err);
                alert('Could not copy text. Please try again.');
            });
        });
    });

    // ===================================================================
    // --- INITIALIZATION ---
    // ===================================================================
    updateHeartCountDisplay();
    updateCoinCountDisplay();
    updateCopyCountDisplay();

});