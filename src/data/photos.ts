import type { ImageMetadata } from "astro";
import jacaranda from "../assets/photos/jacarandas-in-new-farm-park-brisbane.jpg";
import queenslander from "../assets/photos/queenslander-house-brisbane1.jpg";
import drainMachine from "../assets/photos/plumbers-snake-24689.jpg";
import copperTorch from "../assets/photos/propane-torch-soldering-copper-pipe.jpg";
import lagPoster from "../assets/photos/a-woman-lagging-a-hot-water-tank.jpg";
import type { PhotoKey } from "./site";

// Photos of the world around the business, from Wikimedia Commons. None of them shows this
// business's own team or work; captions say what each one is, credits sit in the footer.
export const photos: Record<PhotoKey, ImageMetadata> = {
  jacaranda,
  queenslander,
  drainMachine,
  copperTorch,
  lagPoster,
};

export const credits = [
  { title: "Jacarandas in New Farm park, Brisbane", creator: "Tatters", licence: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/w/index.php?curid=66786433" },
  { title: "Queenslander House Brisbane1", creator: "Wade Johanson", licence: "CC BY 2.0", page: "https://commons.wikimedia.org/w/index.php?curid=8109205" },
  { title: "Plumbers snake 24689", creator: "Walter Siegmund", licence: "CC BY 2.5", page: "https://commons.wikimedia.org/w/index.php?curid=1258479" },
  { title: "Propane torch soldering copper pipe", creator: "neffk", licence: "CC BY 2.0", page: "https://commons.wikimedia.org/w/index.php?curid=50017388" },
  { title: "A woman lagging a hot-water tank", creator: "Wellcome Collection", licence: "CC BY 4.0", page: "https://commons.wikimedia.org/w/index.php?curid=36014083" },
];
