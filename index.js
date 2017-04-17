const app = require('./server/app')
const PORT = 3000

app.listen(PORT, () =>
  console.log(`Carousel Server running at PORT ${PORT}...`))
