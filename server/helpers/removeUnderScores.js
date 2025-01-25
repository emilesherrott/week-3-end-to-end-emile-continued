const removeUnderScores = (string) => {
    let array = string.split("_")
    array = array.join(" ")
    return array
}


module.exports = removeUnderScores
