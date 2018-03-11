const idGenerator = function*() {
  let id = 0
  while(true)
    yield ++id
}


const getId = idGenerator()

export default getId