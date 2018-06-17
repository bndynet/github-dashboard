# Dashboard for GitHub

![](http://bndynet.github.io/github-dashboard/images/gh-dashboard.png)

## Start Application

- `npm install `
- `npm start`
- **http://localhost:8080** // use **githubUser** in **src/app-config.json**
- **http://localhost:8008/?gu=[githubuser]**  // overwrite **githubUser**


## Development

### react-chartjs-2

**Custom size**

> In order for Chart.js to obey the custom size you need to set **maintainAspectRatio** to **false**, example:

```html
<Bar data={data}
     width={100}
     height={50}
     options={{ maintainAspectRatio: false }} />
```