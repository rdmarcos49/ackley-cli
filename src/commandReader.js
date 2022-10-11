let INITIAL_STATE = {
    runs: 1,
    dimensions: 1,
    populationSize: 120,
    selection: 'e',
    tournamentVictories: 5,
    elitismPercentage: 10,
    iterationsPerRun: 100000,
  };

const RUNS_OPTION_SELECTOR = '-r';
const DIMENSIONS_OPTION_SELECTOR = '-d';
const POPULATION_OPTION_SELECTOR = '-p';
const SELECTION_METHOD_OPTION_SELECTOR = '-s';
const SELECTION_BIAS_OPTION_SELECTOR = '-b';
const ITERATIONS_OPTION_SELECTOR = '-i';


function commandReader(arguments) {

    let prevOption;
    let bias;

    for (let index = 0; index < arguments.length; index++) {
        const element = array[index];
        
        if(element.startsWith('-')) {
            prevOption = element;
        } else {
            let unknownParameter = false;

            switch (prevOption) {
                case RUNS_OPTION_SELECTOR:
                    if(!validations.runs(parseInt(element))) {
                        console.log('El valor establecido para la cantidad de ejecuciones es invalido...');
                        console.log('Se admiten valores positivos enteros entre 1 y 5, por defecto se usara 1...');
                    } else {
                        INITIAL_STATE.runs = parseInt(element);
                    }
                    break;
                case DIMENSIONS_OPTION_SELECTOR:
                    if(!validations.dimensions(parseInt(element))) {
                        console.log('El valor establecido para la cantidad de dimensiones es invalido...');
                        console.log('Se admiten valores positivos enteros entre 1 y 5, por defecto se usara 1...');
                    } else {
                        INITIAL_STATE.dimensions = parseInt(element);
                    }                    
                    break;
                case POPULATION_OPTION_SELECTOR:
                    if(!validations.populationSize(parseInt(element))) {
                        console.log('El valor establecido para la cantidad de poblacion es invalido...');
                        console.log('Se admiten valores positivos enteros entre 10 y 100000, por defecto se usara 10...');
                    } else {
                        INITIAL_STATE.populationSize = parseInt(element);
                    }
                    break;
                case SELECTION_METHOD_OPTION_SELECTOR:
                    if(!validations.selection(element)) {
                        console.log('El valor establecido para el metodo de seleccion es invalido...');
                        console.log('Se admiten los valores t|T o e|E, por defecto se usara elitismo...');
                    } else {
                        INITIAL_STATE.selection = element;
                    }
                    break;
                case SELECTION_BIAS_OPTION_SELECTOR:
                    bias = parseInt(element);
                    break;
                case ITERATIONS_OPTION_SELECTOR:
                    if(!validations.iterationsPerRun(parseInt(element))) {
                        console.log('El valor establecido para la cantidad de poblacion es invalido...');
                        console.log('Se admiten valores positivos enteros entre 1 y 100000, por defecto se usara 1...');
                    } else {
                        INITIAL_STATE.iterationsPerRun = parseInt(element);
                    }
                    break;
                default:
                    console.log('Parametro desconocido: ' + prevOption);
                    unknownParameter = true;
                    break;
            }

            if(unknownParameter){
                console.log('Se usaran parametros por defecto... Pulse ctrl+c para cancelar');
                return INITIAL_STATE;
            }
        }

    }

    if(bias) {
        if(INITIAL_STATE.selection.toLowerCase() === 't'){
            INITIAL_STATE.tournamentVictories = bias;
        } else {
            INITIAL_STATE.elitismPercentage = bias;
        }
    }
}

module.exports = { commandReader }