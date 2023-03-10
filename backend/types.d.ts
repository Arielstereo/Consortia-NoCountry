import { ERoles } from './src/utils'

declare global {
    namespace Express {
        interface Request {
            id: string
            role: ERoles
            token: string
        }
    }
}

declare module '*.json' {
    const value: unknown
    export default value
}
