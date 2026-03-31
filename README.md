<div align="center">
<a href="https://abdullah-faheem.vercel.app"><img src="./public/logo.png" width="60px"></a>
</div>

<div align="center">
<h1>abdullah-faheem.vercel.app</h1>
<p>My personal portfolio website</p>
</div>

# Tech Stack

- [NextJS][nextjs] - UI framework
- [Vercel][vercel] - Hosting and Deployment
- [Sanity.io][sanity] - Headless CMS and Content Lake
- [TailwindCSS][tailwind] / CSS - Styling and UI
- [Umami][umami] - Analytics
- [Next Themes][nexttheme] - Color Theme
- [React Refractor][reactrefractor] - Syntax Highlighting

## Project Overview

| [Site][site]          | [Studio][studio]                 |
| --------------------- | -------------------------------- |
| ![Site][site-preview] | ![Sanity Studio][studio-preview] |

## Run Project Locally

Follow this guide to get this site running locally:

### Clone Repository

```bash
git clone https://github.com/abdullah-faheem/portfolio.git

cd portfolio

npm install
```

- Rename [`.env.example`][env-example] to `.env.local`

### Get Env Variables

The minimal `env` variables required to boot this project locally includes:

- `Project Id`
- `Dataset`
- `API Version`
- `Access Token`

These variables come from Sanity. To get them, you need to set up your own Sanity instance. Follow the steps below to do this:

### Create a New Sanity Project

Run the command below in a terminal to create a new Sanity project:

```bash
npm create sanity@latest -- --template clean --create-project "Abdullah Faheem" --dataset production
```

- **Create an account**: If you already have a Sanity account, this will automatically connect to it. If not, select a login provider from the list of options, hit `Enter`, and follow the prompt to create one.
- **Choose an Output path**: Hit the `Enter` key to select the default path.
- Install the dependencies with your preferred package manager.

Once completed, open up the studio directory:

```bash
cd abdullah-faheem

code .
```

- Navigate to the `sanity.config.ts` file in the root directory and copy the `projectId`. Now you can close the studio file.

### Update Env Variables

Open up the cloned repository and do the following:

- Set `NEXT_PUBLIC_SANITY_PROJECT_ID` to the project ID you copied earlier
- Set `NEXT_PUBLIC_SANITY_DATASET` to `production` or the dataset name you used
- Set `NEXT_PUBLIC_SANITY_API_VERSION` to your current date in **YYYY-MM-DD** format or leave as is
- If you want to use an access token, visit [sanity.io/manage][sanity-manage] > **project name** > **API** > **Token** to create one. Once generated, copy the token and set it to `NEXT_PUBLIC_SANITY_ACCESS_TOKEN`

> [!WARNING]
> If you don't want to use a token, comment it out in the [env.api.ts][env-api] file or it will throw errors.

- Now run `npm run dev` and visit [http://localhost:3000][localhost] to see the project live.

By default the UI will be blank. To start adding data to the site, visit your studio at [http://localhost:3000/studio][localhost-studio] to create your own documents.

If you experience any issues or have enquiries, please raise an issue to discuss it.

## Additional Information

Need more guidance? Check out this [tutorial][sanity-guide] that provides a step-by-step guide to setting up Sanity Studio for your portfolio site.

## Build

```bash
npm run build
```

### Important Files and Folders

| File(s)                                        | Description                                     |
| ---------------------------------------------- | ----------------------------------------------- |
| [`sanity.config.ts`](sanity.config.ts)         | Config file for Sanity Studio                   |
| [`sanity.client.ts`](lib/sanity.client.ts)     | Config file for Sanity CLI                      |
| [`studio`](./app/studio/[[...index]]/page.tsx) | Where Sanity Studio is mounted                  |
| [`schemas`](./schemas)                         | Where Sanity Studio gets its content types from |
| [`sanity.query.ts`](./lib/sanity.query.ts)     | GROQ query for Sanity Schema data               |

## License & Usage

This portfolio is MIT-licensed, so you are free to use it as inspiration or copy the whole thing (excluding personal content). Just make sure you link back to [abdullah-faheem.vercel.app][site] on the footer section as attribution to the original source.

<!-- Link Refs -->

[nextjs]: https://nextjs.org
[vercel]: https://vercel.com
[sanity]: https://sanity.io
[tailwind]: https://tailwindcss.com
[umami]: https://umami.is
[nexttheme]: https://github.com/pacocoursey/next-themes
[reactrefractor]: https://github.com/rexxars/react-refractor
[site]: https://abdullah-faheem.vercel.app
[studio]: https://abdullah-faheem.vercel.app/studio
[studio-preview]: #
[site-preview]: #
[env-example]: .env.example
[localhost]: http://localhost:3000
[localhost-studio]: http://localhost:3000/studio
[env-api]: lib/env.api.ts
[sanity-manage]: https://sanity.io/manage
[sanity-guide]: https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-sanity-and-nextjs
