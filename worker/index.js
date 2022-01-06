const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  let inputNumber = Number(index);

  if (Number.isInteger(inputNumber) && inputNumber >= 0) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= inputNumber; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return inputNumber === 0 ? 0 : b;
  } else
    return "Bład danych"
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
