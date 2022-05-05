import { TokenResponse, V1AggregateResults, WhoopUser, HeartRateDataSet, SleepEvent, V1ActivityType } from './whoopTypes';

const BASE_URL = 'https://api-7.whoop.com';


export class WhoopApi {
	
	private constructor(
		private readonly accessToken: string,
		private readonly refreshToken: string,
		private readonly userId: number
	) {
	}

	public static async makeWhoopApi(username: string, password: string) {
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			}, 
			body: JSON.stringify({
				"username": username,
				"password": password,
				"grant_type": "password",
				"issueRefresh": true
			})
		};
		const fetchToken = async (): Promise<TokenResponse> => {
			const response = await fetch(BASE_URL + '/oauth/token', options);
			return response.json();
		}
		const token = await fetchToken();
		return new WhoopApi(token.access_token, token.refresh_token, token.user.id);
	}

	public async getUserData(): Promise<WhoopUser> {
		const options = {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + this.accessToken,
				'content-type': 'application/json',
			}
		}
		const response = await fetch(`${BASE_URL}/users/${this.userId}?include=teams`, options);
		return await response.json();
	}

	public async getCycles(start: Date, end: Date): Promise<V1AggregateResults> {
		const options = {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + this.accessToken,
				'content-type': 'application/json',
			}
		}
		const response = await fetch(`${BASE_URL}/activities-service/v1/cycles/aggregate/range/${this.userId}?startTime=${start.toISOString()}&endTime=${end.toISOString()}`, options);
		return await response.json();
	}

	public async getHrData(start: Date, end: Date): Promise<HeartRateDataSet> {
		const options = {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + this.accessToken,
				'content-type': 'application/json',
			}
		};
		
		const response = await fetch(`${BASE_URL}/users/${this.userId}/metrics/heart_rate?end=${end.toISOString()}&order=t&start=${start.toISOString()}&step=60`, options);
		console.log(response);
		const response2 = await fetch('https://api-7.whoop.com/users/391145/metrics/heart_rate?end=2022-05-05T03:59:59.999Z&order=t&start=2022-05-03T04:00:00.000Z&step=60', options);
		console.log(response2);
		try {
			return await response.json();
		} catch (error) {
			throw new Error('Time range too long.');
		}
	}

	public async getSleepEvents(sleepId: number): Promise<Array<SleepEvent>> {
		const options = {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + this.accessToken,
				'content-type': 'application/json',
			}
		}
		const response = await fetch(`${BASE_URL}/activities-service/v1/sleep-events?activityId=${sleepId}&apiVersion=7`, options);
		return await response.json();
	}

	public static async getAllActivities(): Promise<Array<V1ActivityType>> {
		const response = await fetch(`${BASE_URL}/activities-service/v1/sports`);
		return await response.json();
	}
}
