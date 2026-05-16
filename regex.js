function SPICENetlistValidator(UserInput) {
    /* 
    Regel 1: die erste Zeile ist der Titel
    Regel 2: Eingabe muss mit .end beendet werden
    Regel 3: Syntaxanalyse der Bauteile
    */
   const errors = [];
   //trim() entfernt Leerzeichen von beiden Seiten der Zeichenkette
   //split('\n') entfernt die Anweisung einer neuen Zeile (Enter oder new line)
   const Zeile = UserInput.trim().split('\n');

   const Titel = Zeile[0].trim();
   //testet ob der Titel mit einem Bauteil beginnt (/i ist egal ob die Buchstaben groß oder klein geschrrieben werden)
   if(/^[RCL]/i.test(Titel)){
        errors.push("Die erste Zeile muss ein Titel sein, darf nicht mit einem Bauteil gebinnen");
   }
   return errors;
}

function ueberpruefen() {
    const UserInput = document.getElementById('UserInput').value;
    const errors = SPICENetlistValidator(UserInput);
    const Verifizierungsergebnis = document.getElementById('Verifizierungsergebnis');

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