import React, { useState, useRef } from "react";
import { FaTwitter } from "react-icons/fa";

function QuoteMachine() {
    document.title = "Imran's Quote Machine";

    const [quoteData, setQuoteData] = useState({
        quote: "Click for a quote",
        author: "Dev"
    });
    const [fade, setFade] = useState(true);

    function quoteGenerator() {
        return fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: {
                'X-Api-Key': 'YRHakSbOF9rZxkJGuU5L/g==or1VcF77YD0Az0qf'
            }
        })
        .then(response => response.json())
        .then(data => ({
            quote: data[0].quote,
            author: data[0].author
        }))
        .catch(error => {
            console.error("Error fetching quote:", error);
            return {
                quote: "Failed to load quote",
                author: "Error"
            };
        });
    }

    function nextQuote() {
        // Start fade out immediately
        setFade(false);
        
        // Start both the API call and fade timer simultaneously
        const apiCall = quoteGenerator();
        const fadeTimer = new Promise(resolve => setTimeout(resolve, 400));
        
        // When both complete, update quote and fade in
        Promise.all([apiCall, fadeTimer])
            .then(([newQuote]) => {
                setQuoteData(newQuote);
                setFade(true);
            });
    }

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${quoteData.quote}" - ${quoteData.author}`
    )}`;

    return (
        <div>
            <div id="quote-box" className="quote-box">
                <div id="text" className={`text ${fade ? "fade-in" : "fade-out"}`}>
                    {quoteData.quote}
                </div>
                <span id="author" className={`author ${fade ? "fade-in" : "fade-out"}`}>
                    -{quoteData.author}
                </span>
                <div className="btn-container">
                    <button id="new-quote" className="new-quote btn" onClick={nextQuote}>
                        New Quote
                    </button>
                    <button className="btn">
                        <a id="tweet-quote" className="tweet-quote" href={tweetUrl} target="_top" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuoteMachine;