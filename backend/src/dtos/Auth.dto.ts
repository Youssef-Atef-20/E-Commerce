import z from "zod"

const RegisterBody = z.object({
    email: z.email(),
    password: z.string().min(6),
    username: z.string().min(3)
})

const LoginBody = RegisterBody.omit({ username: true })

const changePasswordBody = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6)
})

type TRegisterBody = z.infer<typeof RegisterBody>;
type TLoginBody = z.infer<typeof LoginBody>;
type TChangePasswordBody = z.infer<typeof changePasswordBody>;

const SafeUser = z.object({
    username: z.string(),
    email: z.email(),
    loyaltyPoints: z.number(),
    isAdminstartor: z.boolean(),
}).strip();


export { LoginBody, RegisterBody, SafeUser , changePasswordBody }
export type { TRegisterBody, TLoginBody , TChangePasswordBody}