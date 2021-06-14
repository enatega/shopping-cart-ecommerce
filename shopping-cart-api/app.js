/* eslint-disable no-path-concat */
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const path = require('path')
const engines = require('consolidate')
// const { graphqlUploadExpress } = require('graphql-upload');
const typeDefs = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')
const paypal = require('./routes/paypal')
const stripe = require('./routes/stripe')
const isAuth = require('./middleware/is-auth')
const dotenv = require('dotenv')
const http = require('http')
const app = express()
dotenv.config()

app.engine('ejs', engines.ejs)
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.static('public'))

app.use(isAuth)

app.use('/paypal', paypal)
app.use('/stripe', stripe)

// app.use(
//   '/graphql',
//   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
//   graphqlHttp({
//     schema: graphQlSchema,
//     rootValue: graphQlResolvers,
//     graphiql: true
//   })
// );

app.get('/', function(req, res) {
  res.sendFile(
    path.join(__dirname + '/static/food-delivery-landingPage/index.html')
  )
})
app.get('/privacy-policy', function(req, res) {
  res.sendFile(
    path.join(
      __dirname + '/static/food-delivery-landingPage/privacy-policy.html'
    )
  )
})
app.get('/chat', function(req, res) {
  res.sendFile(
    path.join(
      __dirname + '/static/food-delivery-landingPage/food-delivery-chat.html'
    )
  )
})

app.use('/dashboard', express.static(path.join(__dirname, '/build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res }
  }
})
server.applyMiddleware({ app })
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

mongoose
  .connect(
    process.env.CONNECTION_STRING,
    // `mongodb://dbuser:dbpassword123@ds259586.mlab.com:59586/storedb`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('server started at port', process.env.PORT)
    httpServer.listen(process.env.PORT)
    console.log(
      `🚀  server started at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  })
  .catch(err => {
    console.log(err)
  })

// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)
