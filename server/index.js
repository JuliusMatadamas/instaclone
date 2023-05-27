const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolvers')
require('dotenv').config({path:'.env'});

mongoose.connect(process.env.BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log('Connected to MongoDB');
    server().then(() => {

    });
}).catch(err => {
    console.log(`Error code: ${err.code}`, `Error message: ${err.message}`);
})

async function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers
    })

    serverApollo.listen().then(({ url }) => {
        console.log(`Server ready at the url ${url}`);
    })
}