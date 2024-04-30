import data from "./db.json" assert {type: "json"};
import { writeFileSync } from "fs";

const MAX_IMAGE = 5
const MAX_SIZES = 4
const SIZES = [67, 90, 116, 140]
const ref = data.locations[0];


let new_locations = [];
let new_assets = []


const getRandomImagePath = () => {
  const id = Math.floor(Math.random() * MAX_IMAGE + 1);
  return id
};
const getSuffledImages = () => {
  const _arr = Array(MAX_IMAGE).fill(0).map((_v, index) => `/images/${index + 1}.webp`)
  return _arr.map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
}

const getRandomSizes = () => {

  const availableSizes = Math.floor(Math.random() * 4 + 1)

  return SIZES.slice(0, availableSizes)
}
for (let location of data.locations) {
  const mainImage = `/images/${getRandomImagePath()}.webp`
  const images = getSuffledImages()
  images.forEach(image =>
    new_assets.push({ location_id: location.id, url: image })
  )
  location.image = mainImage
  location.sizes = getRandomSizes()
  new_locations.push(location)
}

const new_data = {
  locations: new_locations,
  assets: new_assets
}

// console.log(new_data)

writeFileSync('./db.json', JSON.stringify(new_data, null, 4))
