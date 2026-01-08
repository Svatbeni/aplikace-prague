# Řešení problémů s obrázky

## Problém: Obrázky se nezobrazují

### Možné příčiny a řešení:

1. **Restartujte Expo dev server**
   - Po přidání nových obrázků je potřeba restartovat dev server
   - Zastavte server (Ctrl+C) a spusťte znovu: `npm start`
   - Nebo stiskněte 'r' v terminálu pro reload

2. **Zkontrolujte, že obrázky jsou ve správné složce**
   - Cesta: `assets/images/places/`
   - Názvy souborů: `place-1.jpg`, `place-2.jpg`, atd.

3. **Zkontrolujte konzoli pro chyby**
   - Otevřete konzoli v Expo Go nebo v terminálu
   - Hledejte chyby typu "Unable to resolve module" nebo "Image load error"

4. **Zkontrolujte formát souborů**
   - Podporované formáty: JPG, PNG
   - Ujistěte se, že soubory nejsou poškozené

5. **Vyčistěte cache**
   ```bash
   npm start -- --clear
   ```

6. **Zkontrolujte, že obrázky jsou správně pojmenované**
   - Musí přesně odpovídat názvům v `seedData.ts`: `place-1.jpg`, `place-2.jpg`, atd.

## Testování

Otevřete konzoli v aplikaci a zkontrolujte, zda se zobrazují chyby při načítání obrázků.
