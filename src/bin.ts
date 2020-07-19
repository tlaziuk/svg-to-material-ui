import svgToMaterialUi from './index'

if (process.stdin.isTTY) {
  console.error('can not run in TTY mode')
  process.exit(1)
}

svgToMaterialUi(process.stdin)
  .then(
    (result) => new Promise<unknown>(
      (resolve, reject) => {
        process.stdout.write(
          result,
          (error) => {
            if (error) {
              reject(error)
            } else {
              resolve()
            }
          }
        )
      }
    )
  )
  .then(
    () => {
      process.exit(0)
    },
  )
  .catch(
    (error) => {
      console.error(error)
      process.exit(1)
    }
  )
