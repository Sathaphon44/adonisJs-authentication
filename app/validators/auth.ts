import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
    vine.object({
        email: vine.string(),
        password: vine.string(),
    })
)

export const signUpValidator = vine.compile(
    vine.object({
        username: vine.string(),
        email: vine.string(),
        password: vine.string(),
        roles: vine.array(
            vine.number().in([1, 2])
        )
    })
)
