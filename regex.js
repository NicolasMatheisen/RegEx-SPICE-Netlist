function SPICENetlistValidator(UserInput) {
    /* 
    Regel 1: die erste Zeile ist der Titel
    Regel 2: Eingabe muss mit .end beendet werden
    Regel 3: Syntaxanalyse der Bauteile
    */

    //trim() entfernt Leerzeichen von beiden Seiten der Zeichenkette
    //split('\n') entfernt die Anweisung einer neuen Zeile (Enter oder new line)
    const line = UserInput.trim().split('\n');
    const title = line[0].trim();
    const lastLine = (line[line.length - 1]).trim();

    const rules = [
        {
            error: 'Darf nicht mit einem Bauteil beginnen',
            valide: /^[RCL]/i.test(title)
        },
        {
            error: 'Die SPICE Netlist muss mit .end abgeschlossen werden',
            valide: !/^\.end$/i.test(lastLine)
        }
    ];

    return rules;
}

function check() {
    const UserInput = document.getElementById('UserInput').value;
    const errors = SPICENetlistValidator(UserInput);
    const Verifizierungsergebnis = document.getElementById('verifyingResult');

    if(errors.length === 0) {
        Verifizierungsergebnis.textContent ='Netlist ist gültig';
        console.log('gültig');
    }
    else 
    {
        Verifizierungsergebnis.innerHTML = errors.join('<br>');
        console.log('error');
    }
};