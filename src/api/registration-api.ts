import axios from "axios";


const instance = axios.create({
    baseURL:
        'https://neko-back.herokuapp.com/2.0',
    // process.env.REACT_APP_BACK_URL
    // || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const registrationApi = {
    registrationUser(email: string, password: string) {
        return instance.post<RegistrationApiType>('auth/register',
            {
                email: email,
                password: password
            }
        )
    }
}

type RegistrationApiType = {
    addedUser: {}
    error?: string
}
