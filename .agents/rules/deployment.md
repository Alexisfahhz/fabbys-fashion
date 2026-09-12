# Deployment Protocol
Every time any change, fix, or feature is implemented on this website, it must immediately be:
1. Validated with `npm run lint` and `npm run build`.
2. Committed to git with a clear, descriptive message.
3. Pushed to `origin master` so that Vercel automatically deploys the latest build to https://fabbys-fashion.vercel.app.
4. Verified that the deployment is live on Vercel.
