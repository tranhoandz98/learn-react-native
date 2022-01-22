import axios from 'axios'

const EXPO_URL = "https://api.expo.dev/v2/push/send"
const TOKEN_SERVER = "https://gau-server.glitch.me/notifications"

export interface Token{
    id:number
    token:string
}

export const submitToken = async (token: string) => {
    const response = await axios.post(TOKEN_SERVER, { token })
    const result = response.data as Token
    return result
}

export const getToken = async (id:number| string) => {
    const response = await axios.get(`${TOKEN_SERVER}/${id}`)
    const result = response.data as Token
    return result
}

export const sendPushNotification = async (token: string, title: string, body: string) => {
    const message = {
        to: token,
        sound: 'default',
        title,
        body
    }
    await axios.post(EXPO_URL, message)
    alert('Triệu hồi gấu 👦 thành công!')
}