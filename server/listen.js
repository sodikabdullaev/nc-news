const app = require('../app')

app.listen(9090, (err) => {
	if (err) console.log('Can not start the server')
	else console.log('Server is running on 9090...')
})
