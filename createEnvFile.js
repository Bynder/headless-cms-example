const fs = require('fs');
const fetch = require('node-fetch');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv
const credentials = `${argv.email}:${argv.apiKey}`;
const base64credentials = Buffer.from(credentials).toString("base64");

const get = async (endpoint) => await fetch(endpoint, {
  headers: {
    Accept: "application/vnd.gathercontent.v2+json",
    Authorization: `Basic ${base64credentials}`,
  },
});

/**
 * We currently have no way of identifying fields (e.g. slugs)
 * so for now we're searching for fields with a specific label.
 */
const fieldLabelLookup = ['Hours', 'Weeks', 'Credits', 'Photo of course'];

(async () => {
  const templatesResponse = await get(`https://api.gathercontent.com/projects/${argv.projectId}/templates`);
  const { data } = await templatesResponse.json();
  const template = data.filter(t => t.name === 'Course record')[0];

  const templateResponse = await get(`https://api.gathercontent.com/templates/${template.id}`);
  const { related } = await templateResponse.json();

  const fieldsData = related.structure.groups.reduce((acc, group) => {
    const fields = group.fields.filter(f => fieldLabelLookup.indexOf(f.label) > -1);

    return !fields.length ? acc : [...acc, ...fields.map(fss => ({
      label: `<${fss.label}>`,
      uuid: fss.uuid
    }))];
  }, []);

  let envString = `GATHERCONTENT_API_USERNAME=${argv.email}
GATHERCONTENT_API_KEY=${argv.apiKey}
GATHERCONTENT_PROJECT_ID=${argv.projectId}

CONTENT_HERO_IMAGE_FIELD_UUID=<Photo of course>
CONTENT_HOURS_FIELD_UUID=<Hours>
CONTENT_WEEKS_FIELD_UUID=<Weeks>
CONTENT_CREDITS_FIELD_UUID=<Credits>
      `

  fieldsData.map(f => {
    envString = envString.replace(f.label, f.uuid);
  });

  fs.writeFile('.env', envString, () => console.log(envString));
})();
