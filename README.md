# Yareli.net

Next.js app that contains all code related to the yareli.net website.

## Developing

This project uses the `pnpm` package manager. After installing it, you can run

```bash
pnpm i
```

## Building

```bash
# Build the Docker image
docker build -t yareli .

# Run the container, this will make it only listen to localhost.
# If you want to expose this publicly, remove the IP part.
docker run -p 127.0.0.1:5001:5001 --name yareli -d yareli
```
