import User from '../../models/User'

interface IData {
    id?: string
    mail?: string
}

export const getUserService = async (data: IData) => {
    let user = null

    if (data.id) {
        user = await User.findById(data.id).populate({
            path: 'consortium',
            select: 'name address img admin status',
            populate: {
                path: 'admin',
                select: 'name lastname email phone img',
            },
        })
    } else {
        user = await User.findOne({ email: data.mail }).populate({
            path: 'consortium',
            select: 'name address img admin status',
            populate: {
                path: 'admin',
                select: 'name lastname email phone img',
            },
        })
    }

    if (!user) {
        const response = {
            ok: false,
            status: 404,
        }
        return response
    }

    if (user.status !== 'active') {
        const response = {
            ok: false,
            status: 401,
        }
        return response
    }

    const response = {
        ok: true,
        status: 200,
        user,
    }

    return response
}
