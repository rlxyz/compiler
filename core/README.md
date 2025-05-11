# REFLECTIONS

A first-of-its-kind generative photography NFT project that harnesses the serendipity of on-chain mechanics to compose 1,111 unique one-of-a-kind NFTs.

## Project Architecture

This project consists of three main components:

1. **Core Library (`@rlxyz/compiler`)**
   - Generative art compilation engine
   - Boolean logic handling for trait combinations
   - Metadata generation and rarity calculation

2. **Client Application (`@rhapsodylabs/project-reflection-client`)**
   - Next.js-based frontend
   - React Three Fiber for 3D visualizations
   - Responsive design with Tailwind CSS

3. **Server (`@rlxyz/reflection-server`)**
   - Express-based API
   - Storage service integration (S3/Pinata)
   - Collection generation and management

## Technical Stack

### Frontend
- Next.js (React framework)
- React Three Fiber (3D rendering)
- Tailwind CSS (styling)
- Framer Motion (animations)

### Backend
- Express.js (API server)
- Node.js (runtime)
- Canvas API (image generation)

### Storage
- AWS S3 / Digital Ocean Spaces
- IPFS via Pinata

### Development
- TypeScript
- Yarn package manager
- GitHub Actions (CI/CD)

## Key Features

- **Generative Photography**: Combines traditional photography with generative algorithms
- **On-chain Mechanics**: Uses blockchain randomness for unique compositions
- **Layered Composition**: Multi-layered image generation with weighted traits
- **Rarity System**: Sophisticated rarity calculation for each trait and NFT
- **Metadata Generation**: Automatic creation of NFT metadata
- **Cloud Storage Integration**: Flexible storage options (S3/IPFS)

## Getting Started

### Prerequisites

- Node.js 16.16.0 (use nvm for version management)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rhapsodylabs/project-REFLECTION.git
cd project-REFLECTION
```

2. Set up environment variables:
```bash
# Copy example environment files
cp client/.envrc.example client/.envrc
cp server/.envrc.example server/.envrc
# Edit the files with your configuration
```

3. Install dependencies for each component:
```bash
# Core library
cd core
yarn install

# Client
cd ../client
yarn install

# Server
cd ../server
yarn install
```

## Development

### Core Library

```bash
cd core
yarn build        # Build the library
yarn dev:gen      # Generate test images
yarn dev:api      # Run development API
```

### Client

```bash
cd client
yarn dev          # Start Next.js development server
yarn build        # Build for production
yarn start        # Start production server
```

### Server

```bash
cd server
yarn dev:api      # Start API development server
yarn dev:watcher  # Start blockchain watcher
```

## Deployment

The project is designed to be deployed on Vercel (client) and a Node.js hosting service (server).

```bash
# Deploy client to Vercel
cd client
yarn build
vercel deploy

# Deploy server
cd server
yarn build
yarn start:api
```

## Project Structure

- `/core/` - Generative art compiler library
  - `/src/` - Source code
    - `/utils/` - Utility functions and types
    - `/x/` - Core components (App, Collection, etc.)
  - `/build/` - Compiled output

- `/client/` - Next.js frontend
  - `/components/` - React components
    - `/Dom/` - DOM-based components
  - `/pages/` - Next.js pages
  - `/styles/` - CSS and styling
  - `/utils/` - Utility functions

- `/server/` - Express backend
  - `/src/` - Source code
    - `/storage/` - Storage service implementations
  - `/build/` - Compiled output

## Architecture Details

### Image Generation Process

1. Layer configurations define the possible traits and their weights
2. The compiler selects traits based on weighted randomness and boolean logic
3. Canvas API composes the final image from selected layers
4. Metadata is generated with trait information and rarity scores
5. Images and metadata are stored in S3/IPFS

### Storage Strategy

The system supports multiple storage backends:
- S3/Digital Ocean Spaces for development and high-performance serving
- IPFS via Pinata for decentralized, permanent storage

