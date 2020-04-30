import React from "react";
import './index.less';

interface IRenderPlayerGrowthInfo {
  score: Number
}

export const PlayerGrowthInfo: React.FC<IRenderPlayerGrowthInfo> =  ({score}) => {
  const config = [
    {
      min: 0,
      max: 20,
      name: '绿毛虫',
      icon: require('./res/badahu.png')
    },
    {
      min: 20,
      max: 100,
      name: '铁甲蛹',
      icon: require('./res/tiejiayong.png')
    },
    {
      min: 100,
      max: 200,
      name: '巴大蝴',
      icon: require('./res/badahu.png')
    }
  ]

  const PokemonInfo = ({level, hide}: any) => {
    if (config[level]) {
      const {icon, name, max} = config[level]
      return <div className="pokemon-info">
        <img src={icon} />
        <div className="info">
          <span>名称:{hide ? '???' : name}</span>
          <span>属性:{hide ? '???' : '草'}</span>
          <span>距离下一进化Exp:{hide ? '???' : max - Number(score)}</span>
        </div>
      </div>
    } else {
      return <div>level ? 1 : 0</div>
    }
  }

  const findCurrent = () => {
    return config.findIndex(({min, max}) => {
      return Number(score) >= min && Number(score) < max
    })
  }


  const currentLevelIndex = findCurrent();
  return <section className={"player-growth-info"}>
    <h2>人物状态</h2>
    <span>Exp: {score}</span>
    <div className="pokemon-container">
      <PokemonInfo level={currentLevelIndex}></PokemonInfo>
      <span>=></span>
      <PokemonInfo level={currentLevelIndex+1} hide={true}></PokemonInfo>
    </div>

  </section>
}

