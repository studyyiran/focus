import React, { useEffect, useState } from "react";

export const TaiTan = () => {
  const [level, setLevel] = useState(0);
  const [damage, setDamage] = useState(0);
  const [hp, setHp] = useState(0);

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
      setHp(Math.floor(getRandom(100 * level)));
    }
  }, [level]);

  const attack = (max: number) => {
    let d : number;
    const random = getRandom();
    if (random > 0.9) {
      d = 5 * max;
    } else {
      d = Math.floor(max * random);
    }
    setDamage(d);
    setHp(hp => hp - d)
  };

  return (
    <div>
      <div>level: {level}</div>
      <div>hp: {hp}</div>
      <div>
        last attack damage: {damage} {damage > 40 ? "暴击!!!" : ""}
      </div>
      <div onClick={attack.bind({}, 10)}>Im Boss</div>
      <div>我是勇士</div>
    </div>
  );
};
