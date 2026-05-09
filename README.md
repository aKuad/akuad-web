# akuad-web

aKuad's website - Powered by Cloudflare Workers & Pages and KV

<https://akuad.dev>

## How to preview website

```sh
cd pages
npx wrangler pages dev global/
```

Then access to: `http://localhost8788/`

## How to test workers cron script

```sh
cd workers
npx wrangler dev
```

Then access to: `http://localhost:8787/cdn-cgi/handler/scheduled`

## System overview

```mermaid
sequenceDiagram
  actor b as Browser
  participant p as Pages
  participant k@{ "type": "database" } as KV
  participant w@{ "type" : "control" } as Workers

  Note over b, k: Normal page access
  b ->>+ p: Access
  p -->>- b: Response

  Note over b, k: Articles page access
  b ->>+ p: Access '/articles'
  p -->>- b: Response
  b ->>+ p: Fetch articles data
  p ->>+ k: Get
  k -->>- p: Return
  p -->>-b: Response
  b ->> b: View update

  Note over b, w: Articles data update every hour
  w ->> w: Fetch article info<br>from external services
  w ->> k: Put data
  destroy w
```

## License

[CC-BY-4.0](./LICENSE)
