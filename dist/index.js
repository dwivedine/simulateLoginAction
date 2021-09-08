require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(186));
const wait_1 = __nccwpck_require__(817);
const python_shell_1 = __nccwpck_require__(823);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const path = process.cwd();
            python_shell_1.PythonShell.run(__nccwpck_require__.ab + "test.py", undefined, function (err) {
                if (err)
                    throw err;
                core.debug('successful');
            });
            const ms = core.getInput('milliseconds');
            core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
            core.debug(new Date().toTimeString());
            yield wait_1.wait(parseInt(ms, 10));
            core.debug(new Date().toTimeString());
            core.setOutput('time', new Date().toTimeString());
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 817:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wait = void 0;
function wait(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            if (isNaN(milliseconds)) {
                throw new Error('milliseconds not a number');
            }
            setTimeout(() => resolve('done!'), milliseconds);
        });
    });
}
exports.wait = wait;


/***/ }),

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(87));
const path = __importStar(__nccwpck_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(747));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {


// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 823:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PythonShell = exports.NewlineTransformer = exports.PythonShellError = void 0;
const events_1 = __nccwpck_require__(614);
const child_process_1 = __nccwpck_require__(129);
const os_1 = __nccwpck_require__(87);
const path_1 = __nccwpck_require__(622);
const stream_1 = __nccwpck_require__(413);
const fs_1 = __nccwpck_require__(747);
const util_1 = __nccwpck_require__(669);
function toArray(source) {
    if (typeof source === 'undefined' || source === null) {
        return [];
    }
    else if (!Array.isArray(source)) {
        return [source];
    }
    return source;
}
/**
 * adds arguments as properties to obj
 */
function extend(obj, ...args) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
        if (source) {
            for (let key in source) {
                obj[key] = source[key];
            }
        }
    });
    return obj;
}
/**
 * gets a random int from 0-10000000000
 */
function getRandomInt() {
    return Math.floor(Math.random() * 10000000000);
}
const execPromise = util_1.promisify(child_process_1.exec);
class PythonShellError extends Error {
}
exports.PythonShellError = PythonShellError;
/**
 * Takes in a string stream and emits batches seperated by newlines
 */
class NewlineTransformer extends stream_1.Transform {
    _transform(chunk, encoding, callback) {
        let data = chunk.toString();
        if (this._lastLineData)
            data = this._lastLineData + data;
        const lines = data.split(os_1.EOL);
        this._lastLineData = lines.pop();
        //@ts-ignore this works, node ignores the encoding if it's a number
        lines.forEach(this.push.bind(this));
        callback();
    }
    _flush(done) {
        if (this._lastLineData)
            this.push(this._lastLineData);
        this._lastLineData = null;
        done();
    }
}
exports.NewlineTransformer = NewlineTransformer;
/**
 * An interactive Python shell exchanging data through stdio
 * @param {string} script    The python script to execute
 * @param {object} [options] The launch options (also passed to child_process.spawn)
 * @param [stdoutSplitter] Optional. Splits stdout into chunks, defaulting to splitting into newline-seperated lines
 * @param [stderrSplitter] Optional. splits stderr into chunks, defaulting to splitting into newline-seperated lines
 * @constructor
 */
class PythonShell extends events_1.EventEmitter {
    /**
     * spawns a python process
     * @param scriptPath path to script. Relative to current directory or options.scriptFolder if specified
     * @param options
     * @param stdoutSplitter Optional. Splits stdout into chunks, defaulting to splitting into newline-seperated lines
     * @param stderrSplitter Optional. splits stderr into chunks, defaulting to splitting into newline-seperated lines
     */
    constructor(scriptPath, options, stdoutSplitter = null, stderrSplitter = null) {
        super();
        /**
         * returns either pythonshell func (if val string) or custom func (if val Function)
         */
        function resolve(type, val) {
            if (typeof val === 'string') {
                // use a built-in function using its name
                return PythonShell[type][val];
            }
            else if (typeof val === 'function') {
                // use a custom function
                return val;
            }
        }
        if (scriptPath.trim().length == 0)
            throw Error("scriptPath cannot be empty! You must give a script for python to run");
        let self = this;
        let errorData = '';
        events_1.EventEmitter.call(this);
        options = extend({}, PythonShell.defaultOptions, options);
        let pythonPath;
        if (!options.pythonPath) {
            pythonPath = PythonShell.defaultPythonPath;
        }
        else
            pythonPath = options.pythonPath;
        let pythonOptions = toArray(options.pythonOptions);
        let scriptArgs = toArray(options.args);
        this.scriptPath = path_1.join(options.scriptPath || '', scriptPath);
        this.command = pythonOptions.concat(this.scriptPath, scriptArgs);
        this.mode = options.mode || 'text';
        this.formatter = resolve('format', options.formatter || this.mode);
        this.parser = resolve('parse', options.parser || this.mode);
        // We don't expect users to ever format stderr as JSON so we default to text mode
        this.stderrParser = resolve('parse', options.stderrParser || 'text');
        this.terminated = false;
        this.childProcess = child_process_1.spawn(pythonPath, this.command, options);
        ['stdout', 'stdin', 'stderr'].forEach(function (name) {
            self[name] = self.childProcess[name];
            self.parser && self[name] && self[name].setEncoding(options.encoding || 'utf8');
        });
        // Node buffers stdout&stderr in batches regardless of newline placement
        // This is troublesome if you want to recieve distinct individual messages
        // for example JSON parsing breaks if it recieves partial JSON
        // so we use newlineTransformer to emit each batch seperated by newline
        if (this.parser && this.stdout) {
            if (!stdoutSplitter)
                stdoutSplitter = new NewlineTransformer();
            // note that setting the encoding turns the chunk into a string
            stdoutSplitter.setEncoding(options.encoding || 'utf8');
            this.stdout.pipe(stdoutSplitter).on('data', (chunk) => {
                this.emit('message', self.parser(chunk));
            });
        }
        // listen to stderr and emit errors for incoming data
        if (this.stderrParser && this.stderr) {
            if (!stderrSplitter)
                stderrSplitter = new NewlineTransformer();
            // note that setting the encoding turns the chunk into a string
            stderrSplitter.setEncoding(options.encoding || 'utf8');
            this.stderr.pipe(stderrSplitter).on('data', (chunk) => {
                this.emit('stderr', self.stderrParser(chunk));
            });
        }
        if (this.stderr) {
            this.stderr.on('data', function (data) {
                errorData += '' + data;
            });
            this.stderr.on('end', function () {
                self.stderrHasEnded = true;
                terminateIfNeeded();
            });
        }
        else {
            self.stderrHasEnded = true;
        }
        if (this.stdout) {
            this.stdout.on('end', function () {
                self.stdoutHasEnded = true;
                terminateIfNeeded();
            });
        }
        else {
            self.stdoutHasEnded = true;
        }
        this.childProcess.on('error', function (err) {
            self.emit('error', err);
        });
        this.childProcess.on('exit', function (code, signal) {
            self.exitCode = code;
            self.exitSignal = signal;
            terminateIfNeeded();
        });
        function terminateIfNeeded() {
            if (!self.stderrHasEnded || !self.stdoutHasEnded || (self.exitCode == null && self.exitSignal == null))
                return;
            let err;
            if (self.exitCode && self.exitCode !== 0) {
                if (errorData) {
                    err = self.parseError(errorData);
                }
                else {
                    err = new PythonShellError('process exited with code ' + self.exitCode);
                }
                err = extend(err, {
                    executable: pythonPath,
                    options: pythonOptions.length ? pythonOptions : null,
                    script: self.scriptPath,
                    args: scriptArgs.length ? scriptArgs : null,
                    exitCode: self.exitCode
                });
                // do not emit error if only a callback is used
                if (self.listeners('pythonError').length || !self._endCallback) {
                    self.emit('pythonError', err);
                }
            }
            self.terminated = true;
            self.emit('close');
            self._endCallback && self._endCallback(err, self.exitCode, self.exitSignal);
        }
        ;
    }
    /**
     * checks syntax without executing code
     * @returns rejects promise w/ string error output if syntax failure
     */
    static checkSyntax(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomInt = getRandomInt();
            const filePath = os_1.tmpdir() + path_1.sep + `pythonShellSyntaxCheck${randomInt}.py`;
            const writeFilePromise = util_1.promisify(fs_1.writeFile);
            return writeFilePromise(filePath, code).then(() => {
                return this.checkSyntaxFile(filePath);
            });
        });
    }
    static getPythonPath() {
        return this.defaultOptions.pythonPath ? this.defaultOptions.pythonPath : this.defaultPythonPath;
    }
    /**
     * checks syntax without executing code
     * @returns {Promise} rejects w/ stderr if syntax failure
     */
    static checkSyntaxFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const pythonPath = this.getPythonPath();
            let compileCommand = `${pythonPath} -m py_compile ${filePath}`;
            return execPromise(compileCommand);
        });
    }
    /**
     * Runs a Python script and returns collected messages
     * @param  {string}   scriptPath   The path to the script to execute
     * @param  {Options}   options  The execution options
     * @param  {Function} callback The callback function to invoke with the script results
     * @return {PythonShell}       The PythonShell instance
     */
    static run(scriptPath, options, callback) {
        let pyshell = new PythonShell(scriptPath, options);
        let output = [];
        return pyshell.on('message', function (message) {
            output.push(message);
        }).end(function (err) {
            return callback(err ? err : null, output.length ? output : null);
        });
    }
    ;
    /**
     * Runs the inputted string of python code and returns collected messages. DO NOT ALLOW UNTRUSTED USER INPUT HERE!
     * @param  {string}   code   The python code to execute
     * @param  {Options}   options  The execution options
     * @param  {Function} callback The callback function to invoke with the script results
     * @return {PythonShell}       The PythonShell instance
     */
    static runString(code, options, callback) {
        // put code in temp file
        const randomInt = getRandomInt();
        const filePath = os_1.tmpdir + path_1.sep + `pythonShellFile${randomInt}.py`;
        fs_1.writeFileSync(filePath, code);
        return PythonShell.run(filePath, options, callback);
    }
    ;
    static getVersion(pythonPath) {
        if (!pythonPath)
            pythonPath = this.getPythonPath();
        return execPromise(pythonPath + " --version");
    }
    static getVersionSync(pythonPath) {
        if (!pythonPath)
            pythonPath = this.getPythonPath();
        return child_process_1.execSync(pythonPath + " --version").toString();
    }
    /**
     * Parses an error thrown from the Python process through stderr
     * @param  {string|Buffer} data The stderr contents to parse
     * @return {Error} The parsed error with extended stack trace when traceback is available
     */
    parseError(data) {
        let text = '' + data;
        let error;
        if (/^Traceback/.test(text)) {
            // traceback data is available
            let lines = text.trim().split(os_1.EOL);
            let exception = lines.pop();
            error = new PythonShellError(exception);
            error.traceback = data;
            // extend stack trace
            error.stack += os_1.EOL + '    ----- Python Traceback -----' + os_1.EOL + '  ';
            error.stack += lines.slice(1).join(os_1.EOL + '  ');
        }
        else {
            // otherwise, create a simpler error with stderr contents
            error = new PythonShellError(text);
        }
        return error;
    }
    ;
    /**
     * Sends a message to the Python shell through stdin
     * Override this method to format data to be sent to the Python process
     * @returns {PythonShell} The same instance for chaining calls
     */
    send(message) {
        if (!this.stdin)
            throw new Error("stdin not open for writing");
        let data = this.formatter ? this.formatter(message) : message;
        if (this.mode !== 'binary')
            data += os_1.EOL;
        this.stdin.write(data);
        return this;
    }
    ;
    /**
     * Closes the stdin stream. Unless python is listening for stdin in a loop
     * this should cause the process to finish its work and close.
     * @returns {PythonShell} The same instance for chaining calls
     */
    end(callback) {
        if (this.childProcess.stdin) {
            this.childProcess.stdin.end();
        }
        this._endCallback = callback;
        return this;
    }
    ;
    /**
     * Sends a kill signal to the process
     * @returns {PythonShell} The same instance for chaining calls
     */
    kill(signal) {
        this.childProcess.kill(signal);
        this.terminated = true;
        return this;
    }
    ;
    /**
     * Alias for kill.
     * @deprecated
     */
    terminate(signal) {
        // todo: remove this next breaking release
        return this.kill(signal);
    }
}
exports.PythonShell = PythonShell;
// starting 2020 python2 is deprecated so we choose 3 as default
PythonShell.defaultPythonPath = process.platform != "win32" ? "python3" : "python";
PythonShell.defaultOptions = {}; //allow global overrides for options
// built-in formatters
PythonShell.format = {
    text: function toText(data) {
        if (!data)
            return '';
        else if (typeof data !== 'string')
            return data.toString();
        return data;
    },
    json: function toJson(data) {
        return JSON.stringify(data);
    }
};
//built-in parsers
PythonShell.parse = {
    text: function asText(data) {
        return data;
    },
    json: function asJson(data) {
        return JSON.parse(data);
    }
};
;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 129:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 614:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 87:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 413:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 669:
/***/ ((module) => {

module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(109);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map