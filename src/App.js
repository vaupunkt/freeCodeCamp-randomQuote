import "./App.css";
import useSWR from "swr";

function App() {
	function refreshPage() {
		window.location.reload(false);
	}
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, error, isLoading } = useSWR(
		"https://api.quotable.io/quotes/random",
		fetcher
	);
	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	const { content, author } = data[0];

	return (
		<section className="quoteBox" id="quote-box">
			<h2 className="quoteBox__quote" id="text">
				{content}
			</h2>
			<p className="quoteBox__author" id="author">
				{author}
			</p>
			<section className="interaction">
				<button
					className="interaction__button"
					id="new-quote"
					onClick={refreshPage}>
					New Quote
				</button>
				<a
					className="interaction__link"
					href={`https://twitter.com/intent/tweet?hashtags=quotes&text=%22${content}%22%20by%20${author}`}
					id="tweet-quote">
					Tweet Quote
				</a>
			</section>
		</section>
	);
}

export default App;
