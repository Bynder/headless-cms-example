function mapCourseContentToEnv(data) {
  return {
    seats: data[process.env.CONTENT_TOTAL_SEATS_FIELD_UUID] || null,
    hours: data[process.env.CONTENT_HOURS_FIELD_UUID] || null,
    weeks: data[process.env.CONTENT_WEEKS_FIELD_UUID] || null,
    credits: data[process.env.CONTENT_CREDITS_FIELD_UUID] || null,
    courseCode: data[process.env.CONTENT_COURSE_CODE_FIELD_UUID] || null,
    prerequisites: data[process.env.CONTENT_PREREQUISITES_FIELD_UUID] || null,
    coreRequisites:
      data[process.env.CONTENT_CORE_REQUISITES_FIELD_UUID] || null,
    courseSummary: data[process.env.CONTENT_COURSE_SUMMARY_FIELD_UUID] || null,
    note: data[process.env.CONTENT_NOTE_FIELD_UUID] || null,
    taughtBy: data[process.env.CONTENT_TAUGHT_BY_FIELD_UUID] || null,
    heroImageUrl:
      (data[process.env.CONTENT_HERO_IMAGE_FIELD_UUID] &&
        data[process.env.CONTENT_HERO_IMAGE_FIELD_UUID][0]?.url) ||
      null,
  };
}

export { mapCourseContentToEnv };
