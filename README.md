# coverart-finder

<p align="center">
  <a href="https://sonarcloud.io/summary/overall?id=jbeaulieu_coverart-finder" alt="Quality Gate">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=jbeaulieu_coverart-finder&metric=alert_status" />
  </a>
  <a href="https://sonarcloud.io/summary/overall?id=jbeaulieu_coverart-finder" alt="Code Coverage">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=jbeaulieu_coverart-finder&metric=coverage" />
  </a>
  <img src="https://img.shields.io/github/languages/top/jbeaulieu/coverart-finder?style=flat" />
  <img src="https://img.shields.io/github/license/jbeaulieu/coverart-finder?style=flat" />
</p>

Download album cover art from iTunes and Deezer, to use in your local music library.

Try out the pre-release version: [Coverart-Finder on Render](https://coverart-finder.onrender.com/)

> [!NOTE]  
> coverart-finder is still in very early development. Basic searching and downloading functionality is stable, but no promises are made for availability, or timely updates if Apple suddenly decides to change their API.

## Inspiration

I have a large digital music collection amassed over years of buying old CDs (and several years of working as a DJ at my college radio station). But what do you do when you're trying to find the right album art after ripping a disc? Google images is unreliable at best, so I resorted to looking albums up on iTunes, Deezer, Spotify, and right-clicking then "save-as" on the album covers they had there. Tedious, but doable. But why suffer through the repetitiveness of finding the right cover, sizing it correctly, setting the right jpeg compression, when I could make a web tool that does all of that for you?

## Features

- Search for album cover art by artist and album name
- Resolution selection
- Alert when selected resolution exceeds what is available (most iTunes album artwork caps out around 1500-3000px square)

## Supported music providers

- iTunes/Apple Music
- Deezer (experimental, coming soon)

## CI

Unit testing is configured with [vitest](https://vitest.dev). Coverage info is supplied to [sonarcloud](https://sonarcloud.io/summary/overall?id=jbeaulieu_coverart-finder) for PR quality gates and build analysis.

## DIY

If you want to contribute a new feature (thanks!) or just want to run coverart-finder locally, getting started is easy:

1. Clone the repo
2. Create a `.env` in the project root with your environment variables. See `.env.example` for starters.
3. `yarn install && yarn dev`
4. covertart-finder should be accessible on port 5173
