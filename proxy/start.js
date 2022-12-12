const app = require('./server.js');
const config = require('./config.js');

app.listen(config.get('port'));