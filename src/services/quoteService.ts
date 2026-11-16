export interface Quote {
	id: number
	quote: string
	author: string
}

const API_URL = 'https://dummyjson.com/quotes/random'

export const getRandomQuote = async (): Promise<Quote> => {
	const response = await fetch(API_URL)

	if (!response.ok) {
		throw new Error('Failed to fetch quote')
	}

	const data: Quote = await response.json()

	return data
}
