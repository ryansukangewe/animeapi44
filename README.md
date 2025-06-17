# Wajik Anime API - Cloudflare Workers

Anime API yang berjalan di Cloudflare Workers dengan performa tinggi dan global distribution.

## Quick Deploy

1. **Fork/Clone repository ini**
2. **Connect ke Cloudflare Pages**:
   - Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pilih "Pages" > "Create a project"
   - Connect repository GitHub ini
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy!

## Features

- 🚀 **High Performance**: Berjalan di Cloudflare Edge Network
- 🌍 **Global Distribution**: Response cepat dari seluruh dunia
- 💰 **Cost Effective**: Gratis untuk 100,000 requests/hari
- 🔒 **Secure**: Built-in DDoS protection dan security features
- ⚡ **Fast Cold Start**: Instant startup tanpa server warming

## Supported Sources

- **Otakudesu**: Anime streaming dan download
- **Samehadaku**: Anime streaming dan download

## API Endpoints

### Base URL
\`\`\`
https://your-worker.pages.dev
\`\`\`

### Main Routes
- `GET /` - Homepage dengan dokumentasi
- `GET /view-data` - Informasi API dan sources

### Otakudesu Routes
- `GET /otakudesu/home` - Homepage anime
- `GET /otakudesu/schedule` - Jadwal rilis
- `GET /otakudesu/anime` - Semua anime
- `GET /otakudesu/genres` - Semua genre
- `GET /otakudesu/ongoing?page=1` - Anime ongoing
- `GET /otakudesu/completed?page=1` - Anime completed
- `GET /otakudesu/search?q=naruto` - Pencarian anime
- `GET /otakudesu/genres/{genreId}?page=1` - Anime by genre
- `GET /otakudesu/anime/{animeId}` - Detail anime
- `GET /otakudesu/episode/{episodeId}` - Detail episode
- `GET /otakudesu/server/{serverId}` - Streaming server
- `GET /otakudesu/batch/{batchId}` - Batch download

### Samehadaku Routes
- `GET /samehadaku/home` - Homepage anime
- `GET /samehadaku/schedule` - Jadwal rilis
- `GET /samehadaku/anime` - Semua anime
- `GET /samehadaku/genres` - Semua genre
- `GET /samehadaku/recent?page=1` - Episode terbaru
- `GET /samehadaku/ongoing?page=1&order=title` - Anime ongoing
- `GET /samehadaku/completed?page=1&order=title` - Anime completed
- `GET /samehadaku/popular?page=1` - Anime populer
- `GET /samehadaku/movies?page=1` - Anime movie
- `GET /samehadaku/batch?page=1` - Batch download
- `GET /samehadaku/search?q=naruto&page=1` - Pencarian anime
- `GET /samehadaku/genres/{genreId}?page=1` - Anime by genre
- `GET /samehadaku/anime/{animeId}` - Detail anime
- `GET /samehadaku/episode/{episodeId}` - Detail episode
- `GET /samehadaku/server/{serverId}` - Streaming server
- `GET /samehadaku/batch/{batchId}` - Batch download

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Deploy to Cloudflare
npm run deploy
\`\`\`

## License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/wajik45/wajik-anime-api/issues)
- ☕ **Donate**: [Saweria](https://saweria.co/wajik45)

---

Created with ❤️ by [wajik45](https://github.com/wajik45)
