let input = `Time:        56     71     79     99
Distance:   334   1135   1350   2430`



//d=(t-h)*h

// const [times, distances] = input.split(/[\n\r]+/g).map(x => x.split(/\s+/g).slice(1).map(Number)) //part1
const [times, distances] = input.split(/[\n\r]+/g).map(x => x.split(/\s+/g).slice(1).join('')).map(Number).map(i=>[i])


s=1

for(i=0;i<times.length;i++) {
  let nb = 0
  const time = times[i]
  for( h=0;h<=time;h++) {
    const d = (time-h)*h
    if (d > distances[i]) {
      nb++
    }
  }
  console.log(i, nb)

  s*=nb
}

console.log(s)
