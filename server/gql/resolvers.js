const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const resolvers = {
    Query: {
        // User
        getUser: () => {
            console.log('Obteniendo usuario');
            return null;
        }
    },

    Mutation: {
        // User
        register: async (_, { input }) => {
            const newUser = input;
            newUser.email = newUser.email.toLowerCase();
            newUser.password = newUser.password.toLowerCase();
            const { email, username, password } = newUser;

            // Revisar si existe el email
            const foundEmail = await User.findOne({ email });
            if (foundEmail) throw new Error("El email ya se encuentra en uso.");

            // Revisar si el username está en uso
            const foundUsername = await User.findOne({ username });
            if (foundUsername) throw new Error("El nombre de usuario ya se encuentra en uso.");

            // Encriptar el password
            const salt = await bcryptjs.genSaltSync(10)
            newUser.password = await bcryptjs.hash(password, salt);

            try {
                const user = new User(newUser);
                user.save();
                return user;
            } catch (e) {
                console.log(e);
            }

            return input;
        }
    }
}

module.exports = resolvers;