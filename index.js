function createFish() {
  console.log("Creating fish");
  const fishImages = [
    "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/24079/fish-coloured-clipart-xl.png",
    "https://www.clker.com/cliparts/r/I/4/X/y/m/light-blue-fish-md.png",
    "https://www.clker.com/cliparts/I/i/Y/d/e/q/pink-fish-bubbles-hi.png",
    "https://www.clker.com/cliparts/f/U/o/0/b/y/purple-fish-hi.png",
  ];
  const randomIndex = Math.floor(Math.random() * fishImages.length);
  const fishImage = fishImages[randomIndex];

  const fish = document.createElement("img");
  fish.src = fishImage;
  fish.classList.add("fish");

  const isLeftSide = Math.random() < 0.5;
  if (isLeftSide) {
    fish.style.left = `-${fish.width}px`;
    fish.style.transform = "scaleX(-1)";
  } else {
    fish.style.left = `${window.innerWidth}px`;
  }

  fish.style.top = `${Math.random() * window.innerHeight}px`;
  document.getElementById("aquarium").appendChild(fish);

  const speedX =
    (Math.random() + 0.5) * Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  const speedY = (Math.random() - 0.5) * 2;
  let newY = parseFloat(fish.style.top);

  function moveFish() {
    const rect = fish.getBoundingClientRect();
    const newX = isLeftSide ? rect.left + speedX : rect.left - speedX;
    const deltaY = (Math.random() - 0.5) * 10 + speedY;
    newY += deltaY;

    if (isLeftSide && newX > window.innerWidth) {
      fish.remove();
      return;
    } else if (!isLeftSide && newX < -rect.width) {
      fish.remove();
      return;
    }

    fish.style.left = `${newX}px`;
    fish.style.transform = isLeftSide ? "scaleX(-1)" : "scaleX(1)";

    if (newY > 0 && newY < window.innerHeight - rect.height) {
      fish.style.top = `${newY}px`;
    }

    requestAnimationFrame(moveFish);
  }

  requestAnimationFrame(moveFish);
}

function createFishIfNeeded() {
  const fishCount = document.getElementsByClassName("fish").length;
  if (fishCount < 10) {
    createFish();
  }
  requestAnimationFrame(createFishIfNeeded);
}

requestAnimationFrame(createFishIfNeeded);

createFish();
