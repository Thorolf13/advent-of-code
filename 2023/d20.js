const input = `&kv -> qb
%px -> qz, tk
%xk -> sv, zv
%rj -> lx, qz
%ks -> fc
%dx -> gt, dr
%lz -> qz, df
%dz -> fr
broadcaster -> cn, xk, rj, gf
%ct -> ks
%hq -> bz
%qv -> cx
&qz -> vk, qm, rj, kv, hq, tk
&jg -> qb
%cf -> sv, tz
&dr -> cn, jz, tq, ks, mr, ct
%mx -> bn
%bv -> sk, kf
%cn -> dr, mq
%vk -> lz
%jd -> qz
&qb -> rx
%tp -> sv, lm
%jz -> ct
%tq -> tj
%bn -> sv, cf
%br -> sk, hc
%gt -> dr, nd
%nd -> dr, nk
&rz -> qb
%lx -> qm, qz
&sk -> qv, kf, rd, qh, jg, gf
%mq -> jz, dr
%rl -> bv, sk
%tz -> sv, ng
%df -> qz, jd
%tk -> hq
&mr -> qb
%gf -> rl, sk
%qm -> nt
&sv -> xk, rz, zv, dz, mx
%hc -> sk, nf
%xp -> br, sk
%bc -> sv, tp
%fc -> dr, tq
%nf -> sk
%cx -> sk, qh
%bz -> vk, qz
%zv -> dz
%kf -> rd
%tj -> dr, dx
%fr -> mx, sv
%ng -> bc, sv
%lm -> sv
%nk -> dr
%nt -> qz, px
%qh -> xp
%rd -> qv`

const input2 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`

const input3 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`

const input4 = `broadcaster -> a, b
%a -> con
%b -> con
&con -> output`


class Module{
  constructor(input){
    const [a,b] = input.split(' -> ')

    if( a.startsWith('&') || a.startsWith('%') ){
      this.type = a.startsWith('%') ? 'FF' : 'CJ'
      this.name = a.slice(1)
    } else{
      this.type = "default"
      this.name = a
    }
    this.dest = b.trim().length ? b.split(', ') : []

    this.inputs = {}
    this.state = false
  }

  registerInput(from){
    this.inputs[from] = false
  }

  generateOutputPulses(value){
    return this.dest.map(d => ({from: this.name, to: d, value}))
  }

  process(value, from){
    
    if( this.type === 'default' ){
      return this.generateOutputPulses(value)
    } else if( this.type === 'FF' ){
      
      if( value === false ){
        this.state = !this.state
        return this.generateOutputPulses(this.state)
      }
    } else if( this.type === 'CJ' ){
      this.inputs[from] = value

      if( Object.values(this.inputs).every(v => v === true) ){
        return this.generateOutputPulses(false)
      } else{
        return this.generateOutputPulses(true)
      }
    }

    return []
  }    
}

(function (input, nbCycles){
const modules = {}
input.split('\n').forEach(l => {
  const m = new Module(l)
  modules[m.name] = m
})

for( const name in modules){
  const m = modules[name]
  m.dest.forEach(d => {
    const module = modules[d]
    if( module ){
      module.registerInput(m.name)
    }
  })
}

function sendSignal(from, to, value){
  const module = modules[to]
  if( module ){
    return module.process(value, from)
  }
  return []
}


let hPulses = 0
let lPulses = 0
// let part2 = -1
for( let i=0 ; i<nbCycles ; i++ ){
  
  const pulses = [{ from: 'button', to: 'broadcaster', value: false}]
  let nbPulsesToRx = 0
  while( pulses.length ){
    const pulse = pulses.shift()
    // if(pulse.to === 'rx'){
    //   nbPulsesToRx++
    // }
    // console.log(pulse.from, (pulse.value ? '-hight-' : '-low-'), '>', pulse.to)
    if( pulse.value === true ){
      hPulses++
    } else{
      lPulses++
    }
    const newPulses = sendSignal(pulse.from, pulse.to, pulse.value)
    pulses.push(...newPulses)
  }

  // if(nbPulsesToRx === 1 && part2 === -1){
  //   part2 = i
  // }
}

console.log(hPulses, lPulses)
console.log(hPulses* lPulses)
// console.log(part2)

})(input, 1000)
