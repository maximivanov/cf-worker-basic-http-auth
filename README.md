# Basic HTTP Authentication Cloudflare worker

Use this worker to password-protect whole websites or some areas/specific pages.

_E.g. limit access to a staging version of a website you're building._

## Demo

See <https://cloudflareworkers.com/#f5d2cc53bd3d55486ddd14b1eb6e6c83:https://www.cloudflarestatus.com/>

In this example, to see <https://www.cloudflarestatus.com/>
you need to pass basic authentication.

User name: `demouser`

Password: `demopassword`

## How to use

Requirements:

- your website's DNS is managed by Cloudflare
- corresponding DNS record is proxied (orange cloud)

In order to protect your website with this worker you will
need to deploy worker code and configure route mapping.
There are multiple ways you can deploy workers, here are couple options for your
consideration.

### Option #1. Deploy manually via CF dashboard

If you care about _Infrastructure as Code_, skip to Option #2.

Create a worker.

- Go to Cloudflare Dashboard / Account Home / `Workers`
- `Create a Worker`
- Paste the code
- `Save and Deploy`

Configure route mapping.

- Go to Account Home / Domain / `Workers`
- `Add route`
- Provide route, e.g. example.com/protected/\*
- Select worker
- `Save`

You're set! If you open `example.com/protected/anything` now it will prompt you
to enter password.

### Option #2. Deploy with Wrangler

Wrangler is a tool built by Cloudflare to develop, test and deploy workers code.
For more thorough overview, check
[documentation](https://developers.cloudflare.com/workers/quickstart).

First you need to collect some information from your CF account.

- Account ID.
  - Account Home / Domain / `Overview` tab / `API` section / `Account ID`
- Zone ID.
  - Account Home / Domain / `Overview` tab / `API` section / `Zone ID`
- API token.
  - Account Home / Domain / `Overview` tab / `API` section / `Get API Token`
  - `Create Token`
  - `Start with Template`
  - Select the `Edit Cloudflare Workers` template
  - `Continue to Summary`
  - `Create Token`

Install Wrangler. `npm install -g @cloudflare/wrangler`

Create Wrangler config. `wrangler init --type javascript`

Update Wrangler config. Example:

```
name = "cf-worker-basic-http-auth"
type = "javascript"
account_id = "<YOUR ACCOUNT ID>"
zone_id = "<YOUR ZONE ID>"
route = "example.com/protected/*"
```

Configure API token. `wrangler config`

Deploy worker. `wrangler publish`

## Contributing

see [CONTRIBUTING.md](CONTRIBUTING.md)
