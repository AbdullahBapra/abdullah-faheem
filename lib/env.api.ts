export const projectId = checkValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "SANITY_STUDIO_PROJECT_ID",
  "https://sanity.io"
);

export const dataset: string = checkValue(
  process.env.SANITY_STUDIO_DATASET,
  "SANITY_STUDIO_DATASET",
  "https://sanity.io"
);

export const token = checkValue(
  process.env.SANITY_STUDIO_ACCESS_TOKEN,
  "SANITY_STUDIO_ACCESS_TOKEN",
  "https://sanity.io"
);

export const hookSecret = process.env.SANITY_STUDIO_HOOK_SECRET;
export const mode = process.env.NODE_ENV;

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || "2023-07-21";


// Validate env varaibles
function checkValue<T>(
  value: T | undefined,
  errorMsg: string,
  url?: string
): T {
  if (value === undefined) {
    throw new Error(
      `Missing Environment Variable: ${errorMsg}\n\nVist ${url} to learn how you can generate your own API keys`
    );
  }
  return value;
}
