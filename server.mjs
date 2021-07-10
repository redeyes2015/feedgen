// Require the framework and instantiate it
import Fastify from 'fastify';
import genBookWalkerFeed from './genBookWalkerFeed.mjs';

const fastify = Fastify({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/bookwalker_atom.xml', () => {
  return genBookWalkerFeed('https://www.bookwalker.com.tw/category/3/28?order=sell_desc')
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(2015)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

