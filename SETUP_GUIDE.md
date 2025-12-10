# Setup Guide - Automatska Konfiguracija

## Šta trebaš poslati iz Supabase:

### Opcija 1: Connection String (Najlakše)

1. Idi u Supabase Dashboard → **Settings → Database**
2. Idi na **Connection string** sekciju
3. Klikni na **URI** tab
4. Kopiraj connection string koji izgleda ovako:

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

**ILI** pošalji mi ove podatke:

### Opcija 2: Pojedinačni podaci

Iz **Settings → Database** u Supabase:

1. **Host:** `db.xxxxx.supabase.co` (ili slično)
2. **Port:** `5432`
3. **Database:** `postgres`
4. **User:** `postgres`
5. **Password:** (tvoj password koji si postavio)

---

## Šta ću uraditi:

1. ✅ Konfigurirati Laravel `.env` file sa Supabase credentials
2. ✅ Kreirati sve tabele (pokrenuti migracije)
3. ✅ Postaviti frontend `.env` file
4. ✅ Testirati konekciju

---

## Kako da mi pošalješ:

**Samo mi reci:**

- Supabase Host (npr. `db.xxxxx.supabase.co`)
- Supabase Password

Ili pošalji connection string.

**NAPOMENA:** Ne dijelim credentials javno - samo mi reci u chat-u i ja ću sve postaviti!
