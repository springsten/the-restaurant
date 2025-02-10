## Översikt

Ni skall skapa en sida för en restaurang. Denna sida kommer att presentera er restaurang, koncept,
inriktning, kontaktuppgifter m.m. Ni har fria händer att välja vad som skall presenteras.
Men, den stora saken för er att skapa är en bokningsfunktionalitet. Ni behöver skapa en grafisk profil
(ingenting som behöver redovisas) som visar att ni har en genomtänkt design, färgpaletter och en grundlayout.
Försök att få denna restaurang att bli så bra ni kan göra den, både sett till kod men även hur resultatet
ser ut i webbläsaren (eller telefonen).

## Sidor

Följande sidor måste finnas med: Startsida, bokningssida och en kontaktsida.
Om ni vill ha ytterligare sidor går det bra att lägga till.

## Beskrivning av bokningen

Utgå ifrån att restaurangen har 15 bord för sex personer vid varje bord. Restaurangen har två sittningar varje kväll,
en klockan 18:00 och en klockan 21:00. Detta innebär att samtliga bord bör gå att boka två gånger per kväll.
Skapa utifrån detta en applikation där det går att söka fram information för ett givet datum eller vecka.
Användaren skall kunna välja en tid för den valda dagen. Samla in personuppgifter, upplys om gdpr och se till att bokningen genomförs. I ett adminläge bör bokningar kunna administreras (modifieras, tas bort, läggastill) för personalen på restaurangen.

## Teknisk beskrivning

Som frontend skall ni skapa ett react-projekt med typescript. Det finns ett api som skall hjälpa er med denna uppgift:
https://school-restaurant-api.azurewebsites.net
För att få ytterligare hjälp finns det dokumentationför detta api tillgängligt på
https://school-restaurant-api.azurewebsites.net/api-doc

Att söka bord bör göras via ett formulär där användaren får ange antal personer (1-6) och önskat datum.
En sökning görs via ett API-anrop och ett resultat presenteras för användaren.
Om det fanns bord kvar så visas vilken/vilka tider som är tillgängliga. Om det inte finns bord kvar kommer en varningstext
upp och användaren får söka igen. När användaren har valt tid kommer ytterligare ett formulär upp där användaren
får skriva namn, e-post och telefonnummer. Spara eller Avbryt där Spara skriver ner bokningen i db via ett API-anrop.

För adminläget är det ett enklare CRUD mot databasen och ett enklare gränssnitt som är nödvändigt.Projektet skall finnas i ett git-repo och samtliga studenters commits skall finnas med.Trelloskall användas som verktyg för projektet. Det skall framgå vem som arbetat med vilken punkt.

- En fungerande applikation med samtliga sidor uppsatta med react router.
- Söksidan innehåller en textruta (eller valfri presentation) och en knapp för sökning (om det behövs).
- Sökningen av lediga tiders kall göras genom ett anrop till ett API.
- Resultatet från sökningen skall presenteraspå ett genomtänkt sätt, kanske genom en radioknappslista eller en rullgardinsmeny.
- Ett API-anrop skall göras för att spara bokningen i databasen.
- Administrationsgränssnittet finns med.
- Er applikation är responsiv.•Koden skall vara genomtänkt och ha en tydlig struktur.
- Filstrukturen i projektet skall vara god.
- Formulären innehåller validering och felmeddelanden.
- Hantera avbokningar.
- Kunna redigera bokningar i administrationsgränssnittet.
- Använd css/scss för att skapa animationer vid t.ex. laddning och bokningar.

Ett litet tips så att ni kommer iväg rätt:
Skapa en restaurang genom att anropa api:t.
Innan detta är gjort kan ni inte göra någonting med bokningsfunktionaliteten.
Att skapa en restaurang är någonting som ni bara behöver göra en gång.
