import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as snippet from '@segment/snippet';

const { ANALYTICS_WRITE_KEY = 'ub9Zt2YbWkbMBdSQPUSy5NsPBVHgnDtf', NODE_ENV = 'development' } = process.env;

class MyDocument extends Document {
  renderSnippet() {
    const opts = {
      apiKey: ANALYTICS_WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    };

    if (NODE_ENV === 'development') {
      return snippet.max(opts);
    }

    return snippet.min(opts);
  }

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="ub9Zt2YbWkbMBdSQPUSy5NsPBVHgnDtf";analytics.SNIPPET_VERSION="4.13.2";
                analytics.load("ub9Zt2YbWkbMBdSQPUSy5NsPBVHgnDtf");
                analytics.page();
                }}();`,
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
          <script dangerouslySetInnerHTML={{__html: `

            !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";

                analytics.load("cplS7iC7pSXSDEHD0OBS4MlWyN4IisYI");

                analytics.page();

            }}();

        `}}>

        </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;