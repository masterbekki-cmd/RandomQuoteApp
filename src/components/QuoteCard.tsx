import { Text, View } from 'react-native'

interface QuoteCardProps {
	quote: string
	author: string
}

export default function QuoteCard({ quote, author }: QuoteCardProps) {
	return (
		<View className='rounded-3xl bg-violet-50 p-6'>
			<Text className='mb-5 text-4xl font-bold text-violet-300'>“</Text>

			<Text className='text-xl font-semibold leading-8 text-slate-800'>
				{quote}
			</Text>

			<View className='mt-6 h-[1px] bg-violet-100' />

			<Text className='mt-4 text-base font-medium text-violet-700'>
				— {author}
			</Text>
		</View>
	)
}
