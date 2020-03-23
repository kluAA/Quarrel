const COLORS = [
    "red",
    "green",
    "blue",
    "black",
    "orange",
    "pink",
    "brown"
]

const randomColor = () => {
    let idx = Math.floor(Math.random() * COLORS.length)
    return COLORS[idx];
}

module.exports = randomColor;