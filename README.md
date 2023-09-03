<div align="center">
  <h1>🏃🏻‍♀️RunFlip-server🏃🏻‍♂️</h1>
  
![typescript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=FFF)
![NodeJS](https://img.shields.io/badge/node.js-v19-green?logo=node.js)
  
</div>

### database : firebase
모바일 앱 개발을 위해 유연한 계층적 데이터 구조를 지원하는 firestore를 선택했습니다.

<br>

![runflip-firebase](https://github.com/haeseung123/RunFlip-server/assets/106800437/778af8c1-e608-443e-a80b-5ac4b06646a3)

#### Users
- [Users]-[userID]-profile 필드는 JSON 형태로, select 하거나 update 시 DB의 부담을 줄이고 속도를 높이기 위함입니다.
- 따라서 프로필 업데이트 요청시 JSON 내에 있는 value 값만 변경된 JSON 형태로 profile 컬럼을 업데이트 하도록 유도하였습니다.

#### Records
- 'setDoc' 함수는 데이터가 없을 경우에 추가하고, 있을 경우 데이터를 통째로 업데이트를 적용하기때문에 같은 날 여러 데이터가 발생하면 최신 데이터로 덮어씌우는 문제점이 있었습니다.
- 동일한 날짜의 데이터 누적을 위해 [DataByDate]-[randomID]와 같은 서브컬렉션을 생성하여 활용하였습니다.
- 따라서 'addDoc' 함수로 서브컬렉션을 사용하면 데이터를 구조화하여 관리하고, 필요한 데이터를 효율적으로 관리할 수 있습니다.

- 날짜별 데이터를 불러올 때 서브컬렉션을 전부 가져오는 것이 아니라, 적절한 쿼리를 사용하여 해당 날짜의 서브컬렉션 내의 데이터를 불러옵니다.
- firestore의 장점인 강력한 쿼리 기능으로 필요한 데이터를 필터링하여 가져올 수 있습니다.

<br>

### CRUD flow chart

![image](https://github.com/haeseung123/RunFlip-server/assets/106800437/97c5d648-f836-406a-8e7e-0cdda3cba7de)

- 클라이언트로부터 CRUD 요청이 오면 데이터베이스를 변경하고 status code를 응답합니다.
- 클라이언트는 서버로부터 받은 응답 코드에 따라 관련 기능을 수행합니다.

<br>

#### 서브컬렉션의 필드 구조
<img width="742" alt="스크린샷 2023-09-03 오후 9 47 39" src="https://github.com/haeseung123/RunFlip-server/assets/106800437/85a02646-c7c4-4500-b4f0-65277b9c0910">

- 기존에 날짜 별 데이터를 저장하는 DataByDate 컬렉션은 서브 컬렉션을 통해 동일한 날짜에 데이터가 발생해도 누적되도록 했으며 data와 date 필드를 가지고 있습니다.
- 단순히 데이터 식별을 하기 위해서 날짜로 구분지었으나 고유성이 보장되지 않아 데이터 삭제시 관련 데이터가 전부 삭제되는 문제점을 발견하여 
위의 그림과 같이 date 필드를 data의 endTime(종료시간)과 동일하게 변경하여 고유성을 부여하고 데이터 검색 및 식별 등 다양한 측면을 고려할 수 있게 되었습니다.

