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
            if (file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('.small') && !file.includes('.webp')) {
                const filePath = path.join(dir, file);
                const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

                console.log(`Optimizing: ${file}`);

                try {
                    await sharp(filePath)
                        .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
                        .webp({ quality: 80 })
                        .toFile(webpPath);

                    console.log(`Created: ${path.basename(webpPath)}`);
                } catch (err) {
                    console.error(`Error converting ${file}:`, err);
                }
            }
        }
    }
}

optimizeImages();
