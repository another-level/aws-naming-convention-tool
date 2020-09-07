//config
const delemiter = '-';
let isFirstLoad = true;

//selectBox init
const accountTypeOptions = [
    ['Network','NET'],
    ['Shared','SHD'],
    ['Dev','DEV'],
    ['QA','QA'],
    ['Prod','PRD']
]

const regionOptions = [
    ['us-east-1','UE1'],
    ['us-west-1','UW1']
]

const subnetOptions = [
    ['Public','PUB'],
    ['Private','PRV']
]

const systemOptions = [
    ['Project 1','PRJ1'],
    ['Project 2','PRJ2'],
    ['Project 3','PRJ3'],
    ['Project 4','PRJ4']
]

const osOptions = [
    ['Linux','LX'],
    ['Windows','WIN']
]

const networkOptions = [
    ['Internal','INT'],
    ['External','EXT']
]

const EnvironmentOptions = [
    ['Dev','DEV'],
    ['QA','QA',]
    ['Prod','PRD']
]

const serialNumberOptions = [
    ['01','01'],
    ['02','02'],
    ['03','03'],
    ['04','04'],
    ['05','05'],
    ['06','06'],
    ['07','07'],
    ['08','08'],
    ['09','09'],
    ['10','10']
]

//resource info containers
const resourceArray = [
    {
        name : 'VPC',
        abbr : 'VPC',
        example : 'VPC-UE1-NET',
        elements : ['VPC', regionOptions, accountTypeOptions]
    },
    {
        name : 'Subnet',
        abbr : 'SBN',
        example : 'SBN-UE1-ECOM-PUB-01',
        elements : ['SBN', regionOptions, accountTypeOptions, subnetOptions, serialNumberOptions]
    },
    {
        name : 'RouteTable',
        abbr : 'RT',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },
    {
        name : '',
        abbr : '',
        example : '',
        elements : ['',]
    },

]

//make all resources container
resourceArray.map( item => {
    makeResourceArea( item );
});
isFirstLoad = false;

function makeResourceArea( resourceInfo ) {
    //make area by copying template
    let container = document.getElementById('containerTemplate').content.cloneNode(true);
    container.getElementById('name').textContent = resourceInfo.name;
    container.firstElementChild.setAttribute('id', resourceInfo.abbr);
    container.getElementById('example').textContent = 'ex) ' + resourceInfo.example;
    container.getElementById('desc').textContent = resourceInfo.desc ? '*' + resourceInfo.desc : '';

    let inputs = container.getElementById('inputs');
    resourceInfo.elements.map( (item, index) => {
        //for each type
        //type string
        if( typeof item == 'string') {
            let span = document.createElement('span');
            span.classList.add('items');
            span.appendChild( document.createTextNode( item ) );
            inputs.appendChild(span);
        //type static
        } else if ( item.length ===1 && item[0] === 'static' ) {
            let textBox = document.createElement('input');
            textBox.setAttribute('type', 'text');
            textBox.classList.add('items');
            textBox.classList.add('static');
            textBox.addEventListener('keyup', e => {
                printValues( resourceInfo.abbr );
            });
            inputs.appendChild(textBox);
        //type selectBox
        } else if ( item.length ) {
            let select = makeSelectBox(item, resourceInfo.abbr);
            select.classList.add('items');
            inputs.appendChild(select);
        } else {
            let textBox = document.createElement('input');
            textBox.setAttribute('type', 'text');
            textBox.classList.add('items');
            textBox.addEventListener('keyup', e => {
                printValues(resourceInfo.abbr);
            })
        }
        //for common
        let delimiterSpan = document.createElement('span');
        index != resourceInfo.elements.length-1 ? delimiterSpan.appendChild( document.createTextNode(delemiter)) : '';
        inputs.appendChild( delimiterSpan );
    });

    //events
    //copy button event
    let copyButton = container.getElementById('btn');
    copyButton.addEventListener('click', e => {
        e.stopPropagation();
        let copyText = document.querySelector(`#${resourceInfo.abbr} .resultText`);
        let tempElem = document.createElement('textarea');
        tempElem.value = copyText.textContent;
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand('copy');
        document.body.removeChild(tempElem);
    });

    //switch case event
    let switchCase = container.querySelector('.resultText');
    switchCase.addEventListener('click', e => {
        id = e.path[2].id;
        printValues(id, true);
    });

    document.body.appendChild(container);
    printValues(resourceInfo.abbr);
}

function makeSelectBox(option, id) {
    let selectBox = document.createElement('select');
    options.map( item => {
        let objOpt = document.createElement('option');
        objOpt.text = item[0];
        objOpt.value = item[1];
        selectBox.options.add(objOpt);
    });
    selectBox.addEventListener('change', e => {
        printValues(id);
    });
}

function printValues(id, switchCase) {
    let resultText = document.querySelector(`#${id} .resultText`);
    let item = document.querySelectorAll(`#${id} .items`);
    
    let sentence = '';
    let static = '';

    items.forEach( (item, index) => {
        if( item.classList.contains('static') ) {
            static = item.value;
        } else if ( item.tagName == 'SELECT') {
            sentence += item.selectOptions[0].value;
        } else if ( item.tagName == 'SPAN') {
            sentence += item.textContent;
        } else {
            sentence += item.value;
        }
        sentence += index!=items.length-1 ? delemiter : '';
    });
    if( switchCase  ) {
        resultText.innerHTML = isFirstLoad || isUpperCase(resultText.innerHTML.substr(0,1)) ? sentence.toLowerCase()+static : sentence.toUpperCase()+static;
    } else {
        resultText.innerHTML = isFirstLoad || isUpperCase(resultText.innerHTML.substr(0,1)) ? sentence.toUpperCase()+static : sentence.toLowerCase()+static;
    }
}

function isUpperCase(text) {
    let regUpper = /[A-Z]/;
    return regUpper.test(text);
}