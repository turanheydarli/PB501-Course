function Login(user) {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    if (username == null) {
        console.log("User not registered")

        return {
            err: "User not found"
        }
    }

    if (username == user.username) {
        if (password == user.password) {
            return {
                message: "Login successfull",
                err: null
            }
        }
    }

    return {
        err: "Username or password is wrong"
    }
}

function RegisterUser(user) {
    const username = localStorage.getItem('username')

    if (username == null) {
        localStorage.setItem('username', user.username)
        localStorage.setItem('password', user.password)

        return {
            message: "User registered",
            err: null
        }

    }

    return {
        err: "Something went wrong"
    }
}

