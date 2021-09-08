import * as core from '@actions/core'
import {wait} from './wait'
import {PythonShell} from 'python-shell'

async function run(): Promise<void> {
  try {
    const path = process.cwd()
    PythonShell.run(`${path}/src/test.py`, undefined, function (err) {
      if (err) throw err
      core.debug('successful')
    })
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
