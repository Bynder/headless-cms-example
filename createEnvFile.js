const fs = require('fs');
const fetch = require('node-fetch');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const credentials = `${argv.email}:${argv.apiKey}`;
const base64credentials = Buffer.from(credentials).toString('base64');

const get = async (endpoint) =>
  await fetch(endpoint, {
    headers: {
      Accept: 'application/vnd.gathercontent.v2+json',
      Authorization: `Basic ${base64credentials}`,
    },
  });

/**
 * We currently have no way of identifying fields (e.g. slugs)
 * so for now we're searching for fields with a specific label.
 */
const fieldLabelLookup = [
  'Hours',
  'Weeks',
  'Credits',
  'Photo of course',
  'Course code',
  'Core requisites',
  'Course summary',
  'Taught by',
  'Prerequisites',
  'Note',
  'Total seats',
];

if (!argv.apiKey || !argv.email || !argv.projectId) {
  console.log('ERROR: Missing Data');
  console.log('You must supply an email, api key and project id.');
  return;
}

(async () => {
  try {
    const templatesResponse = await get(
      `https://api.gathercontent.com/projects/${argv.projectId}/templates`
    );
    const { data } = await templatesResponse.json();

    if (!data) {
      throw new Error('ERROR: Project templates not found.');
    }

    const template = data.filter((t) => t.name === 'Course record')[0];

    if (!template) {
      throw new Error('ERROR: Template not found.');
    }

    const templateResponse = await get(
      `https://api.gathercontent.com/templates/${template.id}`
    );
    const { related } = await templateResponse.json();

    if (!related) {
      throw new Error('ERROR: Structure not found.');
    }

    const fieldsData = related.structure.groups.reduce((acc, group) => {
      const fields = group.fields.filter(
        (f) => fieldLabelLookup.indexOf(f.label) > -1
      );

      return !fields.length
        ? acc
        : [
            ...acc,
            ...fields.map((fss) => ({
              label: `<${fss.label}>`,
              uuid: fss.uuid,
            })),
          ];
    }, []);

    let envString = `GATHERCONTENT_API_USERNAME=${argv.email}
GATHERCONTENT_API_KEY=${argv.apiKey}
GATHERCONTENT_PROJECT_ID=${argv.projectId}

CONTENT_HERO_IMAGE_FIELD_UUID=<Photo of course>
CONTENT_HOURS_FIELD_UUID=<Hours>
CONTENT_WEEKS_FIELD_UUID=<Weeks>
CONTENT_CREDITS_FIELD_UUID=<Credits>
CONTENT_COURSE_CODE_FIELD_UUID=<Course code>
CONTENT_PREREQUISITES_FIELD_UUID=<Prerequisites>
CONTENT_CORE_REQUISITES_FIELD_UUID=<Core requisites>
CONTENT_COURSE_SUMMARY_FIELD_UUID=<Course summary>
CONTENT_NOTE_FIELD_UUID=<Note>
CONTENT_TAUGHT_BY_FIELD_UUID=<Taught by>
CONTENT_TOTAL_SEATS_FIELD_UUID=<Total seats>
      `;

    fieldsData.map((f) => {
      envString = envString.replace(f.label, f.uuid);
    });

    const missingFields = fieldLabelLookup.filter(
      (label) => !fieldsData.some((fd) => fd.label === `<${label}>`)
    );

    fs.writeFile('.env', envString, () => {
      missingFields.map((mf) => {
        console.log(
          `WARNING: ${mf} is missing. Update the field label in your template to match ${mf}`
        );
      });

      console.log('.env file updated.');
    });
  } catch (e) {
    console.log(e);
  }
})();
