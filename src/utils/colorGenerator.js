export const colorGenerator = () => {
  const red = Math.floor(Math.random() * 255) + 1
  const green = Math.floor(Math.random() * 255) + 1
  const blue = Math.floor(Math.random() * 255) + 1

  return `rgba(${red}, ${green}, ${blue}, 0.2)`
}
