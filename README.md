# Bok Andrew 🤨 – upitnik za gaming miša i podlogu

Mala statična stranica (HTML + CSS + JS, bez instalacije) na kojoj Andrew odgovara na pitanja,
a odgovori se šalju tebi – da lakše odabereš gaming miša i mousepad za Božić. 🎁

## Što pita

1. **Veličina šake** – slider (dužina od vrha srednjeg prsta do zapešća) + neobavezno širina, sa slikom kako mjeriti (`assets/hand-measure.webp`)
2. **Oblik** – simetrični / ergonomski / nije bitno
3. **Gumbi** – broj bočnih gumba + dodaci (DPI gumb, tilt kotačić, sniper gumb...)
4. **Grip** – palm / relaxed claw / claw / fingertip claw / fingertip / ne znam (3D slike sa [shapefinder.cc](https://shapefinder.cc), u `assets/grips/`)
5. **Težina** – ultralagan / lagan / srednji / teži / nije bitno
6. **Žičani ili bežični**
7. **Boja** (sa slikama, može više) + RGB da/ne
8. **Igre** koje igra + način ciljanja (zapešće/ruka) + sens/DPI
9. **Mousepad** – brzina, veličina, izgled
10. **Trenutni miš** i napomene (neobavezno)

Na kraju: **pregled svih odgovora** („Jesi li siguran?") s gumbom *Uredi* za svako pitanje,
*Pošalji* i *Idem ispočetka*. Nakon slanja može promijeniti odgovore i poslati opet, ili riješiti sve ispočetka
(u poruci piše „pokušaj #N" – računaj zadnji). Napredak se pamti u pregledniku ako zatvori stranicu.

U poruci koju dobiješ je i **gruba preporuka dimenzija miša** (izračunata iz veličine šake i gripa) – to vidiš samo ti.

## 1) Podesi gdje stižu odgovori (obavezno)

Otvori `js/config.js` i popuni barem jednu opciju:

**Najlakše – na email preko Web3Forms (besplatno):**
1. Idi na <https://web3forms.com>, upiši svoj email i klikni *Create Access Key*.
2. Ključ ti stigne na mail – zalijepi ga u `web3formsAccessKey: "..."`.

**Ili push notifikacija na mobitel (ntfy):**
1. Instaliraj aplikaciju *ntfy* (Android/iOS).
2. Izmisli dugačko, nasumično ime topica (npr. `andrew-mis-8f3k2q9z`) i pretplati se na njega u aplikaciji.
3. Upiši ga u `ntfyTopic: "..."`.

**Ili Formspree** (ili bilo koji servis koji prima JSON) – URL forme u `formEndpoint`.

Ako ništa nije podešeno (ili slanje ne uspije), Andrew dobije gumb *Kopiraj* da ti odgovore pošalje porukom.

## 2) 67 GIF

Stavi svoj gif u **`assets/67.gif`** – prikazuje se dolje desno na svim stranicama i vrti se u krug.
Dok ga nema, tamo je animirani „6 7" placeholder.

## 3) Objavi stranicu (GitHub Pages)

1. Na GitHubu: **Settings → Pages**.
2. *Source*: **Deploy from a branch**, odaberi granu (npr. `main` ili ovu granu) i folder **`/ (root)`**, *Save*.
3. Za minutu-dvije stranica je na `https://<tvoj-username>.github.io/andrew_quiz/` – taj link pošalji Andrewu.

> Napomena: ako je repozitorij javan, Andrew bi ga teoretski mogao naći. Za GitHub Pages iz privatnog repoa
> treba plaćeni plan – alternativa je besplatni Netlify/Vercel/Cloudflare Pages (samo povuci folder).

## Lokalno testiranje

```bash
python3 -m http.server 8000
```

Pa otvori <http://localhost:8000>. Za brisanje spremljenog napretka: u konzoli preglednika
`localStorage.removeItem("andrew-upitnik-v1")`.
