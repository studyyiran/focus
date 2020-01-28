import React, { useEffect, useRef, useState } from "react";
import "./index.less";

export const TaiTan = () => {
  const maxHpRef = useRef(null as any);
  const [level, setLevel] = useState(0);
  const [damage, setDamage] = useState(0);
  const [hp, setHp] = useState(0);
  const [playerAttack, setPlayerAttack] = useState(10)

  const getRandom = (max = 1) => {
    const random = Math.random();
    return max * random;
  };

  useEffect(() => {
    if (hp <= 0) {
      setLevel(l => ++l);
    }
  }, [damage, hp]);

  useEffect(() => {
    if (level > 0) {
      const maxHp = Math.floor(getRandom(100 * level));
      maxHpRef.current = maxHp;
      setHp(maxHp);
      setPlayerAttack(a => a + Math.floor(getRandom(5)))
    }
  }, [level]);

  const attack = (max: number) => {
    let d: number;
    const random = getRandom();
    if (random > 0.9) {
      d = 5 * max;
    } else {
      d = Math.floor(max * random);
    }
    setDamage(d);
    setHp(hp => hp - d);
  };

  const getWidth = () => {
    let percent
    if (maxHpRef && maxHpRef.current) {
      percent = hp / maxHpRef.current
    } else {
      percent = 1
    }
    return {width: 100 * percent + '%'}
  };

  return (
    <div className="taitan-game">
      <div>level: {level}</div>

      <div className="out-hp">
        <div className="inner-hp" style={getWidth()}></div>
        <div className={"hp-value"}>{hp}/{maxHpRef.current}</div>
      </div>
      <div>
        last attack damage: {damage} {damage > 40 ? "暴击!!!" : ""}
      </div>
      <div>attack: {playerAttack}</div>
      <div className="click-range" onClick={attack.bind({}, 10 + level)}></div>
      <div>我是勇士</div>
    </div>
  );
};
