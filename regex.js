function SPICENetlistValidator(UserInput) {
    /* 
    Regel 1: die erste Zeile ist der Titel
    Regel 2: Eingabe muss mit .end beendet werden
    Regel 3: Syntaxanalyse der Bauteile
    Regel 4: Die Schaltung muss einen 0 Node haben
    */

    //trim() entfernt Leerzeichen von beiden Seiten der Zeichenkette
    //split('\n') entfernt die Anweisung einer neuen Zeile (Enter oder new line)
    const lines = UserInput.trim().split('\n');

    const rules = [
        {
            error: 'Darf nicht mit einem Bauteil beginnen',
            validate: (lines) => !/^[RCL]/i.test(lines[0])
        },
        {
            error: 'Die SPICE Netlist muss mit .end abgeschlossen werden',
            validate: (lines) => /^\.end$/i.test(lines.at(-1).trim())
        },
        {
            error: 'Jedes Baupteil muss folgende Syntax haben: label node1 node2 value',
            validate: (lines) => {
                const value = '[0-9]+(?:\\.[0-9]+)?(?:f|p|n|u|m|k|meg|g|t)?';
                const componentRegex = {
                    R: new RegExp(`^R[A-Za-z0-9_]+\\s+\\S+\\s+\\S+\\s+${value}(?:Ω|ohm)?$`, 'i'),
                    C: new RegExp(`^C[A-Za-z0-9_]+\\s+\\S+\\s+\\S+\\s+${value}(?:F)?$`, 'i'),
                    L: new RegExp(`^L[A-Za-z0-9_]+\\s+\\S+\\s+\\S+\\s+${value}(?:H)?$`, 'i'),
                };
                return lines.every(line => {
                    const firstChar = line.trim()[0]?.toUpperCase();
                    if (['R', 'C', 'L'].includes(firstChar)) {
                        return componentRegex[firstChar].test(line.trim());
                    }
                    return true;
                });
            }
        },
        {
            error: 'Die Schaltung muss mindestens einen 0 Node haben.',
            validate: (lines) => {
                return lines.some(line => {
                    if (/^[RCL]/i.test(line.trim())) {
                        const parts = line.trim().split(/\s+/);
                        return parts[1] === '0' || parts[2] === '0';
                    }
                    return false;
                });
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