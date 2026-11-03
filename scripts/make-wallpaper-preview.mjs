import sharp from "sharp";

await sharp("public/ojuny-wallpaper.png")
  .resize(640, 360, { fit: "cover" })
  .webp({ quality: 84 })
  .toFile("public/ojuny-wallpaper-preview.webp");

console.log("Wrote public/ojuny-wallpaper-preview.webp");
