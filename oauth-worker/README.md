# opakreta-cms-auth

Kleine, losstaande Cloudflare Worker die de GitHub-inlog voor Sveltia CMS
(`/admin` op de hoofdsite) mogelijk maakt. Sveltia CMS draait volledig in de
browser en heeft geen Netlify-achtige host nodig, maar GitHub-OAuth vereist
wél een server die het GitHub-clientgeheim bewaart — dat is deze worker.

Dit is de ongewijzigde, officiële [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth)
worker (MIT-licentie, zie `LICENSE.txt`), enkel hernoemd (`opakreta-cms-auth`)
en met `ALLOWED_DOMAINS` vooraf ingesteld op `www.opakreta.be`. Deze worker is
volledig los van de hoofdsite (`opakreta`-worker) en wordt apart gedeployed.

## Eenmalige setup (door de site-eigenaar of iemand met Cloudflare/GitHub-toegang)

1. **Deze worker deployen naar Cloudflare** — twee manieren, kies er één:

   **Optie A — via de terminal (`wrangler` CLI):**
   ```bash
   cd oauth-worker
   npm install
   npx wrangler deploy --config wrangler.toml
   ```
   De `--config wrangler.toml`-vlag is hier niet optioneel — zie de
   toelichting bij Optie B hieronder voor waarom. Na deployen toont Wrangler
   de worker-URL, iets als
   `https://opakreta-cms-auth.<jouw-subdomein>.workers.dev`. Noteer die URL.

   **Optie B — via het Cloudflare-dashboard (geen terminal nodig):**
   Workers & Pages → **Create** → **Workers** → **Connect to Git**, kies deze
   repository. Belangrijk:
   - **Root directory**: `oauth-worker` (niet de repo-root — anders vindt
     Cloudflare `wrangler.toml` niet en faalt de build, of bouwt het
     per ongeluk de hoofdsite in plaats van deze worker).
   - **Controleer in het build-log of dit ook echt is toegepast** — het
     dashboard-veld kan de juiste waarde tonen zonder dat een build hem
     effectief gebruikt (bv. als de instelling op het verkeerde Cloudflare-
     project staat, of niet goed werd opgeslagen). Aan deze regels in het
     log herken je een verkeerd gescopete build: `npm run build` dat
     "content-bestanden ingelezen" of `next build` meldt (dat is het
     build-script van de hoofdsite — `oauth-worker` heeft zelf geen
     `build`-script),
     of een pad zoals `/opt/buildhome/repo/next-sitemap.config.cjs` **zonder**
     `oauth-worker/` erin. Een correcte build toont enkel
     `npx wrangler deploy` (of `versions upload`) tegen `oauth-worker/src/index.js`,
     zonder Next.js-stappen ervoor.
   - Build command mag leeg blijven: dit is een kale Worker zonder
     bundel-stap, Cloudflare leest `wrangler.toml` en deployt rechtstreeks.
   - **Bevestigde oorzaak van een ontbrekend `.open-next/worker.js`-entrypoint
     bij deploy** (ook al draait de installatiestap al correct binnen
     `oauth-worker/`): Wrangler's automatische configuratie-detectie geeft
     een `wrangler.jsonc`/`wrangler.json` ergens hogerop in de mappenboom
     voorrang boven een `wrangler.toml` in de huidige map — dus de
     `wrangler.jsonc` van de hoofdsite (repo-root, `main: ".open-next/worker.js"`)
     wint altijd van `oauth-worker/wrangler.toml` (`main = "src/index.js"`),
     ongeacht Root directory, build-cache of welk Cloudflare-project het is.
     Dit is lokaal bevestigd door `wrangler deploy` rechtstreeks (buiten
     Cloudflare's Git-integratie om) vanuit `oauth-worker/` te draaien: zonder
     `--config` gaf het exact dezelfde fout; met `--config wrangler.toml`
     verdween de fout volledig.
     **Fix**: zet de **Deploy command** in het dashboard expliciet op
     `npx wrangler deploy --config wrangler.toml` (i.p.v. het kale
     `npx wrangler deploy` dat Cloudflare standaard voorstelt). Dit lost het
     op ongeacht Root directory/cache/project-instellingen — die waren in dit
     geval geen van alle de echte oorzaak, al is een correcte Root directory
     nog steeds nodig zodat de installatiestap in de juiste map draait.
   - De worker-projectnaam komt overeen met `name` in `wrangler.toml`
     (`opakreta-cms-auth`) — zie de "Domains & Routes"-tab na de eerste
     deploy voor de definitieve `workers.dev`-URL.
   - **Handmatig opnieuw deployen** (bv. na een instelling wijzigen) kan via
     de **Deployments**-tab: `...`-menu bij de laatste deployment. Staat daar
     geen "Retry deployment"-optie, dan triggert een nieuwe push naar de
     gekoppelde branch (van eender welk bestand in `oauth-worker/`) sowieso
     een nieuwe build.
   - Secrets (`GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`, zie stap 3) zet je
     in dat geval via **Settings → Variables and Secrets** i.p.v.
     `wrangler secret put`.

2. **Een GitHub OAuth App registreren** op
   https://github.com/settings/applications/new (met het GitHub-account dat
   schrijftoegang heeft tot deze repository):
   - Application name: `Opa Kreta CMS`
   - Homepage URL: `https://www.opakreta.be`
   - Authorization callback URL: `<worker-URL uit stap 1>/callback`

   Klik daarna op **Generate a new client secret**. Noteer de **Client ID**
   en **Client Secret** die verschijnen (het geheim is maar één keer zichtbaar).

3. **De secrets instellen op de worker** (via de terminal — zie Optie B
   hierboven voor het dashboard-equivalent):
   ```bash
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```
   Plak bij elke prompt de bijbehorende waarde uit stap 2.

4. **`public/admin/config.yml`** in de hoofdsite bijwerken: zet
   `backend.base_url` op de worker-URL uit stap 1 (dit staat al klaar met een
   placeholder — zie de comment daar). Commit en deploy de hoofdsite.

5. Test de volledige inlogflow op `https://www.opakreta.be/admin` vóór je dit
   als "klaar" beschouwt: inloggen via GitHub, een kleine testwijziging maken,
   controleren dat die als commit in de repository verschijnt.

## Waarom een aparte worker?

Sveltia CMS (en elke Decap/Netlify-CMS-achtige tool) heeft voor GitHub-login
een server nodig die het OAuth-clientgeheim achter de schermen bewaart —
dat kan nooit in de browser, want dan zou iedereen het geheim kunnen zien.
Netlify biedt zo'n server ingebouwd aan; omdat deze site op Cloudflare
Workers draait, zetten we die ene, kleine functie zelf apart neer. Ze heeft
verder niets te maken met het renderen van de website zelf.

## ALLOWED_DOMAINS

Staat vooraf op `www.opakreta.be` in `wrangler.toml` (`[vars]`). Dit is een
beveiligingsmaatregel: zonder deze restrictie zou eender wie een eigen
Sveltia CMS-instantie op deze worker kunnen laten inloggen. Voeg een
testdomein toe (kommagescheiden) als je de CMS ergens anders wil uittesten,
bv. `www.opakreta.be, opakreta-preview.pages.dev`.
