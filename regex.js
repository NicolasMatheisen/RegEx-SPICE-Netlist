function SPICENetlistValidator(UserInput) {
    /* 
    Regel 1: die erste Zeile ist der Titel
    Regel 2: Eingabe muss mit .end beendet werden
    Regel 3: Syntaxanalyse der Bauteile
    */

    //trim() entfernt Leerzeichen von beiden Seiten der Zeichenkette
    //split('\n') entfernt die Anweisung einer neuen Zeile (Enter oder new line)
    const lines = UserInput.trim().split('\n');
    const title = lines[0].trim();
    const lastLine = (lines[lines.length - 1]).trim();

        const rules = [
        {
            error: 'Darf nicht mit einem Bauteil beginnen',
            validate: (lines) => !/^[RCL]/i.test(lines[0])
        },
        {
            error: 'Die SPICE Netlist muss mit .end abgeschlossen werden',
            validate: (lines) => /^\.end$/i.test(lines.at(-1))
        },
        {
            error: 'JedesBaupteil muss folgende Syntax haben: label node1 node2 value',
            validate: (lines) => {
                const value = '[0-9]+(?:\\.[0-9]+)?(?:f|p|n|u|m|k|meg|g|t)?';


                const componentRegex = {
                    R: new RegExp(`^R[A-Za-z0-9_]+\\s+\\S+\\s+\\S+\\s+${value}(?:Ω|ohm)?$`, 'i'),
                    C: new RegExp(`^C[A-Za-z0-9_]+\\s+\\S+\\s+\\S+\\s+${value}(?:F)?$`, 'i'),
                    L: new RegExp(`^L[A-Za-z0-9_]+\\s+\\S+\\s+\\S+\\s+${value}(?:H)?$`, 'i'),
                };

                return lines;
            }
        }
    ];

    return rules
        .filter(rule => !rule.validate(lines))
        .map(rule => rule.error);
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