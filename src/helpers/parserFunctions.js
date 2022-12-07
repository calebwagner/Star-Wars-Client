export const parsedSubjectUrls = (url) => {
    let ids = []
    url.forEach(url =>  ids.push(parseUrl(url)));
    return ids
  }

  export function parseUrl(url) {
    const matches = url.match(/[^/]+/g);
    const matchId = parseInt(matches.slice(-1)[0])
    return matchId;
  }