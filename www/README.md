<a href="https://novela.narative.co" target="_blank">
<img src="https://raw.githubusercontent.com/narative/gatsby-theme-novela-example/master/assets/gatsby-theme-novela-hero.jpg" alt="gatsby-novela-theme hero image" />
</a>

<br/>

# Novela — A Gatsby theme by Narative

With minimal styling and maximum features — including multiple homepage layouts, built-in social sharing and dark mode — Novela makes it easy to start publishing beautiful articles and stories with Gatsby.

Novela is built by the team at [Narative](https://www.narative.co), and built for everyone that loves the web.

<div>
<a href="https://novela.narative.co" target="_blank">
<img src="https://raw.githubusercontent.com/narative/gatsby-theme-novela-example/master/assets/gatsby-theme-novela-cta-demo.jpg" alt="gatsby-novela-theme live demo" width="295px" />
</a>
</div>

<div>
<a href="https://www.narative.co/design/open/novela" target="_blank">
<img src="https://raw.githubusercontent.com/narative/gatsby-theme-novela-example/master/assets/gatsby-theme-novela-cta-figma.jpg" alt="gatsby-novela-theme figma link" width="295px" />
</a>
</div>

[Theme repository](https://github.com/narative/gatsby-theme-novela)

## An example repositroy showing how to use gatsby-theme-novela

```sh
git clone git@github.com:narative/gatsby-theme-novela-example.git

cd gatsby-theme-novela-example

yarn

yarn develop

yarn build
```

## Configuring Novela Theme Plugin

You can customize the path of the generated site or where you store your authors and posts.
This can be done through the `options` key in the `gatsby-theme-novela` object.

| Option         |     Default     |
| -------------- | :-------------: |
| contentAuthors |  content/posts  |
| contentPosts   | content/authors |
| basePath       |        /        |

This is the default and recommended configuration

```
  my-gatsby-site
  └── content
    ├── authors
    └── posts
```

And then configuring your `gatsby-config.js` plugins to include the theme and content sources:

```js
// gatsby-config.js
plugins: [
  {
    resolve: "gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      basePath: "/",
    },
  },
];
```

## Adding Authors & Posts

Once you've setup the `gatsby-theme-novela` in your plugins you can start creating your first posts. In order to create a post you also need authors.

### Author

| Key      | Required |  Type   |
| -------- | :------: | :-----: |
| name     | required | String  |
| bio      | required | String  |
| avatar   | required |  Image  |
| featured | optional | Boolean |

```yml
- name: Dennis Brotzky
  bio: |
    Written by Dennis Brotzky who lives and works in Vancouver building useful things.
    You should follow him on Twitter.
  avatar: ./avatars/dennis-brotzky.jpg
  featured: true

- name: Thiago Costa
  bio: |
    Written by Thiago Costa who lives and works in Montreal building useful things.
    You should follow him on Twitter.
  avatar: ./avatars/thiago-costa.png
```

\*At least one Author must have `featured: true`. This author will have their Name, Bio, and Avatar visible on the home pag

### Post

| Key     | Required |    Type    |          Description          |
| ------- | :------: | :--------: | :---------------------------: |
| title   | required |   String   |      Also used for slug       |
| author  | required | String Ref | _Must match a defined Author_ |
| date    | required |    Date    |       YYYY-MM-DD format       |
| hero    | required |   Image    |                               |
| excerpt | required |   String   |      140 character limit      |

```yml
---
title: Why Narative loves Gatsby
author: Dennis Brotzky
date: 2019-04-27
hero: ./images/narative-gatsby-hero.jpg
excerpt: This is a love story about Narative and Gatsby
---
# And then under the heading YML you can insert any MDX you like
# like headings, links, code, images, etc
# This will show up in the body of your post
# ...
```

As you can see, Novela allows you to write posts in [MDX](https://mdxjs.com/). This gives you the ability
to render Markdown, Code, JSX, images and more within your post body.

### Recommended folder pattern for posts

```
  my-gatsby-site
  └── content
    └── posts
      └── 2020-01-01-my-first-post
        ├── index.mdx
        └── images
```

From here, you can begin populating `index.mx`

### Configuring siteMetadata

In order to configure the theme to properly genreate the pages and meta tags you must certain
keys in your `siteMetadata`.
The ones that are special for this theme are `hero.heading`, `hero.maxWidth`, and `social`.

| Key           | Required |     Type      |
| ------------- | :------: | :-----------: |
| title         | required |    string     |
| name          | required |    string     |
| siteUrl       | required |    string     |
| description   | required |    string     |
| hero.heading  | required |    string     |
| hero.maxWidth | optional |    number     |
| social        | optional | [{name, url}] |

#### Example configuration

```js
module.exports = {
  /**
   * siteMetadata Used throughout the theme to generate the right SEO links,
   * social links, and homepage hero
   **/
  siteMetadata: {
    title: `Novela by Narative`,
    name: `Narative`,
    siteUrl: `https://novela.narative.co`,
    description: `This is my description that will be used in the meta tags and important for search results`,

    // important to set the main text that appears in the hero
    hero: {
      heading: `Perspectives on technology, design and business from the team at Narative.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/narative`,
      },
      {
        name: `github`,
        url: `https://github.com/narative`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/narative.co/`,
      },
      {
        name: `dribbble`,
        url: `https://dribbble.com/narativestudio`,
      },
    ],
  },
  plugins: [
    /**
     * In order for the theme to know where you are storing your content
     * you must pass in where the posts and authors are located.
     * basePath will define where the theme is served from
     */
    {
      resolve: "gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};
```

## Customizing Novela

### Styles

If you want to customize Novela it's possible thanks to how Gatsby themes work. To customize the styling
you must create a folder, `gatsby-plugin-theme-ui` and apply your Theme UI overrides there.

```
  my-gatsby-site
  └── src
    └── gatsby-plugin-theme-ui
      └── index.js
```

To preserve the default styles make sure you import the `theme` from `gatsby-theme-novela`.
Here you are able to override the styles for colors, fonts, prism, components, and more.

### Components

[Component Shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/) allows users to override a component in order to customize its rendering.

> Gatsby Themes introduce a concept called Component Shadowing. This feature allows users to override a component in order to customize its rendering.

> With other theming approaches it’s impossible to change aspects of a theme if a configuration option hasn’t been built in. Component Shadowing provides a powerful escape hatch to let users make quick, one-off changes that might not make sense to support in the theme itself.

> Component Shadowing let’s you replace the theme’s original file, gatsby-theme-blog/src/components/bio.js, with your own to implement any changes you need.

To learn more about Component Shadowing we recommend reading [Gatsby's blog post about it](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/) and the [official documentation](https://www.gatsbyjs.org/docs/theme-api/#shadowing).
