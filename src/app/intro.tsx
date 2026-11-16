import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Text, View } from 'react-native'

export default function Intro() {
	const router = useRouter()

	const fadeAnim = useRef(new Animated.Value(0)).current
	const scaleAnim = useRef(new Animated.Value(0.8)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 5,
				useNativeDriver: true,
			}),
		]).start()

		const timer = setTimeout(() => {
			router.replace('/home')
		}, 1500)

		return () => clearTimeout(timer)
	}, [])

	return (
		<View className='flex-1 items-center justify-center bg-violet-700 px-8'>
			<Animated.View
				style={{
					opacity: fadeAnim,
					transform: [{ scale: scaleAnim }],
				}}
				className='items-center'
			>
				<View className='mb-7 h-28 w-28 items-center justify-center rounded-[32px] bg-white'>
					<Text className='text-7xl font-bold text-violet-600'>“</Text>
				</View>

				<Text className='text-4xl font-bold text-white'>Daily Quotes</Text>

				<Text className='mt-3 text-base text-violet-200'>
					Har bir kun — yangi ilhom.
				</Text>
			</Animated.View>

			<View className='absolute bottom-16 items-center'>
				<ActivityIndicator size='small' color='white' />
				<Text className='mt-4 text-sm text-violet-200'>
					Ilova yuklanmoqda...
				</Text>
			</View>
		</View>
	)
}
