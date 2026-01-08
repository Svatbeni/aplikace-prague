# Lokální obrázky míst

Tato složka obsahuje obrázky pro jednotlivá místa v aplikaci.

## Doporučené rozlišení obrázků

### Pro karty míst (PlaceCard)
- **Rozlišení**: 800 × 400 pixelů (poměr stran 2:1)
- **Formát**: JPG nebo PNG
- **Velikost souboru**: max. 200-300 KB (pro rychlé načítání)
- **Použití**: Zobrazuje se v seznamu míst s výškou 200px

### Pro detailní obrazovku (PlaceDetailScreen)
- **Rozlišení**: 1200 × 600 pixelů (poměr stran 2:1)
- **Formát**: JPG nebo PNG
- **Velikost souboru**: max. 400-500 KB
- **Použití**: Zobrazuje se v detailu místa s výškou 300px

### Pro Retina displeje
Pro nejlepší kvalitu na zařízeních s vysokou hustotou pixelů můžete vytvořit varianty:
- **@2x**: 1600 × 800 px (pro PlaceCard) nebo 2400 × 1200 px (pro Detail)
- **@3x**: 2400 × 1200 px (pro PlaceCard) nebo 3600 × 1800 px (pro Detail)

React Native automaticky vybere správnou variantu podle zařízení.

## Pojmenování souborů

Soubory pojmenujte podle ID místa v databázi:
- `place-1.jpg` - pro místo s ID "1"
- `place-2.jpg` - pro místo s ID "2"
- atd.

## Aktuální místa v aplikaci

1. **place-1.jpg** - Charles Bridge
2. **place-2.jpg** - Prague Castle
3. **place-3.jpg** - Old Town Square
4. **place-4.jpg** - Petřín Hill
5. **place-5.jpg** - Vyšehrad
6. **place-6.jpg** - John Lennon Wall
7. **place-7.jpg** - U Fleků
8. **place-8.jpg** - Stromovka Park

## Tipy pro optimalizaci

1. **Komprese**: Použijte nástroje jako TinyPNG nebo ImageOptim pro zmenšení velikosti souborů
2. **Formát**: JPG je obvykle lepší pro fotografie, PNG pro obrázky s průhledností
3. **Poměr stran**: Zachovejte poměr 2:1 pro konzistentní zobrazení
4. **Kvalita**: Pro JPG použijte kvalitu 80-85% (dobrý kompromis mezi kvalitou a velikostí)

## Přidání nového obrázku

1. Přidejte obrázek do této složky s názvem `place-X.jpg` (kde X je ID místa)
2. Otevřete `src/shared/utils/imageHelper.ts`
3. Přidejte řádek do `imageMap`:
   ```typescript
   'place-X.jpg': require('../../../assets/images/places/place-X.jpg'),
   ```
