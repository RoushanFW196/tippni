

import {z} from 'zod';



export const usernameValidation=z.string().min(2).max(20);

export const signUpSchema=z.object({
  username: usernameValidation,
  email:z.string().email({message:'Invalid Email Address'})

})