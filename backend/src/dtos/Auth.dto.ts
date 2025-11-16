import z from "zod"

const RegisterBody = z.object({
    email: z.email(),
    password: z.string().min(6),
    username: z.string().min(3)
})

const LoginBody = RegisterBody.omit({ username: true })

type TRegisterBody = z.infer<typeof RegisterBody>;
type TLoginBody = z.infer<typeof LoginBody>;

const SafeUser = z.object({
    username: z.string(),
    email: z.email(),
    loyaltyPoints: z.number(),
    isAdminstartor: z.boolean(),
}).strip();


export { LoginBody, RegisterBody, SafeUser }
export type { TRegisterBody, TLoginBody }