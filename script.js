// Get quotes from API

// Asynchronous request can run at any time, independently. Doesn't stop browser loading the page.

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    // This data won't be set until it has received a response from API. 'await' makes variable wait before being declared - so it doesn't return undefined.
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

    }
}

function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from API array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check is authoer field is blank - replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine font size

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On load
getQuotes();

