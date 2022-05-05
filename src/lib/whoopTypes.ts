export type TokenResponse = {
	access_token: string,
	expires_in: number,
	membershipStatus: string,
	needsProfileCompletion: string,
	refresh_token: string,
	token_type: string,
	user: WhoopUser,
}

export type WhoopUser = {
	adminDivision: string,
	avatarUrl?: string,
	city: string,
	country: string,
	createdAt: string,
	email: string,
	firstName: string,
	fullName: string,
	id: number,
	lastName: string,
	preferences: {
		performanceOptimizationAssessment: boolean, 
		performanceOptimizationDayOfWeek: number
	},
	privacyProfile: {
		overview: 'all', 
		intensity: 'all', 
		recovery: 'all', 
		sleep: 'all', 
		stats: 'all',
	}
	teams: Array<number>,
	updatedAt: string,
	username: string,
	profile: WhoopProfile
}

export type WhoopProfile = {
	avgHeartRate: number,
	bioDataId: number,
	birthday: string,
	canUploadData: boolean,
	createdAt: string,
	fitnessLevel: string,
	gender: string,
	height: number,
	id: number,
	kilojoules: number
	maxHeartRate: number,
	minHeartRate: number,
	physiologicalBaseline?: number,
	timezoneOffset: string,
	unitSystem: string,
	updatedAt: string,
	userId: number
	weight: number
}

export type V1AggregateResults = {
	total_count: number,
	offset: number,
	records: Array<V1AggregateResult>
}

type V1AggregateResult = {
	cycle: V1Cycle,
	sleeps: Array<V1Sleep>,
	recovery: V1Recovery,
	workouts: Array<V1Workout>
}

type V1Cycle = {
	id: number,
	created_at: string,
	updated_at: string,
	scalted_strain: number,
	during: string,
	user_id: number,
	sleep_need: number,
	predicted_end: string,
	timezone_offset: string,
	intensity_score: number,
	data_state: string,
	day_strain: number,
	day_kilojoules: number,
	day_avg_heart_rate: number,
	day_max_heart_rate: number
}

type V1Sleep = {
	cycle_id: number,
	created_at: string,
	updated_at: string,
	activity_id: number,
	during: string,
	score: number,
	quality_duration: number,
	latency: number,
	max_heart_rate: number,
	average_heart_rate: number,
	debt_pre: number,
	debt_post: number,
	need_from_strain: number,
	sleep_need: number,
	habitual_sleep_need: number,
	disturbances: number,
	time_in_bed: number,
	light_sleep_duration: number,
	slow_wave_sleep_duration: number,
	cycles_count: number,
	wake_duration: number,
	arousal_time: number,
	no_data_duration: number,
	in_sleep_efficiency: number,
	credit_from_naps: number,
	hr_baseline: number,
	respiratory_rate: number,
	sleep_consistency: number,
	algo_version: string,
	projected_score: number,
	projected_sleep: number,
	optimal_sleep_times: string,
	kilojoules: number,
	user_id: number,
	timezone_offset: string,
	percent_recorded: number,
	auto_detected: boolean,
	state: string,
	responded: boolean,
	team_act_id: number,
	source: string,
	is_normal: boolean,
	is_significant: boolean,
	is_nap: boolean
}

type V1Recovery = {
	during: string,
	id: number,
	date: string,
	calibrating: boolean,
	created_at: string,
	updated_at: string,
	user_id: number,
	sleep_id: number,
	survey_response_id: number,
	cycle_id: number,
	responded: boolean,
	recovery_score: number,
	resting_heart_rate: number,
	hrv_rmssd: number,
	state: string,
	prob_covid: number,
	hr_baseline: number,
	skin_temp_celcius: number,
	spo2: number,
	algo_version: string,
	rhr_component: number,
	hrv_component: number,
	history_size: number,
	recovery_rate: number,
	is_normal: boolean
}

type V1Workout = {
	cycle_id: number,
	created_at: string,
	updated_at: string,
	sport_id: number,
	activity_id: number,
	gps_enabled: boolean,
	intensity_score: number,
	max_heart_rate: number,
	average_heart_rate: number,
	distance: number,
	raw_intensity_score: number,
	cumulative_workout_intensity: number,
	zone_durations: [number, number, number, number, number, number],
	projected_score: number,
	kilojoules: number,
	user_id: number,
	during: string,
	timezone_offset: string,
	survey_response_id: string,
	percent_recorded: number,
	auto_detected: boolean,
	state: string,
	responded: boolean,
	team_act_id: number,
	source: string
}

export type HeartRateDataSet = {
	name: string,
	start: number,
	values: Array<{
		data: number,
		time: number
	}>
}

export type SleepEvent = {
	activity_id: number,
	during: string,
	type: string
}

export type V1ActivityType = {
	id: number,
	name: string,
	created_at: string,
	updated_at: string,
	has_gps: boolean,
	icon_url: string,
	is_current: boolean,
	has_survey: boolean,
	category: string,
}