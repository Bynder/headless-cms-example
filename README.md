# GatherContent + Next.js Site Example

This repository is set-up to work with a GatherContent example project, publishing content to Vercel or Netlify, which then uses Next.js to present on the front end. You can adapt this to pull content from any of your projects, and see how quick you can build out websites and other experiences on top of GatherContent.

### Deploying

To deploy with **Vercel**, click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/gathercontent/nextjs-site-example&env=GATHERCONTENT_API_USERNAME%2CGATHERCONTENT_API_KEY%2CGATHERCONTENT_PROJECT_ID&demo-title=Royal+University+of+GatherContent&demo-description=GatherContent+example+project%2C+publishing+content+to+Vercel+or+Netlify%2C+which+then+uses+Next.js+to+present+on+the+front+end.&demo-url=https%3A%2F%2Funiversity-wheat.vercel.app%2F&demo-image=blob%3Ahttps%3A%2F%2Fvercel.com%2F5e754c6f-5390-4f5c-8003-26945d2d8713&teamSlug=gathercontent)

To deploy with **Netlify**, click:

[![Deploy with Vercel](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gathercontent/nextjs-site-example)

### Required environment variables

```
GATHERCONTENT_API_USERNAME=<email>
GATHERCONTENT_API_KEY=<api-key>
GATHERCONTENT_PROJECT_ID=<project-id>
```
- `GATHERCONTENT_API_USERNAME` is your email address which you used to sign up to GatherContent

- `GATHERCONTENT_API_KEY` - follow [instructions](https://docs.gathercontent.com/reference#authentication) to find your API key

- `GATHERCONTENT_PROJECT_ID` - the easiest way to get the ID is to copy it from the URL. Go to your project, the structure will look like this: `gathercontent.com/content/<PROJECT-ID>/items`

As every project is unique, you'll need some environment variables for content uuids;

```
CONTENT_HERO_IMAGE_FIELD_UUID=<uuid-of-hero-image-field>
CONTENT_HOURS_FIELD_UUID=<uuid-of-hours-field>
CONTENT_WEEKS_FIELD_UUID=<uuid-of-weeks-field>
CONTENT_CREDITS_FIELD_UUID=<uuid-of-credits-field>
```

## More on content UUIDs

- In this example we have used env vars for storing content uuids, but you can add them directly into the code. For storing UUIDs in code we recommend using the `./contentUUIDs.js` file and importing that into the pages required.

- You can get the UUIDs in a number of different ways, but we recommend you discover them using the API.

### Local development

To run the project locally, you need to fork this repo or clone it.

```
git clone
```

Next, install all dependencies:

```
yarn
```

Create an `.env` file and fill it up with all the required environment variables. Use `.env.example` as a starter if you wish.

```
touch .env
```

Finally, you can start development server:

```
yarn dev
```
