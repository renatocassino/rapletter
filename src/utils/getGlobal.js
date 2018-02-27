const getGlobal = (name, timeout = 5000, interval = 10) =>
  new Promise((resolve, reject) => {
    const startTime = Date.now()

    const check = () => {
      if (window[name]) {
        return resolve(window[name])
      }

      if(timeout < Date.now() - startTime) {
        return reject(new Error('Timeout loading ' + name))
      }

      window.setTimeout(check, interval)
    }

    check()
  })

export default getGlobal
