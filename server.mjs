// Require the framework and instantiate it
import Fastify from 'fastify';
import genBookWalkerFeed from './genBookWalkerFeed.mjs';

const fastify = Fastify({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/bookwalker_atom.xml', () => {
  return genBookWalkerFeed('https://www.bookwalker.com.tw/search?order=sell_desc&m=3&s=28')
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 80;
console.log({ port });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
