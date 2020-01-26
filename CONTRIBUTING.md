# How to Contribute

### Setting Up Your Local Dev Environment

This project uses [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) so you can run the Novela locally with an example site.

```sh
  git clone git@github.com:narative/gatsby-theme-novela.git

  cd gatsby-theme-novela

  yarn
```

Once you've downloaded the repository and installed all the dependencies you can run the project locally.

```sh
  yarn start
```

#### Adding features and modifying the theme

Before making any large changes to Novela please create an issue to discuss the change or a draft PR. Our aim is to keep this project simple to use without too much configuration.

We also deeply value design so any new feature must pass our design review.

#### Fixing typos, syntax errors, and types

We're more than happy with PRs that fix typos, syntax errors, and types. You do not have to create an issue or request a fix to these.

## Commitlint Guidelines

In order for our publishing workflows with Lerna to properly function, we strictly follow our [.commitlintrc.yml](https://github.com/narative/gatsby-theme-novela/blob/master/.commitlintrc.yml); itself based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).

Commit should start with a type and the header shouldn't have more than 72 characters.

### Possible types

- `chore`: Change build process, tooling or dependencies.
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `feat`: Adds a new feature.
- `fix`: Solves a bug.
- `docs`: Adds or alters documentation.
- `style`: Improves formatting, white-space.
- `refactor`: Rewrites code without feature, performance or bug changes.
- `perf`: Improves performance.
- `test`: Adds or modifies tests.
- `revert`: Changes that reverting other changes
