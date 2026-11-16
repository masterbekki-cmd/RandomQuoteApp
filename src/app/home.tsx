import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Share,
	Text,
	View,
} from 'react-native'

import QuoteCard from '../components/QuoteCard'
import type { Quote } from '../services/quoteService'
import { getRandomQuote } from '../services/quoteService'

export default function Home() {
	const [quote, setQuote] = useState<Quote | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchQuote = async () => {
		try {
			setLoading(true)
			setError(null)

			const data = await getRandomQuote()
			setQuote(data)
		} catch {
			setError('Something went wrong. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const shareQuote = async () => {
		if (!quote) return

		await Share.share({
			message: `"${quote.quote}"\n\n— ${quote.author}`,
		})
	}

	useEffect(() => {
		fetchQuote()
	}, [])

	return (
		<ScrollView className='flex-1 bg-slate-50 px-6 pt-[80px]'>
			<View className='mb-10'>
				<Text className='text-sm font-semibold uppercase tracking-[3px] text-violet-600'>
					YOUR DAILY INSPIRATION
				</Text>

				<Text className='mt-3 text-4xl font-bold text-slate-900'>
					Daily Quotes
				</Text>

				<Text className='mt-3 text-base leading-6 text-slate-500'>
					Find inspiration in every word. Make every day meaningful.
				</Text>
			</View>

			<View className='min-h-[220px] justify-center'>
				{loading && <ActivityIndicator size='large' color='#8B5CF6' />}

				{error && <Text className='text-center text-red-500'>{error}</Text>}

				{!loading && !error && quote && (
					<QuoteCard quote={quote.quote} author={quote.author} />
				)}
			</View>

			<Pressable
				onPress={fetchQuote}
				disabled={loading}
				className='mt-8 items-center rounded-2xl bg-violet-600 py-5 active:bg-violet-700'
			>
				<Text className='text-base font-bold text-white'>
					{loading ? 'Loading...' : '↻  New Quote'}
				</Text>
			</Pressable>
			<Pressable
				onPress={shareQuote}
				disabled={!quote}
				className='mt-3 items-center rounded-2xl border border-violet-200 py-4'
			>
				<Text className='font-bold text-violet-700'>↗ Share Quote</Text>
			</Pressable>

			<Text className='mt-8 text-center text-sm text-slate-400'>
				Made with ❤️
			</Text>
		</ScrollView>
	)
}
