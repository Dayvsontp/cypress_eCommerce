const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImRlM2IwY2EyLTRmZDUtNDI5MC04N2E3LTBjMDBiNjYyZDc4My0xNzU4MDcyNTE2NzkyIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiYmIwODhmZjctZjI2Ni00M2MyLTkwMjYtZjA2NzYxYWFjOTY4IiwidHlwZSI6InQifQ.kF9lpGPhoDPGZAEmkm94M_zR8VHud3bmTONpuO0A4fY"

cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})
