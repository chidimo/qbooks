# Flimsy books

[![Netlify Status](https://api.netlify.com/api/v1/badges/31284c61-f835-430c-b519-040a6810e97e/deploy-status)](https://app.netlify.com/sites/flimsy-books/deploys)

A fictitious books company

Github URL: <https://github.com/chidimo/qbooks>

Live application: <https://flimsy-books.netlify.app/>

## How to run this app locally

1. Make sure you have `NodeJS` (16+) installed and yarn.
1. Clone the repo to your local machine
1. Run `yarn` to install project dependencies
1. Run `yarn start` to start the project.
1. Visit <http://localhost:3000/> on your browser to see the project running

## Assumptions

1. I assumed the `where` expression of the `GraphQL` server followed the same specification as that shown here <https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query.html#whereexp>.
1. I assumed the search functionality should be case-insensitive and should return books for which the search term matches either of the following field values: title, author name, genre name, and tag name.

## Requirements not covered

1. I didn't implement the click to scroll functionality of the featured books carousel. Though it's not expressly stated, I think its nice to have.

## Issues faced

1. I faced issues with filtering on the `GraphQL` server. I needed filtering for the search functionality but it seems the where expression of the supplied server didn't follow the specifications detailed in the Hasura docs.

For example when I tried to do an `equality` check I go an error.

Here's a screenshots of an example from the Hasura docs

![Hasura `_eq` example](/images/hasura_eq.png)

Here's response I received when trying to use the same syntax on the provided server.

![Quidax server](/images//quidax-server-error.png)

It is likely that there's a different syntax I have to use which I'm currently unaware of. I would very much like to learn about it.

The impact of the limitation on my end is that I cannot do case-insensitive search or partial search. Every search term has to be very exact, which doesn't make much sense in the context of search.

## Feedback

1. This was a challenging and good exercise overall.
1. The `where` clause syntax is something I've never worked with before. But once I approached it, it looks very similar to the syntax used by MongoDB compass. Perhaps a link and an example would help speed things up for the developer.
