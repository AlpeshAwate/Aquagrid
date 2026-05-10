# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Environment variables configured

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update environment variables:
```env
VITE_API_BASE=https://api.aquagrid.in
VITE_WS_URL=wss://ws.aquagrid.in
VITE_GA_ID=G-XXXXXXXXXX
```

## Build for Production

```bash
# Install dependencies
npm install

# Run linter
npm run lint

# Run tests
npm test

# Build production bundle
npm run build
```

The build output will be in the `dist/` directory.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### Option 3: AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 4: Docker

1. Build Docker image:
```bash
docker build -t aquagrid:latest .
```

2. Run container:
```bash
docker run -p 80:80 aquagrid:latest
```

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test PWA installation on mobile
- [ ] Check service worker registration
- [ ] Verify API endpoints are accessible
- [ ] Test all language translations
- [ ] Check analytics tracking
- [ ] Verify SSL certificate
- [ ] Test offline functionality
- [ ] Check performance metrics (Lighthouse)
- [ ] Verify error tracking is working

## Monitoring

### Performance Monitoring
- Use Google Analytics for user behavior
- Monitor Core Web Vitals
- Track API response times

### Error Tracking
- Implement Sentry or similar service
- Monitor console errors
- Track failed API calls

### Uptime Monitoring
- Use UptimeRobot or Pingdom
- Set up alerts for downtime
- Monitor API availability

## Rollback Procedure

If issues are detected after deployment:

1. Revert to previous version:
```bash
vercel rollback
# or
netlify rollback
```

2. Investigate issues in staging environment

3. Fix and redeploy

## Performance Optimization

### Before Deployment
- Run Lighthouse audit
- Optimize images
- Enable compression
- Minimize bundle size
- Enable caching headers

### CDN Configuration
```
Cache-Control: public, max-age=31536000, immutable  # For assets
Cache-Control: no-cache  # For HTML
```

## Security Headers

Add these headers in your hosting configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Support

For deployment issues, contact: support@aquagrid.in
