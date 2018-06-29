export const environment = {
  production: true,
  api: {
    target: 'http://ec2-13-232-117-193.ap-south-1.compute.amazonaws.com:8080/khabri-web-app/khabri',
    "secure": false,
    "pathRewrite": {
      "api": ""
    },
    "logLevel": "debug",
    "changeOrigin": false
  }
};
