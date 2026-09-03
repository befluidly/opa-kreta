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
   npx wrangler deploy --config wrangler.toml --keep-vars
   ```
   De `--config wrangler.toml`-vlag is hier niet optioneel — zie de
   toelichting bij Optie B hieronder voor waarom. De `--keep-vars`-vlag is
   dat evenmin zodra je stap 3 (secrets instellen) al hebt uitgevoerd —
   zie de toelichting daar. Na deployen toont Wrangler de worker-URL, iets
   als `https://opakreta-cms-auth.<jouw-subdomein>.workers.dev`. Noteer
   die URL.

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
     `npx wrangler deploy --config wrangler.toml --keep-vars` (i.p.v. het
     kale `npx wrangler deploy` dat Cloudflare standaard voorstelt). Dit
     lost het op ongeacht Root directory/cache/project-instellingen — die
     waren in dit geval geen van alle de echte oorzaak, al is een correcte
     Root directory nog steeds nodig zodat de installatiestap in de juiste
     map draait.
   - **Waarschijnlijke oorzaak van verdwenen secrets na een volgende
     deploy** (opgemerkt doordat de CMS na meerdere opeenvolgende
     documentatie-only pushes plots weer "client-ID of secret niet
     geconfigureerd" toonde, terwijl de secrets eerder al via het
     dashboard waren ingesteld): zonder `--keep-vars` beschouwt Wrangler
     `wrangler.toml` als de volledige waarheid over vars/secrets van deze
     worker — alles wat via het dashboard is ingesteld (zoals
     `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`, die bewust *niet* in
     `wrangler.toml` staan, want dat bestand wordt gecommit) wordt bij de
     eerstvolgende deploy zonder die vlag stilzwijgend gewist. Elke push
     naar deze branch triggert een nieuwe deploy, dus ook pushes die enkel
     documentatie wijzigden konden dit veroorzaken. **Fix**: `--keep-vars`
     toevoegen aan de Deploy command (zie hierboven) — dit moet **vóór**
     je de secrets in stap 3 instelt, anders wist de eerstvolgende push ze
     opnieuw.
   - De worker-projectnaam komt overeen met `name` in `wrangler.toml`
     (`opakreta-cms-auth`) — zie de "Domains & Routes"-tab na de eerste
     deploy voor de definitieve `workers.dev`-URL.
   - **Handmatig opnieuw deployen** (bv. na een instelling wijzigen, zoals
     de Deploy command of secrets) kan via de **Deployments**-tab:
     `...`-menu bij de laatste deployment. "Retry deployment" staat daar
     enkel bij **mislukte** builds — bij een geslaagde build zie je in dat
     menu enkel "View logs", geen herdeploy-optie. Is de laatste build
     geslaagd maar wil je toch een nieuwe deploy forceren (bv. om net
     gewijzigde secrets in een nieuwe versie te laten meenemen), dan
     triggert een nieuwe push naar de gekoppelde branch (van eender welk
     bestand in `oauth-worker/`) sowieso een nieuwe build.
   - Secrets (`GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`, zie stap 3) zet je
     in dat geval via het dashboard i.p.v. `wrangler secret put`. **Let op:
     twee gelijkaardig genoemde secties** — de worker leest ze pas op
     runtime als ze in **"Runtime variables and secrets"** staan (samen
     met `ALLOWED_DOMAINS`, dat je daar al ziet staan). Een sectie die
     enkel **"Variables and secrets"** heet (zonder "Runtime") is iets
     anders — bevestigd dat secrets die daar per ongeluk ingevuld worden,
     wél in de build-log als "Build variables" verschijnen (lijkt dus
     geconfigureerd) maar nooit als `env.GITHUB_CLIENT_ID` in de worker
     terechtkomen, met exact dezelfde "client-ID of secret niet
     geconfigureerd"-melding tot gevolg als wanneer ze helemaal ontbreken.

   **Snel controleren dat de juiste worker is gedeployed**, vóór je verder
   gaat met de OAuth App (stap 2): open `<worker-URL>/auth` in de browser.
   De pagina zelf oogt **leeg/wit** — dat is normaal, want dit is een
   popup-scriptje dat enkel een `postMessage` naar een openende venster
   stuurt en verder niets zichtbaars rendert. Gebruik **"Paginabron
   bekijken"/"View Page Source"** (niet de gewone pagina-inhoud): staat
   daarin letterlijk `"error":"Your Git backend is not supported by the
   authenticator."` (ingebed in een inline `<script>`-tag, want er
   ontbreken query-parameters voor een echte login-poging), dan is de
   juiste code live. Zie je in de paginabron iets dat op de hoofdsite
   lijkt, of Cloudflare's generieke foutpagina, dan is er nog steeds het
   verkeerde entrypoint gedeployed — zie de vorige stap.

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

Staat vooraf op `www.opakreta.be, opakreta.be` in `wrangler.toml` (`[vars]`).
Dit is een beveiligingsmaatregel: zonder deze restrictie zou eender wie een
eigen Sveltia CMS-instantie op deze worker kunnen laten inloggen. Voeg een
testdomein toe (kommagescheiden) als je de CMS ergens anders wil uittesten,
bv. `www.opakreta.be, opakreta-preview.pages.dev`.

**Beide vormen (`www.` en kaal) zijn nodig**, ook al herleidt
`middleware.ts` het kale apex-domein normaal naar `www.`: `/admin` is een
statisch bestand (`public/admin/index.html`) dat Cloudflare's assets-laag
rechtstreeks aflevert, vóór de Next.js-middleware ooit draait — die redirect
wordt voor dit pad dus nooit uitgevoerd. Bevestigd doordat inloggen op
`opakreta.be/admin` (zonder www) faalde met "Je domein mag de authenticator
niet gebruiken" terwijl `www.opakreta.be/admin` wel werkte, tot het kale
domein hier expliciet werd toegevoegd.

Ondersteunt ook een `*`-wildcard (bv. `*-opa-kreta.gizzylynne.workers.dev`) —
nodig omdat Cloudflare Workers Builds elke build op een niet-productie-
branch een **eigen, aan die specifieke versie vastgepind** preview-URL geeft
(`<versie-id>-opa-kreta.<subdomein>.workers.dev`); die URL verandert dus bij
elke nieuwe push, ook bij pushes die enkel bestanden in `oauth-worker/`
raken (want de git-integratie van de hoofdsite bouwt opnieuw bij elke push
naar de branch, ongeacht welk pad gewijzigd is). Zonder wildcard zou je
`ALLOWED_DOMAINS` na elke push opnieuw moeten bijwerken.
