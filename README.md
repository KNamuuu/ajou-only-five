## 웹시설

라이브러리를 최대한 사용하지 말고, 구현할 수 있는 것들은 직접 구현해 보기로 챌린지를 설정

### recoil, redux 등 전역 상태 관리 라이브러리

- react라이브러리에서 기본적으로 제공해주는 context API를 사용하여 구현
- props drilling

예시

```jsx
// userContext.js

import { createContext } from "react";

export const initialUserContext = {
  userId: null,
  nickname: null,
  profile: null,
  disclosure: null,
  lastViewUserId: null,
};

const UserContext = createContext(initialUserContext);

export default UserContext;

// userProvider.jsx

import { useMemo, useState } from "react";
import UserContext, { initialUserContext } from "./userContext.js";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ ...initialUserContext });

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

// useUserContext.js

import { useContext } from "react";
import UserContext from "./userContext";

const useUserContext = () => useContext(UserContext);

export default useUserContext;
```

위의 방법으로 context와 provider를 생성 후 app.js의 route들을 provider로 감싸준다.

이 때, **하위에 있는 provider들은 상위 provider의 context에 접근할 수 없음**에 유의한다.

사용예시

```jsx
// friendListProvider.jsx

const { user } = useUserContext();
...
useEffect(() => {
  if (user.userId !== null) {
    fetchFriendList();
  }
}, [user]);
```

### chart.js

[4, 2, 1, 3, 5] 순으로 배열을 정렬하고, svg태그를 이용하여 차트를 그려냈다.

이 때, count의 수에 유의하여 maxHeight를 정해주고, 각 count에 비례하여 chartBar의 높이를 조정했다.

canvas를 이용하지 않고 svg태그를 채택한 이유

- 픽셀 기반의 canvas보다는 벡터 기반의 svg가 더 유리하다 생각해 svg태그를 사용.
- 또한 canvas는 비교적 고성능 애니메이션이나 동적인 그래픽에서 주로 사용되어 정적인 차트를 그리기에는 svg가 더 맞다고 생각해 svg태그를 사용.

```jsx
// 배열을 정렬하는 로직

export function sortRank(list) {
  list.sort((a, b) => a.ITEM_NUM - b.ITEM_NUM).reverse();
  let [firstValue, ...lists] = list;
  const answer = [firstValue];

  for (let index in lists) {
    const value = lists[index];
    const key = index % 2 ? "push" : "unshift";
    answer[key](value);
  }

  return answer;
}
```

```jsx
// chartBar.jsx

import React from "react";

function ChartBar(props) {
  return (
    <>
      <text x={props.x + props.width / 3.3} y={80} fill={"white"}>
        <tspan>{props.data?.NICKNAME}</tspan>
      </text>

      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        rx={5}
        fill={"#d4d4d4"}
      />

      <text
        x={props.x + props.width / 3.3}
        y={props.y + props.height + 20}
        fill={props.data?.rank === 1 ? "yellow" : "white"}
      >
        {props.data?.ITEM_NUM}
      </text>
    </>
  );
}

export default ChartBar;

// myChart.js

<div className="chart-container">
  <svg
    width={width}
    height={chartHeight}
    viewBox={`0 0 ${width} ${chartHeight}`}
    preserveAspectRatio="xMidYMax meet"
  >
    {countData?.map((el, idx) => {
      const barHeight = barMaxHeight * (el?.ITEM_NUM / maxCount);

      return (
        <ChartBar
          key={el?.NICKNAME}
          x={idx * (barWidth + barMargin) + 5}
          y={chartHeight - barHeight - 20}
          width={barWidth}
          height={barHeight}
          chartHeight={chartHeight}
          data={el}
        />
      );
    })}
  </svg>
</div>
```

### swiper.js

중심점을 기준으로 아치 형태를 그리는 카드들을 만들기 위해 transform함수를 직접 만들어 위치를 조정했다.

```jsx
// transform.js

const ITEM_DISTANCE = 52.8;
const CENTER_ITEM_DISTANCE = 21.12;

export function setTransform(el, xpos, ypos, yAngle) {
  el.style.transform = `translateX(${
    xpos * 1.5 + ITEM_DISTANCE / 2
  }px) translateY(${ypos * 40}px)  rotate(${yAngle}deg)`;
  el.style.zIndex = `${999 - ypos}`;
}

export function target(items, index) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (i === index) setTransform(item, -66, 0, 0);
    else if (i < index)
      setTransform(
        item,
        (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE - 66,
        index - i,
        (360 / items.length) * (i - index)
      );
    else
      setTransform(
        item,
        (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE - 66,
        i - index,
        (360 / items.length) * (i - index)
      );
  }
}
```
