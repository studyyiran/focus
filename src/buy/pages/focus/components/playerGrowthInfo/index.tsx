import React from "react";
import './index.less';
import {Progress} from './component/progress'

interface IRenderPlayerGrowthInfo {
  score: Number
}

export const PlayerGrowthInfo: React.FC<IRenderPlayerGrowthInfo> =  ({score}) => {
  const config = [
    {
      min: 0,
      max: 5,
      name: '绿毛虫',
      attr: '草',
      content: '《食欲》上到tree奖励提升20%',
      icon: require('./res/lvmaochong.png')
    },
    {
      min: 5,
      max: 100,
      attr: '草',
      content: '《化蛹成蝶》每次连续完成学习+5点score',
      name: '铁甲蛹',
      icon: require('./res/tiejiayong.png')
    },
    {
      min: 100,
      max: 200,
      attr: '草',
      content: '《太阳光线》连续登陆多获得20点阳光',
      name: '巴大蝴',
      icon: require('./res/badahu.png')
    }
  ]

  const PokemonInfo = ({level, hide}: any) => {
    if (config[level]) {
      const {icon, name, max, attr, content} = config[level]
      return <div className="pokemon-info">
        <img src={icon} />
        <div className="info">
          <span>名称:{hide ? '???' : name}</span>
          <span>属性:{hide ? '???' : attr}</span>
          <span>技能:{content}</span>
          <span>距离下一进化Exp:{hide ? '???' : max - Number(score)}</span>
          <Progress current={Number(score)} max={max} />
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
    <br />
    <span>用户职业: 学习者</span>
    <div className="pokemon-container">
      <PokemonInfo level={currentLevelIndex}></PokemonInfo>

      {/*<span>=></span>*/}
      {/*<PokemonInfo level={currentLevelIndex+1} hide={true}></PokemonInfo>*/}
    </div>

  </section>
}

