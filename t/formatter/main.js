const b = " ";
const b4 = b.repeat(4)

const codeGen = function(node) {
    let type = node.type
    if (type === 'Program') {
        let body = node.body
        let s = body.map(b => codeGen(b)).join('\n')
        return s
    } else if (type === 'VariableDeclaration') {
        // node.declarations 是数组
        // let a = 2, b = 3 这样的代码数组有两个元素
        // let a = 2 数组有一个元素
        let ds = node.declarations
        let s1 = ds.map(d => codeGen(d)).join(', ')
        let kind = node.kind
        let r = `${kind} ${s1}`
        return r
    } else if (type === 'VariableDeclarator') {
        let id = node.id
        let init = node.init
        id = codeGen(id)
        init = codeGen(init)
        const blank = config.around_operators.assignment ? b : ''

        let s = `${id}${blank}=${blank}${init}`
        return s
    } else if (type === 'Identifier') {
        return node.name
    } else if (type === 'Literal') {

        return node.value
    } else if(type == 'FunctionDeclaration') {
        // 函数
        // 函数的名称
        const funcName = codeGen(node.id)
        // 处理函数的参数情况
        const params = node.params.map(p => {
            let name = codeGen(p)
            return name
        }).join(', ')
        // 函数代码块内容
        const body = codeGen(node.body)
        const blank = config.before_left_brace.func ? ' ': ''
        const r = `function ${funcName}(${params}) {\n${body}\n}`
        return r
    } else if (type === 'BlockStatement') {
        let lines = ''
        node.body.forEach(n => {
            lines += codeGen(n)
        })
        return lines
    } else if (type === 'ReturnStatement') {
        // 处理返回值的情况
        // 当参数为 a 和 b
        // 返回值 return a + b
        let r = ''
        if (node.argument && node.argument?.operator) {
           let left = codeGen(node.argument.left)
           let right = codeGen(node.argument.right)
           let operator = node.argument.operator
            let tokens = [left, operator, right]
            r = tokens.join(' ')

            r = `${b4}return ${r}`
        }
        return r
    } else if (type === 'ClassBody') {        
        log('ClassBody')
        log('node', node)
    } else if (type === 'ClassDeclaration') {
        log('node.id', node.id)
        log('ClassDeclaration', node)
        // 得到类的名称
        let className = codeGen(node.id)
        let classFun = 'bbb'
        let r = `class ${className} {\n${classFun}\n}`
        log('r', r)
        return r
    } else if (type === 'ObjectExpression') {
        // 获取key 和 对应的value
        let properties = node.properties.map(p => {
            return codeGen(p)
        }).join(',')
        return `{${properties}}`
    } else if (type === 'Property') {
        let key = codeGen(node.key)
        let value = codeGen(node.value)
        return `${key}: ${value}`
    }
}

const initEidtor = () => {
    var editor = ace.edit("editor");
    editor.session.setMode("ace/mode/html");
    editor.setTheme("ace/theme/twilight");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
}

const inserConfig = (key) => {
    let obj = config[key]
    let t = ''
    for (const [k, v] of Object.entries(obj)) {
        let id = `${key}-${k}`
        t += `
        <p class="g-item-cofig">
         <input type="checkbox" id="${id}" data-id="${id}">
         <label for="${id}">${k}</label>
         </p>
        `
    }
    r = `
    <div class="g-key">
        <div>  ${key}  </div>
        <div class="g-items">${t}<div>
    <div>`
    appendHtml(e('.g-config-container'), r)
}

const initConfig = () => {
    let ks = Object.keys(config)
    ks.forEach(k => {
        inserConfig(k)
    })
}

const bindEventInput = () => {
    bindAll(es('input'), (event) => {
        let input = event.target
        let [configKey, k] = input.dataset.id.split('-')
        config[configKey][k] = !config[configKey][k]
        renderCode()
    })
}

const init = () => {
    initEidtor()
    initConfig()
    const code = beforeCode.trim()
    e('.g-code-contianer').innerText = code
}

const bindEvents = () => {
    bindEventInput()
}

const renderCode = () => {
    e('.g-code-contianer').innerText = ''
    const code = beforeCode.trim()
    const ast = parse(code)
    const s = codeGen(ast)
    e('.g-code-contianer').innerText = s
}

const __main = function () {
    init()
    bindEvents()
}

__main()