import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export class CryptToken {
    
    public encryptToken = (token: string): string => {
        const iv = randomBytes(16)
        
        const cipher = createCipheriv(process.env.ALGORITHM as string, Buffer.from(process.env.SECRETKEY as string, 'utf-8'), iv)
     
        let encryptedToken = cipher.update(token, 'utf-8', 'hex')
        encryptedToken += cipher.final('hex')

        return iv.toString('hex') + ':' + encryptedToken
    }

    public decryptToken = (encryptedToken: string): string => {

        const [ivString, tokenString] = encryptedToken.split(':')
        const iv = Buffer.from(ivString, 'hex')
        const decipher = createDecipheriv(process.env.ALGORITHM as string, Buffer.from(process.env.SECRETKEY as string), iv)

        let token = decipher.update(tokenString, 'hex', 'utf-8')
        token += decipher.final('utf-8')

        return token
    }

}