const fs = require('fs');
const { init } = require('z3-solver'); 

let Z3Context; 

async function initializeZ3() {
    const { Context } = await init();
    Z3Context = Context('main'); 
}

async function solveMachine(joltageRequirements, impactVectors) { 
    const s = new Z3Context.Optimize(); 
    const X = [];
    
    for (let i = 0; i < impactVectors.length; i++) { 
        const xi = Z3Context.Int.const(`x${i}`); 
        s.add(xi.ge(0));
        X.push(xi);
    }
    
    const totalPulsations = X.reduce((acc, xi) => acc.add(xi), Z3Context.Int.val(0)); 
    s.minimize(totalPulsations);

    for (let j = 0; j < joltageRequirements.length; j++) {
        let constraintSum = Z3Context.Int.val(0);
        
        for (let i = 0; i < impactVectors.length; i++) {
            const contribution = X[i].mul(impactVectors[i][j]);
            constraintSum = constraintSum.add(contribution);
        }
        
        s.add(constraintSum.eq(joltageRequirements[j])); 
    }

    const isSatisfiable = await s.check();
    let minPulsations = Infinity;

    if (isSatisfiable === 'sat') {
        const model = s.model();
        const solutionValues = X.map(xi => model.eval(xi).toString());
        minPulsations = parseInt(model.eval(totalPulsations).toString());
        
        console.log(`Min pulsations needed ${minPulsations}`);
        console.log(`Pulsations (x0 to x${impactVectors.length - 1}): [${solutionValues.join(", ")}]`);

    } else {
        console.log("No solution found.");
    }

    return minPulsations;
}

async function main() {
    await initializeZ3(); 

    let sum = 0;
    const filename = process.argv[2];
    if (!filename) {
        console.error("Por favor, proporciona el archivo de entrada.");
        return;
    }

    const lines = fs.readFileSync(filename, 'utf8').split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
        console.log(`\nMachine: ${line}`);
        
        const joltageRequirements = line.match(/\{(.*?)\}/g)[0].slice(1, -1).split(',').map(x => parseInt(x));
        const impactVectors = [...line.matchAll(/\((.*?)\)/g)].map(match => match[1])
            .map(x => x.split(',').map(y => parseInt(y)))
            .map(arr => {
                const impactVector = new Array(joltageRequirements.length).fill(0);
                arr.forEach(value => impactVector[value] = 1);
                return impactVector;
            });
        
        const minPulsations = await solveMachine(joltageRequirements, impactVectors);
        
        if (minPulsations !== Infinity) {
            sum += minPulsations;
        }
    }

    console.log(`\nTotal sum of minimum pulsations: ${sum}`);
}

main().catch(err => console.error("Error:", err));