import React, {useState,useEffect, useRef} from "react"; 
import { FaTwitter } from "react-icons/fa";

function QuoteMachine(){
    document.title = "Imran's Quote Machine";

    var quoteArr = [
        {quote:"In life, it's the thing we enjoy struggling for that provides us the most happiness.", author:"Jordan Tarver"},
        {quote:"I sought out pain, fell in love with suffering. Eventually, transformed myself from the weakest piece of shit on the planet into the hardest man god ever created, or so I tell myself.", author:"David Goggins"},
        {quote:"Time is the biggest motherfucker; it doesn't give shit about who dies, born, cries, or hurt. It just keeps going.", author:"Imran"},
        {quote:"I rather be a loser who tries than a champion who cheats.", author:"Imran"},
        {quote:"What's worse, trying or failing, or not trying and wondering what could have been?", author:"Jordan Tarver"},
        {quote: "The magic you’re looking for is in the work you’re avoiding", author:"Dipen Parmer"},
        {quote:"The pain of doing nothing is always worse than the pain of doing something", author:"Sleepy Charlie"},
        {quote:"In an important decision of life, the best thing you can do is the right thing the next best thing you can do is the wrong thing and the worst thing you can do is the nothing", author: "Theodore Roosevelt"},
        {quote:"Don't depend too much on anyone in this world, because even your own shadow leaves you when you are in darkness.", author:"Ibn Taymiyyah"},
        {quote: "Wise men talk because they have something to say; fools, because they have to say something.", author:"Plato"},
        {quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        {quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        {quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        {quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        {quote: "Do not watch the clock. Do what it does. Keep going.", author: "Sam Levenson" },
        {quote: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
        {quote: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
        {quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        {quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        {quote: "Act as if what you do makes a difference. It does.", author: "William James" }
      ];

    var [currentQuote, setQuote] = useState(() => quoteArr[Math.floor(Math.random() * quoteArr.length)]);
    var [fade, setFade] = useState(false);
    var prevQuoteRef = useRef(currentQuote);

    var getRandomQuote = () => {
        var newQuote;
        do {
            newQuote = quoteArr[Math.floor(Math.random() * quoteArr.length)];
        } while (
            quoteArr.length > 1 && 
            newQuote.quote === prevQuoteRef.current.quote
        );
        
        prevQuoteRef.current = newQuote;
        return newQuote;
    };

    function nextQuote() {
        setFade(false);
        setTimeout(() => {
            setQuote(getRandomQuote());
            setFade(true);
        }, 400);
    }

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${currentQuote.quote}" - ${currentQuote.author}`
    )}`;

    return(
    <div>
        <div id="quote-box" className="quote-box">
            <div id="text" className={`text ${fade ? "fade-in" : "fade-out"}`}>{currentQuote.quote}</div>
            <span id="author" className={`author ${fade ? "fade-in" : "fade-out"}`}>-{currentQuote.author}</span>
            <div className="btn-container">
                <button id="new-quote" className="new-quote btn" onClick={nextQuote}>New Quote</button>
                <button className="btn"><a id="tweet-quote" className="tweet-quote" href={tweetUrl} target="_top" rel="noopener noreferrer"><FaTwitter /></a></button>
            </div>
        </div>
        <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
    </div>
    );
}

export default QuoteMachine;