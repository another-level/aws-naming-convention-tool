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

const environmentOptions = [
    ['Dev','DEV'],
    ['QA','QA'],
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

const loadBalancerTypeOptions = [
    ['Application', 'ALB'],
    ['Network', 'NLB']
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
        example : 'SBN-UE1-PRJ1-PUB-01',
        elements : ['SBN', regionOptions, accountTypeOptions, subnetOptions, serialNumberOptions]
    },
    {
        name : 'RouteTable',
        abbr : 'RT',
        example : 'RT-PRJ1-INTL-01',
        elements : ['RT', accountTypeOptions, networkOptions, serialNumberOptions]
    },
    {
        name : 'Internet Gateway',
        abbr : 'IGW',
        example : 'IGW-PRJ1',
        elements : ['IGW', accountTypeOptions]
    },
    {
        name : 'Network ACL',
        abbr : 'NACL',
        example : 'NACL-PRJ1-PUB-01',
        elements : ['NACL', accountTypeOptions, networkOptions, serialNumberOptions]
    },
    {
        name : 'Security Group',
        abbr : 'SG',
        example : 'SG-DEV-PRJ1-AUTH',
        elements : ['SG', environmentOptions, systemOptions, []]
    },
    {
        name : 'Load Balancer',
        abbr : 'LB',
        example : 'ALB-DEV-INTL-PRJ1-AUTH',
        elements : [loadBalancerTypeOptions, environmentOptions, networkOptions, systemOptions, []]
    },
    {
        name : 'Target Group',
        abbr : 'TG',
        example : 'TG-DEV-WEB-DC-AUTH-80',
        elements : ['TG', environmentOptions, [], systemOptions, [], []]
    },
    {
        name : 'EC2',
        abbr : 'EC2',
        example : 'EC2-DEV-DEV-PRJ1-DTC-PUB01',
        elements : ['EC2', environmentOptions, accountTypeOptions, systemOptions, [], serialNumberOptions]
    },
    {
        name : 'EBS',
        abbr : 'EBS',
        example : 'EBS-DEV-[Name Of EC2]-1',
        elements : ['EBS', environmentOptions, []]
    },
    {
        name : 'Elastic IP',
        abbr : 'EIP',
        example : 'EIP-DEV-[Name of EC2]-1',
        elements : ['EIP', environmentOptions, []]
    },
    {
        name : 'IAM User',
        abbr : 'USER',
        example : 'PRJ1-QDE-S3-FTP',
        desc : '[system]-[env]-[actor]-user description with PascalCase]',
        elements : [systemOptions, environmentOptions, [], ['static']]
    },
    {
        name : 'IAM Role',
        abbr : 'ROL',
        example : 'ROL-PRJ1-QDE-EC2-Management',
        elements : ['ROL', systemOptions, environmentOptions, [], ['static']]
    },
    {
        name : 'IAM Policy',
        abbr : 'POL',
        example : 'POL-PRJ1-DEV-S3-ReadOnly',
        elements : ['POL', systemOptions, environmentOptions, ['static']]
    },
    {
        name : 'WAF',
        abbr : 'WAF',
        example : 'WAF-PRJ1',
        elements : ['WAF', accountTypeOptions]
    },
    {
        name : 'RDS',
        abbr : 'RDS',
        example : 'RDS-DEV-DBNAME',
        elements : ['RDS', environmentOptions,[]]
    },
    {
        name : 'ElastiCache',
        abbr : 'ELC',
        example : 'ELC-DEV-RED-UE1-PRJ1-THA-1',
        elements : ['ELC', environmentOptions,[], regionOptions, accountTypeOptions, systemOptions, serialNumberOptions]
    },
    {
        name : 'Amazon MQ',
        abbr : 'MQ',
        example : 'MQ-DEV-UE1-PRJ1-THA-1',
        elements : ['MQ', environmentOptions, regionOptions, accountTypeOptions, systemOptions, serialNumberOptions]
    },
    {
        name : 'S3',
        abbr : 'S3',
        example : 'S3-UE1-PRJ1-THAT-1',
        elements : ['S3', regionOptions, environmentOptions, systemOptions]
    }

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
            inputs.appendChild(textBox);
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

function makeSelectBox(options, id) {
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
    return selectBox;
}

function printValues(id, switchCase) {
    let resultText = document.querySelector(`#${id} .resultText`);
    let items = document.querySelectorAll(`#${id} .items`);
    
    let sentence = '';
    let static = '';

    items.forEach( (item, index) => {
        if( item.classList.contains('static') ) {
            static = item.value;
        } else if ( item.tagName == 'SELECT') {
            sentence += item.selectedOptions[0].value;
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