# Import míst z KML souboru

Tento dokument popisuje, jak smazat všechna existující místa z databáze a naimportovat nová z KML souboru.

## Přehled

Byly vytvořeny následující skripty:

1. **`kmlParser.ts`** - Utility pro parsování KML souborů
2. **`importPlacesFromKML.ts`** - Skript pro import míst z KML souboru
3. **`replacePlacesFromKML.ts`** - Hlavní skript, který smaže všechna místa a naimportuje nová

## Použití

### Základní použití

```typescript
import { replacePlacesFromKML } from './scripts/replacePlacesFromKML';

// V App.tsx nebo v jiném místě inicializace
await replacePlacesFromKML('./assets/places.kml');
```

### Použití s vlastními možnostmi

```typescript
import { importPlacesFromKML } from './scripts/importPlacesFromKML';

// Import bez mazání existujících míst
await importPlacesFromKML('./assets/places.kml', false);

// Import s mazáním existujících míst
await importPlacesFromKML('./assets/places.kml', true);
```

## Formát KML souboru

KML soubor by měl obsahovat `Placemark` elementy s následující strukturou:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Placemark>
      <name>Název místa</name>
      <description>Popis místa</description>
      <Point>
        <coordinates>14.4004,50.0904,0</coordinates>
      </Point>
      <ExtendedData>
        <Data name="address">
          <value>Adresa místa</value>
        </Data>
        <Data name="category">
          <value>sightseeing</value>
        </Data>
        <Data name="shortDescription">
          <value>Krátký popis</value>
        </Data>
        <Data name="practicalTips">
          <value>Praktické tipy</value>
        </Data>
        <Data name="estimatedVisitDuration">
          <value>60</value>
        </Data>
        <Data name="priceRange">
          <value>medium</value>
        </Data>
        <Data name="isPremium">
          <value>false</value>
        </Data>
      </ExtendedData>
    </Placemark>
  </Document>
</kml>
```

### Povinné údaje

- **name** - Název místa (povinné)
- **coordinates** - Souřadnice ve formátu `longitude,latitude` (povinné)

### Volitelné údaje v ExtendedData

- **address** - Adresa místa
- **category** - Kategorie: `sightseeing`, `hidden_gems`, `food`, `nature`, `viewpoints`
- **shortDescription** - Krátký popis
- **practicalTips** - Praktické tipy
- **estimatedVisitDuration** - Odhadovaná doba návštěvy v minutách
- **priceRange** - Cenová kategorie: `free`, `low`, `medium`, `high`
- **isPremium** - Zda je místo prémiové: `true` nebo `false`

### Automatické mapování kategorií

Parser automaticky mapuje textové hodnoty kategorií:
- `sightseeing`, `attraction` → `SIGHTSEEING`
- `hidden`, `gem` → `HIDDEN_GEMS`
- `food`, `restaurant`, `cafe` → `FOOD`
- `nature`, `park`, `garden` → `NATURE`
- `viewpoint`, `view`, `tower` → `VIEWPOINTS`

## Příklad použití v App.tsx

```typescript
import { replacePlacesFromKML } from './scripts/replacePlacesFromKML';

const setupApp = async () => {
  try {
    // Initialize database
    await initDatabase();

    // Replace all places with KML data (uncomment when needed)
    // await replacePlacesFromKML('./assets/places.kml');

    // Or use regular seeding
    await seedDatabase();

    // ... rest of initialization
  } catch (error) {
    console.error('Failed to setup app:', error);
  }
};
```

## Poznámky

- KML soubor musí být umístěn v `assets` složce nebo na jiné dostupné cestě
- Všechna místa budou mít prázdné pole `images` - můžete přidat logiku pro mapování obrázků
- ID místa se generuje automaticky na základě názvu a souřadnic
- Pokud místo nemá kategorii, použije se výchozí kategorie `SIGHTSEEING`
