
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');

async function convertToWebP() {
    const images = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg'];

    for (const image of images) {
        const inputPath = path.join(assetsDir, image);
        // hero-1.jpg -> hero-1.webp
        const outputPath = path.join(assetsDir, image.replace('.jpg', '.webp'));

        if (fs.existsSync(inputPath)) {
            console.log(`Converting ${image} to WebP...`);
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`✓ Created ${path.basename(outputPath)}`);
            } catch (e) {
                console.error(`Error converting ${image}`, e);
            }
        } else {
            console.log(`File not found: ${image}`);
        }
    }
}

convertToWebP().catch(console.error);
