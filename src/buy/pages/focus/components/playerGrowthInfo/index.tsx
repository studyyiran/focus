import React, {useContext} from "react";
import './index.less';
import {Progress} from '../progress'
import {UserSunny} from "../sunny";
import {UserSunnyContext} from "../../context/sunny";

interface IRenderPlayerGrowthInfo {
  score: Number
}

export const PlayerGrowthInfo: React.FC<IRenderPlayerGrowthInfo> =  ({score}) => {

  const userSunnyContext = useContext(UserSunnyContext);
  const { UserSunnyContextValue} = userSunnyContext;
  const { userSunny } = UserSunnyContextValue;

  const config = [
    {
      min: 0,
      max: 5,
      name: '绿毛虫',
      attr: '草',
      content: '食欲: 上到tree奖励提升20%',
      icon: require('./res/lvmaochong.png')
    },
    {
      min: 5,
      max: 100,
      attr: '草',
      content: '化蛹成蝶: 每次连续完成学习+5点score',
      name: '铁甲蛹',
      icon: require('./res/tiejiayong.png')
    },
    {
      min: 100,
      max: 200,
      attr: '草',
      content: '太阳光线: 连续登陆多获得20点阳光',
      name: '巴大蝴',
      icon: require('./res/badahu.png')
    }
  ]

  const PokemonInfo = ({level, hide}: any) => {
    if (config[level]) {
      const {icon, name, max, attr, content} = config[level]
      const zhiye = '学习者'
      return <div className="pokemon-info">
        <div className="player-img-container">
          <img src={icon} />
        </div>
        <div className="info">
          <div className="user-info-container">
            <img src={require('./res/icon_1.png')}/>
            <div className="user-info">
              <span>studyyiran · {zhiye}</span>
              <span>{level + 1}级{name} · {hide ? '???' : attr} </span>
              <span>{content}</span>
            </div>
          </div>
          <div>
            <img src={require("./res/icon_2.png")}/>
            <Progress current={userSunny && userSunny.sunnyCount} max={1000}/>
            {/*<UserSunny />*/}
          </div>
          <div>
            <img src={require("./res/icon_3.png")}/>
            <Progress current={Number(score)} max={max} />
          </div>

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
    <div className="pokemon-container">
      <PokemonInfo level={currentLevelIndex} />
      {/*<span>=></span>*/}
      {/*<PokemonInfo level={currentLevelIndex+1} hide={true}></PokemonInfo>*/}
    </div>

  </section>
}

