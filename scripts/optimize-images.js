import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const categories = ['office', 'residential'];

async function optimizeImages() {
    for (const category of categories) {
        const dir = path.join(publicDir, category);
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir);

        for (const file of files) {
            // Find original images (jpg/png) that aren't already processed
            if (file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('.small') && !file.includes('.webp')) {
                const filePath = path.join(dir, file);
                const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                const smallWebpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.small.webp');

                console.log(`Optimizing: ${file}`);

                try {
                    // 1. Generate Main WebP
                    if (!fs.existsSync(webpPath)) {
                        await sharp(filePath)
                            .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
                            .webp({ quality: 80 })
                            .toFile(webpPath);
                    }

                    // 2. Generate Small WebP (Placeholder)
                    // Always generate if missing
                    if (!fs.existsSync(smallWebpPath)) {
                        await sharp(filePath)
                            .resize(20, null, { fit: 'inside' })
                            .webp({ quality: 20 })
                            .toFile(smallWebpPath);
                    }

                    console.log(`Processed: ${path.basename(webpPath)} & ${path.basename(smallWebpPath)}`);
                } catch (err) {
                    console.error(`Error converting ${file}:`, err);
                }
            }
        }
    }
}

optimizeImages();
