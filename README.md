# Flimsy books

[![Netlify Status](https://api.netlify.com/api/v1/badges/31284c61-f835-430c-b519-040a6810e97e/deploy-status)](https://app.netlify.com/sites/flimsy-books/deploys)

A fictitious books company

1. Github URL: <https://github.com/chidimo/qbooks>
1. Live application: <https://flimsy-books.netlify.app/>
1. `GraphQL` playground <https://quidax-feec-graphql.herokuapp.com/graphql>

## How to run this app locally

This app was created with [Create React App](https://create-react-app.dev/). Follow the instructions below to get it up and running on your machine.

1. Make sure you have `NodeJS` (16+) and yarn installed.
1. Clone the repo to your local machine
1. Run `yarn` to install project dependencies
1. Once installation is complete, run `yarn start` to start the project.
1. Visit <http://localhost:3000/> on your browser to see the project running

## Assumptions

1. I assumed the `where` expression of the provided `GraphQL` server followed the same specification as that documented on the Hasura docs: <https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query.html#whereexp>.
1. I assumed the search functionality should be case-insensitive and should return books for which the search term matches either of the following field values: `title`, `author name`, `genre name`, and `tag name`.

## Requirements not covered

N/A

## Issues faced

1. I faced issues with running filter on the books query. I needed filtering for the search functionality but it seems the where expression of the supplied server didn't follow the specifications detailed in the Hasura docs.

For example when I tried to do an `equality` check using the syntax from the Hasura docs I got an error.

Here's a screenshots of an example from the Hasura docs

![Hasura `_eq` example](/images/hasura_eq.png)

Here's the response I received when I tried to use the same syntax on the provided server.

![Quidax server](/images//quidax-server-error.png)

It is likely that there's a different syntax I have to use which I'm currently unaware of. I would very much like to learn about it.

The impact of this limitation on my part is that I cannot do case-insensitive or partial keyword search. Every search term has to be very exact, which doesn't make much sense in this context.

I will update the project as soon as I learn how to go about it.

## Feedback

1. This was a challenging and good exercise overall, especially because CSS frameworks were forbidden. On God I missed tailwindcss. Lol.
1. The `where` clause syntax is something I've never worked with before. But once I approached it, it looks very similar to the syntax used by MongoDB compass. I would have appreciated a link to some documentation or examples to help speed things up a little.
