const fs = require('fs')
const { get } = require('http')

const getNotValue = (x) => {
    let binary = x.toString(2)
    let padding = ''
    let notValue = ''

    for (let i = 0; i < 16 - binary.length; i++) {
        padding += '0'
    }

    padding += binary

    for (let i = 0; i < padding.length; i++) {
        notValue += padding[i] === '0' ? '1' : '0'
    }

    return parseInt(notValue, 2)
}

const getInstruction = (instruction) => {
    let instructionParts = instruction.split(' ')
    return instructionParts.length === 2 ? instructionParts[0] : instructionParts[1]
}

const hasValueInObject = (obj, instruction) => {
    let instructionParts = instruction.split(' ')
    if (instructionParts.length === 2) {
        return obj.hasOwnProperty(instructionParts[1])
    } else {
        return (Number.isInteger(parseInt(instructionParts[0])) || obj.hasOwnProperty(instructionParts[0])) 
        && (Number.isInteger(parseInt(instructionParts[2])) || obj.hasOwnProperty(instructionParts[2]))
    }
}

const getInstructionValues = (obj, instruction) => {
    let instructionParts = instruction.split(' ')
    if (instructionParts.length === 2) {
        return [obj[instructionParts[1]] || parseInt(instructionParts[1])]
    } else {
        return [obj[instructionParts[0]] || parseInt(instructionParts[0]), obj[instructionParts[2]] || parseInt(instructionParts[2])]
    }
}

const handleInstructions = (instructions, wires) => {
    const newInstructions = []

    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i].split('->')
        console.log(instruction)
        if (Number.isInteger(parseInt(instruction[0].trim())) || wires.hasOwnProperty(instruction[0].trim())) {
            wires[instruction[1].trim()] = wires[instruction[0].trim()] || parseInt(instruction[0].trim())
        } else {
            if (hasValueInObject(wires, instruction[0].trim())) {
                let instructionValues = getInstructionValues(wires, instruction[0].trim())
                let instructionType = getInstruction(instruction[0].trim())
                let value = 0
                switch (instructionType) {
                    case 'AND':
                        value = instructionValues[0] & instructionValues[1]
                        break
                    case 'OR':
                        value = instructionValues[0] | instructionValues[1]
                        break
                    case 'LSHIFT':
                        value = instructionValues[0] << instructionValues[1]
                        break
                    case 'RSHIFT':
                        value = instructionValues[0] >> instructionValues[1]
                        break
                    case 'NOT':
                        value = getNotValue(instructionValues[0])
                        break
                }
                wires[instruction[1].trim()] = value
            } else {
                newInstructions.push(instructions[i])
            }
        }
    }

    return newInstructions
}


fs.readFile('./logic-instructions.txt', 'utf8', (err, data) => {
    if (err) throw err

    let instructions = data.split('\n')
    
    let wires = {}

    // let x = 123
    // let y = 456456456

    // console.log(getNotValue(x))

    while (instructions.length > 0) {
        console.log(instructions.length)
        instructions = handleInstructions(instructions, wires)
    }


    console.log(wires['a'])
})