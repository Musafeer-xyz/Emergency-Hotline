
document.addEventListener('DOMContentLoaded', () => {

    let heartCount = 0;
    let coins = 100;
    let copyCount = 2; // Initial count from the design


    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const navbarCopyBtnEl = document.getElementById('copy-btn');
    const heartIcons = document.querySelectorAll('.heart-icon');
    const callButtons = document.querySelectorAll('.call-btn');
    const historyListEl = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const cardCopyButtons = document.querySelectorAll('.card-copy-btn');


    const updateHeartCountDisplay = () => {
        heartCountEl.textContent = heartCount;
    };


    const updateCoinCountDisplay = () => {
        coinCountEl.textContent = coins;
    };


    const updateCopyCountDisplay = () => {
        navbarCopyBtnEl.textContent = `${copyCount} Copy`;
    };


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

    heartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const isNowActive = icon.classList.toggle('active');
            heartCount += isNowActive ? 1 : -1;
            updateHeartCountDisplay();
        });
    });


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


    clearHistoryBtn.addEventListener('click', () => {
        historyListEl.innerHTML = '';
    });


    cardCopyButtons.forEach(button => {
        button.addEventListener('click', (event) => {

            const card = event.target.closest('.service-card');
            const numberToCopy = card.querySelector('.service-number').textContent.trim();


            navigator.clipboard.writeText(numberToCopy).then(() => {

                alert(`Copied "${numberToCopy}" to clipboard!`);


                copyCount++;
                updateCopyCountDisplay();

            }).catch(err => {

                console.error('Failed to copy text: ', err);
                alert('Could not copy text. Please try again.');
            });
        });
    });


    updateHeartCountDisplay();
    updateCoinCountDisplay();
    updateCopyCountDisplay();

});