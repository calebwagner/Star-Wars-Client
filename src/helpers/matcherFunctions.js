export const matchPersonToStarships = (starships, starshipsFlown) => {

    const starshipsMap = new Map();
    for (const starship of starships) {
      const starshipUrl = starship.url
      let parsedStarshipId = /(?<=starships\/)\d*/.exec(starshipUrl)
      let match = parsedStarshipId ? parsedStarshipId[0] : null;
      starshipsMap.set(parseInt(match), starship);
    }

    const characterStarshipMap = new Map();
    for (const  starshipFlown of starshipsFlown) {
      characterStarshipMap.set(starshipFlown, starshipsFlown);
    }

    const result = [];
    for (const [id, obj] of starshipsMap) {
      if (characterStarshipMap.has(id)) {
        result.push(obj.name);
      }
    }

    return result;
}

export const matchPersonToFilms = (allFilms, characterFilms) => {

    const allFilmsMap = new Map();
    for (const film of allFilms) {
      const filmId = film.episode_id
      allFilmsMap.set(parseInt(filmId), film);
    }

    const characterFilmsMap = new Map();
    for (const  starshipFlownId of characterFilms) {
      characterFilmsMap.set(parseInt(starshipFlownId), characterFilms);
    }

    const result = [];
    for (const [id, obj] of allFilmsMap) {
      if (characterFilmsMap.has(id)) {
        result.push({
          title: obj.title,
          episode: obj.episode_id
        });
      }
    }

    return result;
}