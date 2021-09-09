import * as core from '@actions/core'
import {wait} from './wait'
import {PythonShell} from 'python-shell'

async function run(): Promise<void> {
  try {
    const path = process.cwd()

    const result = await new Promise((resolve, reject) => {
      PythonShell.run(`${path}/src/test.py`, undefined, (err, results) => {
        if (err) return reject(err)

        return resolve(results)
      })
    })
    core.setOutput('url', result)
    core.debug(`url value is ${result}`)
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
