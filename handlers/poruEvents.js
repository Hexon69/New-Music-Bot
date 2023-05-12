const { readdirSync } = require('fs');
const Ascii = require('ascii-table');

module.exports = (client) => {
  const commands = readdirSync(
    __dirname.replace('handlers', 'poruEvents'),
  ).filter((file) => file.endsWith('.js'));

  for (const file of commands) {
    try {
      const pull = require(`${__dirname.replace(
        'handlers',
        'poruEvents',
      )}/${file}`);

      if (pull.event && typeof pull.event !== 'string') {
        continue;
      }
      pull.event = pull.event || file.replace('.js', '');

      client.poru.on(pull.event, pull.run.bind(null, client));
 client.logger.log(`Poru Events: ${pull.event}`, "event")
    } catch (err) {
      console.log(`Error while loading poru event: \n${err}`);
    }
  }

};