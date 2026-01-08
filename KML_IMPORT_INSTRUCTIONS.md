# Instrukce pro import míst z KML souboru

Tento dokument popisuje, jak smazat všechna místa z databáze a naplnit je novými místy z KML souboru.

## Co bylo vytvořeno

1. **Metoda `deleteAll()` v `PlaceRepository`** - smaže všechna místa z databáze
2. **Funkce `importKmlPlaces()`** - importuje místa z KML souboru
3. **Funkce `importKmlPlacesFromContent()`** - importuje místa z KML obsahu (string)

## Jak použít

### Možnost 1: Import z cesty k souboru

```typescript
import { importKmlPlaces } from './src/shared/services/importKmlPlaces';
import * as FileSystem from 'expo-file-system';

// Cesta k KML souboru (např. z Downloads)
const kmlPath = FileSystem.documentDirectory + 'prague-places.kml';
// Nebo absolutní cesta:
// const kmlPath = 'file:///C:/Users/YourName/Downloads/117 Things to Do in Prague.kml';

try {
  const count = await importKmlPlaces(kmlPath);
  console.log(`Úspěšně importováno ${count} míst`);
} catch (error) {
  console.error('Chyba při importu:', error);
}
```

### Možnost 2: Import z KML obsahu (string)

```typescript
import { importKmlPlacesFromContent } from './src/shared/services/importKmlPlaces';
import * as FileSystem from 'expo-file-system';

// Načtení KML souboru
const kmlContent = await FileSystem.readAsStringAsync('file:///path/to/file.kml');

try {
  const count = await importKmlPlacesFromContent(kmlContent);
  console.log(`Úspěšně importováno ${count} míst`);
} catch (error) {
  console.error('Chyba při importu:', error);
}
```

## Kde spustit import

Můžete import spustit například:

1. **V `App.tsx` při inicializaci** (pouze jednou):
```typescript
import { importKmlPlaces } from './src/shared/services/importKmlPlaces';
import * as FileSystem from 'expo-file-system';

// V setupApp funkci, před nebo místo seedDatabase()
const shouldImportKml = false; // Nastavte na true pro import
if (shouldImportKml) {
  const kmlPath = 'file:///C:/Users/halou/Downloads/117 Things to Do in Prague.kml';
  await importKmlPlaces(kmlPath);
}
```

2. **V samostatném screenu pro administraci** (pokud ho máte)

3. **Přímo v konzoli během vývoje** (pomocí React Native Debugger)

## Důležité upozornění

⚠️ **Import automaticky SMAŽE všechna existující místa z databáze před importem nových!**

## Mapování kategorií

KML soubor obsahuje různé složky (Folders), které jsou automaticky mapovány na kategorie:

- "Essential Things to Do" → `SIGHTSEEING`
- "Prague Hidden Gems" → `HIDDEN_GEMS`
- "Fun & Cool Things to Do" → `SIGHTSEEING`
- "Unusual and Bizarre Things to Do" → `HIDDEN_GEMS`
- "Family-friendly Things to Do" → `NATURE`
- "Cultural and Art Things to Do" → `SIGHTSEEING`
- "Nightlife" → `FOOD`
- "Where to Eat" → `FOOD`

## KML soubor

KML soubor byl zkopírován do `assets/kml/prague-places.kml` pro referenci.

## Co se importuje

Z každého místa v KML se importuje:
- Název (name)
- Popis (description, pokud je k dispozici)
- Souřadnice (latitude, longitude)
- Kategorie (podle složky v KML)

Ostatní pole (images, openingHours, address, atd.) zůstávají prázdná a mohou být doplněna později.
