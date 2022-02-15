# Binance-Future-App

비트코인 선물(Future) 정보를 필터링하기 위한 프로젝트

### 주요기능

```
1. 스토캐스틱 slow % K 필터링
2. 이동 평균선 필터링
3. 모니터링(일정 주기마다 텔레그램 알림받기)
```


## Getting Started

설치 순서는 다음과 같다.


### Prerequisites

```
git / nvm, node.js, npm / yarn / 텔레그램 bot 정보(token, chatId)
```

### Installing


0. 프로젝트 clone


```
프로젝트를 다운받으려는 경로에서 입력
git clone https://github.com/seungjae-yu/Binance-Future-App.git
```


1. nvm 설치

```
windows : https://github.com/coreybutler/nvm-windows/releases
mac : brew install nvm
```
2. node 설치
```
2.1. nvm install latest 입력하여 설치
2.2. nvm ls 입력하여 설치된 버전 확인
2.3. nvm use {version} 입력 ex) nvm use 17.3.0
2.4  nvm ls 입력하여 Currently using 버전 확인
2.5  npm --version 입력하여 npm 버전이 출력되면 여기까지 설치 완료.
```

3. yarn 설치

```
npm i -g yarn
```

4. 텔레그램 계정정보 설정

```
모니터링 정보를 텔레그램으로 받기 위해서는 temegram bot의 token과 chat ID가 필요
참고 : https://gabrielkim.tistory.com/entry/Telegram-Bot-Token-%EB%B0%8F-Chat-Id-%EC%96%BB%EA%B8%B0
binance-app/src/config 경로의 telegramInfo.json 파일에 token과 chat ID 입력
```

## Running

모니터링 기능을 사용하지 않는다면 telegram 관련 정보를 입력하지않아도 실행에는 영향을 주지않는다.

### 실행

프로젝트 실행에 필요한 node_module 다운로드 및 실행하는 과정이다.
binance-app 폴더로 이동 후

```
1. yarn (최초 실행시 느릴 수 있으며 이후에는 오래걸리지 않음)
2. yarn start
```



## Development

### Language & Framework


```
TypeScript / React.js
```


### State API


```
Redux & Ducks Pattern / Immer (immutable library)
```

### UI


```
Material-UI / Styled Component / fa icons 
```

### etc


```
lodash / Telegram Bot API / Binance Future API(fapi)
```


## Authors

* **SeungJae Yu** - https://github.com/seungjae-yu

